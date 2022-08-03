import React from "react";
import {
  Dashboard,
  History,
  AdminPanelSettings,
  Language,
  ViewCarousel,
  List,
  Layers,
  Source,
  Groups,
  Palette,
  Payment,
  SettingsApplications,
  Task,
  Work,
  Queue,
  Category,
  Camera,
  Slideshow,
  PictureAsPdf,
  Map,
  TextFormat,
  Inventory,
  Newspaper,
  Article,
  Markunread,
  MarkUnreadChatAlt,
  Sell,
  PaletteOutlined,
  PaletteSharp,
  LiveHelp,
  QuestionAnswer,
  ShoppingCart,
  OnlinePrediction,
  Star,
  Store,
  ShoppingBag,
  Search,
  SupervisorAccount,
  AccountBox,
  Assessment,
  ContactPhone,
  TrendingUp,
  MenuBook,
  DevicesOther,
  Tour,
  Interests,
  Wc,
  Settings,
  SettingsAccessibility,
  ViewQuilt,
} from "@mui/icons-material";

const SidebarItems = [
  {
    id: 1,
    name: "Dashboard",
    slug: "/",
    url: "/admin/dashboard",
    icon: <Dashboard />,
    child: [],
  },
  {
    id: 2,
    name: "Latest Activity",
    slug: "activities",
    url: "/admin/activities",
    icon: <History />,
    child: [
      {
        id: 3,
        name: "Website",
        slug: "website",
        url: "/admin/activities/website",
        icon: <Language />,
        child: [],
      },
      {
        id: 4,
        name: "Admin",
        slug: "admin",
        url: "/admin/activities/admin",
        icon: <AdminPanelSettings />,
        child: [],
      },
    ],
  },
  {
    id: 5,
    name: "Accounts",
    slug: "accounts",
    url: "/admin/accounts",
    icon: <SupervisorAccount />,
    child: [
      {
        id: 6,
        name: "Clients",
        slug: "clients",
        url: "/admin/accounts/clients",
        icon: <AccountBox />,
        child: [],
      },
      {
        id: 7,
        name: "Administrators",
        slug: "administrators",
        url: "/admin/accounts/administrators",
        icon: <AdminPanelSettings />,
        child: [],
      },
    ],
  },
  // {
  //   id: 8,
  //   name: "Profile",
  //   slug: "profile",
  //   url: "/admin/profile",
  //   icon: "user",
  //   child: [],
  // },
  {
    id: 9,
    name: "Settings",
    slug: "settings",
    url: "/admin/settings",
    icon: <Settings />,
    child: [
      {
        id: 12,
        name: "Roles",
        slug: "roles",
        url: "/admin/settings/roles",
        icon: <SettingsAccessibility />,
        child: [],
      },
      {
        id: 14,
        name: "Templates",
        slug: "templates",
        url: "/admin/settings/templates",
        icon: <ViewQuilt />,
        child: [],
      },
      // {
      //   id: 15,
      //   name: "Layouts",
      //   slug: "layouts",
      //   url: "/admin/settings/layouts",
      //   icon: "copy",
      //   child: [],
      // },
    ],
  },
  {
    id: 16,
    name: "Pages",
    slug: "pages",
    url: "/admin/pages",
    icon: <Layers />,
    child: [],
  },
  {
    id: 17,
    name: "Banners",
    slug: "banners",
    url: "/admin/banners",
    icon: <ViewCarousel />,
    child: [],
  },
  {
    id: 18,
    name: "Analytics",
    slug: "analytics",
    url: "/admin/analytics",
    icon: <TrendingUp />,
    child: [
      {
        id: 19,
        name: "Summary",
        slug: "summary",
        url: "/admin/analytics/summary",
        icon: <MenuBook />,
        child: [],
      },
      {
        id: 20,
        name: "Devices",
        slug: "devices",
        url: "/admin/analytics/devices",
        icon: <DevicesOther />,
        child: [],
      },
      {
        id: 21,
        name: "Visits and Referrals",
        slug: "visits-and-referrals",
        url: "/admin/analytics/visits-and-referrals",
        icon: <Tour />,
        child: [],
      },
      {
        id: 22,
        name: "Interests",
        slug: "interests",
        url: "/admin/analytics/interests",
        icon: <Interests />,
        child: [],
      },
      {
        id: 23,
        name: "Demographics",
        slug: "demographics",
        url: "/admin/analytics/demographics",
        icon: <Wc />,
        child: [],
      },
    ],
  },
  {
    id: 24,
    name: "Resources",
    slug: "resources",
    url: "/admin/resources",
    icon: <Source />,
    child: [
      {
        id: 25,
        name: "Categories",
        slug: "categories",
        url: "/admin/resources/categories",
        icon: <Category />,
        child: [],
      },
      {
        id: 26,
        name: "Photos",
        slug: "photos",
        url: "/admin/resources/photos",
        icon: <Camera />,
        child: [],
      },
      {
        id: 27,
        name: "Videos",
        slug: "videos",
        url: "/admin/resources/videos",
        icon: <Slideshow />,
        child: [],
      },
      {
        id: 28,
        name: "Documents",
        slug: "documents",
        url: "/admin/resources/documents",
        icon: <PictureAsPdf />,
        child: [],
      },
      {
        id: 45,
        name: "Locations",
        slug: "locations",
        url: "/admin/resources/locations",
        icon: <Map />,
        child: [
          {
            id: 52,
            name: "Categories",
            slug: "categories",
            url: "/admin/resources/locations/categories",
            icon: <Category />,
            child: [],
          },
          {
            id: 53,
            name: "Location",
            slug: "location",
            url: "/admin/resources/locations/location",
            icon: "map-marker-alt",
            child: [],
          },
        ],
      },
      {
        id: 47,
        name: "Texts",
        slug: "texts",
        url: "/admin/resources/texts",
        icon: <TextFormat />,
        child: [],
      },
      {
        id: 49,
        name: "Content",
        slug: "content",
        url: "/admin/resources/content",
        icon: <Inventory />,
        child: [],
      },
    ],
  },
  {
    id: 29,
    name: "Reports",
    slug: "reports",
    url: "/admin/reports",
    icon: <Assessment />,
    child: [
      {
        id: 30,
        name: "Contact Us",
        slug: "contact-us",
        url: "/admin/reports/contact-us",
        icon: <ContactPhone />,
        child: [],
      },
    ],
  },
  {
    id: 31,
    name: "News",
    slug: "news",
    url: "/admin/news",
    icon: <Newspaper />,
    child: [
      {
        id: 32,
        name: "Collections",
        slug: "collections",
        url: "/admin/news/collections",
        icon: <Queue />,
        child: [],
      },
      {
        id: 33,
        name: "Article",
        slug: "article",
        url: "/admin/news/article",
        icon: <Article />,
        child: [],
      },
      {
        id: 44,
        name: "Comments",
        slug: "comments",
        url: "/admin/news/comments",
        icon: <MarkUnreadChatAlt />,
        child: [],
      },
      {
        id: 54,
        name: "Tags",
        slug: "tags",
        url: "/admin/news/tags",
        icon: <Sell />,
        child: [],
      },
    ],
  },
  {
    id: 34,
    name: "Shop",
    slug: "shop",
    url: "/admin/shop",
    icon: <Store />,
    child: [
      {
        id: 35,
        name: "Status",
        slug: "status",
        url: "/admin/shop/status",
        icon: <OnlinePrediction />,
        child: [],
      },
      {
        id: 36,
        name: "Categories",
        slug: "categories",
        url: "/admin/shop/categories",
        icon: <Category />,
        child: [],
      },
      {
        id: 37,
        name: "Features",
        slug: "features",
        url: "/admin/shop/features",
        icon: <Star />,
        child: [],
      },
      {
        id: 38,
        name: "Products",
        slug: "products",
        url: "/admin/shop/products",
        icon: <ShoppingCart />,
        child: [],
      },
      {
        id: 39,
        name: "Orders",
        slug: "transactions",
        url: "/admin/shop/transactions",
        icon: <ShoppingBag />,
        child: [],
      },
      {
        id: 40,
        name: "Searches",
        slug: "searches",
        url: "/admin/shop/searches",
        icon: <Search />,
        child: [],
      },
    ],
  },
  {
    id: 41,
    name: "FAQs",
    slug: "faqs",
    url: "/admin/faqs",
    icon: <LiveHelp />,
    child: [
      {
        id: 42,
        name: "Categories",
        slug: "categories",
        url: "/admin/faqs/categories",
        icon: <Category />,
        child: [],
      },
      {
        id: 43,
        name: "Questions",
        slug: "questions",
        url: "/admin/faqs/questions",
        icon: <QuestionAnswer />,
        child: [],
      },
    ],
  },
  {
    id: 46,
    name: "Menus",
    slug: "menus",
    url: "/admin/menus",
    icon: <List />,
    child: [],
  },
  {
    id: 51,
    name: "Themes",
    slug: "themes",
    url: "/admin/themes",
    icon: <PaletteSharp />,
    child: [],
  },
];

export default SidebarItems;