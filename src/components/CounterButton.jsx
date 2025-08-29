import { useState } from "react";

export default function CounterButton() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button aria-label="increment" onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
    </div>
  );
}
