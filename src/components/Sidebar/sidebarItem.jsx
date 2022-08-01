import React from "react";
import {
  AdminPanelSettings,
  Groups,
  Palette,
  Payment,
  SettingsApplications,
  Task,
  Work,
} from "@mui/icons-material";


// import settingsRoute from "../../../router/SettingsRoute";
import contentRoute from "components/router/ContentRoute";


const sideBarItem = [
  // {
  //   name: 'Dashboard',
  //   icon: <Person />,
  //   privilege: [99],
  //   subscriptions: [1, 2, 5],
  //   child: superUserRoute,
  // },
  {
    name: "Content",
    icon: <Palette />,
    privilege: [1, 2, 3, 4, 5, 6, 7, 8, 10],
    subscriptions: [1, 2, 5],
    child: contentRoute,
  },

  // {
  //   name: "Settings",
  //   icon: <SettingsApplications />,
  //   privilege: [1, 2, 4, 6, 5, 7, 8],
  //   subscriptions: [1, 2, 5, 8],
  //   child: settingsRoute,
  // },
];

export default sideBarItem;

