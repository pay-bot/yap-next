import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import NewHome from '../pages/website/NewHome';
import SignIn from '../pages/auth/SignIn';
import Register from '../pages/Authentication/Register/Register';
import BlogDetail from '../pages/website/blog/BlogDetail';
import Login from './Authentication/Login/Login';
import Shop from '../pages/website/Shop';

function MainLayoutRoutes() {
  const isLoading = useSelector((state) => state.loading.isReactLoading);
  const eventMove = useSelector((state) => state.shortable.isMove);
  // const location = useLocation();
  // const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authReducer);
  console.log('islo', isLogin);
  return (
    <Routes>
      <Route path="/" element={<NewHome />} exact />
      <Route path="/sign" element={<SignIn />} exact />
      <Route path="/login" element={!isLogin.adminToken ? <Login /> : <Navigate to="/" />} exact />
      <Route path="/register" element={!isLogin.adminToken ? <Register /> : <Navigate to="/" />} exact />
      <Route path="/shop" element={<Shop />} exact />
      <Route path="/blog/:blogSlug" element={<BlogDetail />} exact />
    </Routes>
  );
}

export default MainLayoutRoutes;
