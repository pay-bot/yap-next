import './index.css';
import { MenuIcon } from '@heroicons/react/solid';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { fetchSections } from '../../../hooks/useSectionsData';

import { removeAdmin } from '../../../features/authReducer';

function Header({ className, isShop }) {
  const pageId = 1;
  const { data: section } = useQuery(['sections', { pageId }], fetchSections);
  // const navItems = [];

  const dataApi = section?.data?.model;
  const menuApi = section?.data?.menuAll;

  const logo = dataApi?.sections[0]?.components[0]?.photos[0];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authReducer);
  const dataCart = useSelector((state) => state.cart);
  console.log(dataCart);
  console.log(isLogin);
  const handleAddLogout = () => {
    dispatch(removeAdmin());
  };

  const handleCart = () => {
    if (!isLogin.adminToken) {
      toast.warning('You Must Login', { position: 'top-right' });
      navigate('/login');
    }

    if (isLogin.adminToken && dataCart?.cartItems.length === 0) {
      toast.warning('Cart Empty', { position: 'top-right' });
    }

    if (isLogin.adminToken && dataCart?.cartItems.length > 0) {
      navigate('/cart');
    }
  };

  return (
    <div className={className || 'max-w-screen-lg 2xl:max-w-screen-xl mx-auto flex justify-between h-20 absolute inset-x-0 z-30 md:px-0 px-4 '}>
      <img className="md:hidden lg:inline-flex" src={logo?.url} alt="" width="180" />
      <img className="hidden md:inline-block lg:hidden" src={logo?.url} alt="" width="45" />
      <div className="flex items-center">
        <MenuIcon className="h-10 md:hidden" />
        <div className="hidden md:flex items-center space-x-3 lg:space-x-8">
          {menuApi?.map((data) => {
            if (data.collection_id === 1) {
              return (
                <Link to={data.slug === 'home' ? '/' : `/${data.slug}`}>
                  <p className="nav-item">{data.name}</p>
                </Link>
              );
            }
            return null;
          })}
        </div>

        {isShop && (
          <button type="button" onClick={handleCart}>
            <div className="flex items-center cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-handbag-fill" viewBox="0 0 16 16">
                <path
                  fill="#fff"
                  // eslint-disable-next-line max-len
                  d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z"
                />
              </svg>
              {isLogin.adminToken && dataCart?.cartItems.length > 0 && (
                <span className="mx-2 bg-yellow-300 w-8 h-8 flex items-center justify-center rounded-full">
                  <span>{dataCart?.cartTotalQuantity}</span>
                </span>
              )}
            </div>
          </button>
        )}

        {isLogin.adminToken ? (
          <div className="dropdown inline-block relative">
            <button type="button" className="font-semibold py-2 px-4 rounded inline-flex items-center">
              <span className="text-white">{isLogin.adminName}</span>
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fill="#fff " d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{' '}
              </svg>
            </button>
            <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
              <li className="">
                <Link to="/admin" className="rounded-t bg-white hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap">
                  Dashboard
                </Link>
              </li>
              <li className="">
                <button type="button" onClick={handleAddLogout} className="bg-gray-200 rounded-b hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="text-white flex pl-2">
            {/* <Link to="/register" className="bg-blue-500 rounded py-1 px-3 mx-2">
              Register
            </Link> */}
            <Link to="/login" className="border border-blue-500 rounded py-1 px-3">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
