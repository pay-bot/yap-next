import { useSelector } from "react-redux";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import SidebarMenu from "./SidebarMenu";
import { useNavigationsData } from "../../hooks/useNavigationsData";
import Link from "next/link";
import sideBarItem from "./sidebarItem";
import React, { useState } from "react";
import SidebarItems from "./SidebarItems";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SideBar({ offLayout, children }) {

  const isLoading = useSelector((state) => state.loading.isReactLoading);
  const eventMove = useSelector((state) => state.shortable.isMove);
  const isLogin = useSelector((state) => state.authReducer);

   {
     isLoading && <ReactLoadings />;
   }
   <ToastContainer autoClose={2000} pauseOnHover={false} />;
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const { isSuccess, data: navs } = useNavigationsData();

  const sidebar = useSelector((state) => state.sidebar.isOpen);
  const router = useRouter();

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.5 },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: { duration: 0.5 },
    },
  };

  const sideNav = [];

  sideBarItem?.map((route) => {
    if (route.parent_id === 0 && route.is_hidden === 0) {
      sideNav.push(route);
    }
    return sideNav;
  });

  const sortedSidenav = isSuccess ? _.sortBy(sideNav, "list_order") : [];


  return (
    <div className="main-container">
      <motion.div
        animate={{
          width: sidebar ? "260px" : "64px",

          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className={`sidebar fixed pb-10 `}
      >
        <PerfectScrollbar>
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  DoSomeCoding
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">{/* <FaBars onClick={toggle} /> */}</div>
          </div>
          <div className="search">
            <div className="search_icon">{/* <BiSearch /> */}</div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {SidebarItems.map((route, index) => {
              if (route.child.length > 0) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <Link
                  href={route.url}
                  key={index}
                  className=" border-b border-red-600"
                  activeClassName="active"
                >
                  <a>
                    <div
                      key={route.id}
                      className={`menu  ${
                        router.pathname === route.url ? "bg-[#2D3359]" : ""
                      }`}
                    >
                      <div className={`menu_item w-full px-6 py-1 `}>
                        <div className="icon">{route.icon}</div>
                        <AnimatePresence>
                          {isOpen && sidebar && (
                            <motion.div
                              variants={showAnimation}
                              initial="hidden"
                              animate="show"
                              exit="hidden"
                              className="link_text"
                            >
                              {route.name}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </section>
        </PerfectScrollbar>
      </motion.div>

      <main>{children}</main>
    </div>
  );
}

export default SideBar;
