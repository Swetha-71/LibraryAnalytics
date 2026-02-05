import React from "react";

const shellStyles = {
  wrapper: { minHeight: "100vh", background: "transparent" },
  header: {
    height: 64,
    padding: "0 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #e5e7eb",
    background: "linear-gradient(135deg,#e0f2fe,#fefce8)", // light blue → cream
    color: "#0f172a",
    position: "sticky",
    top: 0,
    zIndex: 20
  },
  title: {
    fontFamily: `"Playfair Display","Times New Roman",serif`,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontSize: 18
  },
  main: { padding: 24 }
};

export default function AppShell({ children, right }) {
  return (
    <div style={shellStyles.wrapper}>
      <header style={shellStyles.header}>
        <div style={shellStyles.title}>LibraryAnalytics</div>
        <div>{right}</div>
      </header>
      <main style={shellStyles.main}>{children}</main>
    </div>
  );
}
