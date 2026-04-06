import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import RoleSwitcher from "./RoleSwitcher";
import { useState, useEffect } from "react";

function Layout() {
    const [theme, setTheme] = useState(
  localStorage.getItem("theme") || "dark"
);

useEffect(() => {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}, [theme]);
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <div className="topbar">
          <h2>Finance Dashboard</h2>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
  {theme === "dark" ? "Light Mode" : "Dark Mode"}
</button>
          <RoleSwitcher />
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;