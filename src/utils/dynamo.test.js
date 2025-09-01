// dynamo.vitest.test.js

import { describe, it, expect, beforeEach } from "vitest";
import { mockClient } from "aws-sdk-client-mock";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  listAllItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
} from "./dynamo.js";

const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
  ddbMock.reset();
});

describe("Dynamo helpers (mocked)", () => {
  it("createItem returns the same item", async () => {
    ddbMock.on(PutCommand).resolves({});
    const item = { id: "1", text: "hi" };
    const out = await createItem("Testing", item);
    expect(out).toEqual(item);
  });

  it("listAllItems returns items (happy path)", async () => {
    const items = [{ id: "1" }, { id: "2" }];
    ddbMock.on(ScanCommand).resolves({ Items: items });
    const out = await listAllItems("Testing");
    expect(out).toEqual(items);
  });

  it("listAllItems returns [] when Items missing", async () => {
    ddbMock.on(ScanCommand).resolves({});
    const out = await listAllItems("Testing");
    expect(out).toEqual([]);
  });

  it("listAllItems returns [] on error", async () => {
    ddbMock.on(ScanCommand).rejects(new Error("boom"));
    const out = await listAllItems("Testing");
    expect(out).toEqual([]);
  });

  // Payload assertion: Put
  it("createItem sends correct PutCommand payload", async () => {
    ddbMock.on(PutCommand).resolves({});
    const item = { id: "1", text: "ellene" };
    await createItem("Testing", item);
    const input = ddbMock.commandCalls(PutCommand)[0].args[0].input;
    expect(input).toEqual({ TableName: "Testing", Item: item });
  });

  // Payload assertion: Update
  it("updateItem builds correct UpdateExpression and maps", async () => {
    ddbMock.on(UpdateCommand).resolves({ Attributes: { id: "1", a: 1, b: 2 } });
    const out = await updateItem("Testing", { id: "1" }, { a: 1, b: 2 });
    expect(out).toEqual({ id: "1", a: 1, b: 2 });

    const input = ddbMock.commandCalls(UpdateCommand)[0].args[0].input;
    expect(input).toMatchObject({
      TableName: "Testing",
      Key: { id: "1" },
      ReturnValues: "ALL_NEW",
    });
    expect(input.UpdateExpression).toBe("SET #n0 = :v0, #n1 = :v1");
    expect(input.ExpressionAttributeNames).toEqual({ "#n0": "a", "#n1": "b" });
    expect(input.ExpressionAttributeValues).toEqual({ ":v0": 1, ":v1": 2 });
  });

  // Optional extras
  it("getItem returns item or null", async () => {
    ddbMock.on(GetCommand).resolves({ Item: { id: "9", text: "ok" } });
    expect(await getItem("Testing", { id: "9" })).toEqual({ id: "9", text: "ok" });

    ddbMock.reset();
    ddbMock.on(GetCommand).resolves({});
    expect(await getItem("Testing", { id: "missing" })).toBeNull();
  });

  it("deleteItem returns deleted attributes or null", async () => {
    ddbMock.on(DeleteCommand).resolves({ Attributes: { id: "3" } });
    expect(await deleteItem("Testing", { id: "3" })).toEqual({ id: "3" });

    ddbMock.reset();
    ddbMock.on(DeleteCommand).resolves({});
    expect(await deleteItem("Testing", { id: "x" })).toBeNull();
  });
});