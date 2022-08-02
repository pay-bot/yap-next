

import { useSelector } from 'react-redux';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import SidebarMenu from './SidebarMenu';
import { useNavigationsData } from '../../hooks/useNavigationsData';
import Link from 'next/link';
import sideBarItem from './sidebarItem';

function SideBar({ offLayout }) {
  const { isSuccess, data: navs } = useNavigationsData();

  console.log('navs', navs?.data);
  const sidebar = useSelector((state) => state.sidebar.isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.5 },
    },
    show: {
      opacity: 1,
      width: 'auto',
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

  const sortedSidenav = isSuccess ? _.sortBy(sideNav, 'list_order') : [];

  console.log('l', JSON.stringify( navs?.data))

  return (
    <div className="main-container">
      <motion.div
        animate={{
          width: sidebar ? "260px" : "64px",

          // transition: {
          //   duration: 0.5,
          //   type: "spring",
          //   damping: 10,
          // },
        }}
        className="sidebar fixed pb-10"
      >
        <PerfectScrollbar>
          <div className="search mt-6">
            <div className="search_icon" />
            <AnimatePresence>
              {sidebar && (
                <Link href="/">
                  <a>
                    <div className="">
                      <img
                        src="/yaplogofullwhite.svg"
                        alt=""
                        className="w-full px-6 py-6 "
                      />
                    </div>
                  </a>
                </Link>
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {sortedSidenav?.map((route) => (
              <SidebarMenu
                key={route.name}
                setIsOpen={sidebar}
                route={route}
                // showAnimation={showAnimation}
                isOpen={sidebar}
              />
            ))}
          </section>
        </PerfectScrollbar>
      </motion.div>
    </div>
  );
}

export default SideBar;

