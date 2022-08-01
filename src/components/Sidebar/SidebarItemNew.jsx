import React, { useState } from "react";

export default function SidebarItemNew({ item }) {
  const [open, setOpen] = useState(false);

  if (item.child) {
    return (
      <div
        onClick={() => setOpen(!open)}
        className={open ? "sidebar-item open" : "sidebar-item"}
      >
        <div className="sidebar-title">
          <span>
            {item.icon && <div className={item.icon}>{item.icon}</div>}
            {item.name}
          </span>
          <i
            className="bi-chevron-down toggle-btn"
            onClick={() => setOpen(!open)}
          ></i>
        </div>
        <div className="sidebar-content">
          {item.child.map((child, index) => (
            <SidebarItemNew key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <a href={item.path || "#"} className="sidebar-item plain">
        {item.icon && <div className={item.icon}>{item.icon}</div>}
        {item.name}
      </a>
    );
  }
}
