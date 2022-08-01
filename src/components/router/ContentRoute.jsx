import React from "react";
import {
  AccountTree,
  Menu,
  Newspaper,
  WebAsset,
  LocationOn,
} from "@mui/icons-material";

const contentRoute = [
  {
    name: "Structure",
    icon: <AccountTree />,
    privilege: [1, 4, 6],
    subscriptions: [1],
    path: "/site-structure",
  },

  // MENU
  {
    name: "Menu",
    icon: <Menu />,
    privilege: [1, 4, 6],
    subscriptions: [1],
    path: "/menu-list",
  },

  // ARTICLE
  {
    name: "Article",
    icon: <Newspaper />,
    privilege: [1, 2, 4, 6],
    subscriptions: [1],
    path: "/article",
  },

  // ASSET
  {
    name: "Asset",
    icon: <WebAsset />,
    privilege: [1, 2, 3, 4, 5, 6],
    subscriptions: [1, 2],
    path: "/asset",
  },

  // LOCATION
  // {
  //   name: 'Location',
  //   element: <LocationList />,
  //   icon: <LocationOn />,
  //   privilege: [1, 2, 3, 4, 5, 6, 7, 8, 10],
  //   subscriptions: [1, 2, 5],
  //   path: '/location',
  // },
];

export default contentRoute;

