import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import SidebarMenu from './SidebarMenu';
import { useNavigationsData } from '../../hooks/useNavigationsData';

function SideBar({ offLayout }) {
  const { isSuccess, data: navs } = useNavigationsData();

  // console.log('navs', navs?.data);
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

  navs?.data?.map((route) => {
    if (route.parent_id === 0 && route.is_hidden === 0) {
      sideNav.push(route);
    }
    return sideNav;
  });

  const sortedSidenav = isSuccess ? _.sortBy(sideNav, 'list_order') : [];

  return (
    <div className={` ${offLayout ? 'hidden' : 'main-container  '}`}>
      <motion.div
        animate={{
          width: sidebar ? '260px' : '64px',

          transition: {
            duration: 0.5,
            type: 'spring',
            damping: 10,
          },
        }}
        className="sidebar fixed pb-10"
      >
        <PerfectScrollbar>
          <div className="search mt-6">
            <div className="search_icon" />
            <AnimatePresence>
              {sidebar && (
                <Link to="/">
                  <div className="">
                    <img src="/yaplogofullwhite.svg" alt="" className="w-full px-6 py-6 " />
                  </div>
                </Link>
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {sortedSidenav?.map((route) => (
              <SidebarMenu key={route.name} setIsOpen={sidebar} route={route} showAnimation={showAnimation} isOpen={sidebar} />
            ))}
          </section>
        </PerfectScrollbar>
      </motion.div>
    </div>
  );
}

export default SideBar;
