import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "@mui/material";
import { useNavigationsData } from "../../hooks/useNavigationsData";
import Link from "next/link";
import sideBarItem from "./sidebarItem";
import { ExpandMore } from "@mui/icons-material";
import { useRouter } from "next/router";

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};
const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen }) => {
  const sidebar = useSelector((state) => state.sidebar.isOpen);
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);
  return (
    <>
      <div className="menu" onClick={toggleMenu}>
        <div
          className={`menu_item w-full px-6 py-1 ${
            isMenuOpen === true ? "border-r-4 border-red-900 bg-blue-600" : ""
          }`}
        >
          <div className="icon">{route.icon}</div>
          {sidebar && (
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="link_text"
                >
                  <div className="">
                    <div className="">{route.name}</div>
                    {/* {!route?.is_done && (
                      <div className="h-fit rounded bg-[#4191FF] px-1 text-[10px]">
                        Soon
                      </div>
                    )} */}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
        {isOpen && sidebar && (
          <motion.div
            className="absolute right-8 pt-2"
            animate={
              isMenuOpen
                ? {
                    rotate: -90,
                  }
                : { rotate: 0 }
            }
          >
            <ExpandMore />
            {/* <FaAngleDown /> */}
          </motion.div>
        )}
      </div>{" "}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {route.child.map((subRoute, i) => (
              <motion.div variants={menuItemAnimation} key={i} custom={i}>
                <Link href={subRoute.url} className="link-child">
                  <a>
                    <div
                      key={subRoute.id}
                      className={`menu  ${
                        router.pathname === subRoute.url ? "bg-[#2D3359]" : ""
                      }`}
                    >
                      <div className={`flex py-1 ${sidebar ? "ml-8" : "ml-3"}`}>
                        <div className="px-2 ">
                          <div className="icon">{subRoute.icon}</div>
                        </div>
                        {sidebar && (
                          <motion.div className="link_text">
                            <div className="flex gap-x-2">
                              {subRoute.name}
                              {/* {!subRoute?.is_done && (
                              <div className="h-fit rounded bg-[#4191FF] px-1 text-[10px]">
                                Soon
                              </div>
                            )} */}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </a>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}{" "}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
