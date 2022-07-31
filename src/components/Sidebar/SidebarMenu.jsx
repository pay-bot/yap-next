import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "@mui/material";
import { useNavigationsData } from "../../hooks/useNavigationsData";
import Link from "next/link";

function SidebarMenu({ route, showAnimation }) {
  // console.log('ini', route)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { data: navs } = useNavigationsData();

  const sidebar = useSelector((state) => state.sidebar.isOpen);

  // console.log('rout', route)
  const parId = [];

  navs?.data.map((data) => {
    if (data.parent_id === route.id) {
      parId.push(data.parent_id);
    }
    return parId;
  });

  const uniqueNames = Array.from(new Set(parId)).toString();
  // console.log('rr', route)

  return (
    <>
      {uniqueNames === route.id.toString() ? (
        <button
          type="button"
          key={route.id}
          title={route.name}
          className="menu "
          onClick={toggleMenu}
        >
          <div
            className={`menu_item w-full px-6 py-1 ${
              isMenuOpen === true ? "border-r-4 border-red-900 bg-blue-600" : ""
            }`}
          >
            <div key={route.id} className="flex">
              <div className="py-1 pr-1">
                <FontAwesomeIcon icon={route.icon} />
              </div>
              {sidebar && (
                <div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="link_text py-1"
                >
                  <div key={route.id} className="flex gap-x-2">
                    {/* {sidebar && ( */}
                    <div
                      variants={showAnimation}
                      key={route.id}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                      title={route.name}
                    >
                      {route.name}
                    </div>
                    {!route?.is_done && (
                      <div className="h-fit rounded bg-[#4191FF] px-1 text-[10px]">
                        Soon
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {sidebar && (
              <div
                className="absolute right-8 pt-2"
                animate={isMenuOpen ? { rotate: -90 } : { rotate: 0 }}
              >
                <FaAngleDown />
              </div>
            )}
          </div>
        </button>
      ) : (
        <Link
          href={route.url}
          key={route.id}
          title={route.name}
          className="link"
          activeclassname="active"
        >
          <a>
            <div key={route.id} className="menu ">
              <div
                className={`menu_item w-full px-6 py-1 ${
                  isMenuOpen === true
                    ? "border-r-4 border-red-900 bg-blue-600"
                    : ""
                }`}
              >
                <div key={route.id} className="flex">
                  <div className="py-1 pr-1">
                    <FontAwesomeIcon icon={route.icon} />
                  </div>

                  {sidebar && (
                    <div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text py-1"
                    >
                      <div key={route.id} className="flex gap-x-2">
                        {/* {sidebar && ( */}
                        <div
                          variants={showAnimation}
                          key={route.id}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                          title={route.name}
                        >
                          {route.name}
                        </div>
                        {!route?.is_done && (
                          <div className="h-fit rounded bg-[#4191FF] px-1 text-[10px]">
                            Soon
                          </div>
                        )}

                        {/* )} */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </a>
        </Link>
      )}

      <div>
        <Collapse in={isMenuOpen}>
          <div className="menu_container ">
            {navs?.data.map(
              (data) =>
                data.parent_id === route.id && (
                  <Link
                    href={data.url}
                    key={data.id}
                    title={data.name}
                    className={`link-child `}
                    activeclassname="active"
                  >
                    <a>
                      <div className={`flex py-1 ${sidebar ? "ml-8" : "ml-1"}`}>
                        <div className="px-2 ">
                          <FontAwesomeIcon icon={data.icon} />
                        </div>
                        {sidebar && (
                          <div className="flex gap-x-2">
                            <div className="text-white">{data.name}</div>
                            {!data?.is_done && (
                              <div className="h-fit rounded bg-[#4191FF] px-1 text-[10px]">
                                Soon
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </a>
                  </Link>
                )
            )}
          </div>
        </Collapse>
      </div>
    </>
  );
}

export default SidebarMenu;

