// Footer.jsx

export default function Footer({ brand = "My React App" }) {
  const year = new Date().getFullYear();
  return (
    <footer style={{ padding: "16px 24px", opacity: 0.8 }}>
      <small>© {year} {brand}</small>
    </footer>
  );
}
