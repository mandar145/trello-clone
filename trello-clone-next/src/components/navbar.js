"use client"; // Necessary for Next.js client-side rendering
import React from "react";

export default function navbar() {
  return (
    <div>
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: "#000", color:"#fff" }}
      >
        <a className="navbar-brand" href="#">
        <h5 className="fs-3 font-monospace fw-light"  style={{ color:"#fff" }}>Task Manager</h5>
        </a>
      </nav>
    </div>
  );
}
