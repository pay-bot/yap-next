import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import SideBar from '../Sidebar/SideBar';
import Footer from '../Footer';

export default function LayoutWrapper({ children }) {
  const sidebar = useSelector((state) => state.sidebar.isOpen);
  return (
    <div className="flex overflow-hidden">
      <SideBar />
      <Footer>
        <div className="w-full">
          <Header />
          <div className={`relative pr-[20px] ${sidebar === true ? 'ml-[260px]' : 'ml-[90px]'}`}>
            <div className="bg-[#F4F5FB] pb-32">
              <Outlet />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
}