import React from "react";

function Navbar() {
  return (
    <nav
      style={{
        background: "#2563eb",
        color: "white",
        padding: "18px",
        textAlign: "center",
        fontSize: "22px",
        fontWeight: "bold",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
      }}
    >
      Personal Budget Tracker
    </nav>
  );
}

export default Navbar;