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
          <span className="flex space-x-2">
            {item.icon && <div className={item.icon}>{item.icon}</div>}
            <div className="">{item.name}</div>
          </span>
         
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
      <div className="sidebar-title ml-4">
        <span className="flex space-x-2">
          {item.icon && <div className={item.icon}>{item.icon}</div>}
          <div className="">{item.name}</div>
        </span>
      </div>
    );
  }
}
