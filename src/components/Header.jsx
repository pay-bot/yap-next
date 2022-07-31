import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from "next/router";
import { useNavigationsData } from '../hooks/useNavigationsData';
import { handleSideBar } from '../features/sideBarSlice';
import _ from 'lodash';


export default function Header() {
  const dispatch = useDispatch();
    const router = useRouter();
  const sidebar = useSelector((state) => state.sidebar.isOpen);
  const isLogin = useSelector((state) => state.authReducer);

  // console.log(isLogin)

  const { data: navs } = useNavigationsData();


  // let parentId;
  // let parent = {};

  const parentData = navs?.data?.filter((data) =>
    router.pathname.includes(data.name.toLowerCase())
  );

  const par = _.uniqBy(parentData, 'name');

  return (
    <div className={`  flex bg-white bg-opacity-90 py-4 shadow gap-x-6 items-center ${sidebar === true ? 'ml-[260px]' : 'ml-16'}`}>
      <button type="button" onClick={() => dispatch(handleSideBar())} className="ml-6 w-8 bg-white px-2 shadow-lg  flex items-center ">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="arrows-alt-h"
          className="svg-inline--fa fa-arrows-alt-h fa-w-16 "
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            // eslint-disable-next-line max-len
            d="M377.941 169.941V216H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.568 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296h243.882v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.568 0-33.941l-86.059-86.059c-15.119-15.12-40.971-4.412-40.971 16.97z"
          />
        </svg>
      </button>
      <div className="flex gap-x-2 items-center">
        {par?.map((head) => (
          <div key={head.id} className="flex gap-x-1 items-center">
            <FontAwesomeIcon icon={head.icon ?? 'fa-solid fa-circle-dot'} />
            <div className="">{head.name}</div>
          </div>
        ))}
      </div>
      <div className="ml-auto mr-6">
        {isLogin.adminToken ? (
          <div className="">{isLogin.adminName}</div>
        ) : (
          <div className="flex">
            <div className="h-9 rounded-lg bg-blue-100 p-1">
              <img src="/avatar.png" alt="" className="w-6" />
            </div>
            <div className="ml-2 text-lg  leading-4">
              <div className=" font-semibold">Avatar</div>
              <div className="text-sm text-gray-500">Admin</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



