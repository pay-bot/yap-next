import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import SideBar from "../Sidebar/SideBar";
import Footer from "../Footer";
import { withProtected } from "helper/routeProtection";
import SidebarNew from "components/Sidebar/SidebarNew";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";

function LayoutWrapper({ children }) {
  <ToastContainer autoClose={2000} pauseOnHover={false} />;
  const sidebar = useSelector((state) => state.sidebar.isOpen);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };
  return (
    <div className="flex main">
      <SideBar />

      <div className="w-full">
        <Header />
        <div
          className={`relative pr-[20px] ${
            sidebar === true
              ? "ml-[260px] transition-all  delay-350"
              : "ml-[90px] transition-all  delay-450"
          }`}
        >
          <div className="bg-[#F4F5FB] pb-32">{children}</div>
        </div>
      </div>
    </div>
  );
}

// export default withProtected(LayoutWrapper);
export default LayoutWrapper;
