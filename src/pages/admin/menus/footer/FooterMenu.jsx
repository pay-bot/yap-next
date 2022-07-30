import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse } from '@mui/material';
import { useMenusFooterData } from '../../../../hooks/useMenusFooterData';

import { openModal } from '../../../../features/modal/modalSlice';

function FooterMenu({ route }) {
  const dispatch = useDispatch();

  // console.log('ini', route)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { data: navs } = useMenusFooterData();

  const sidebar = useSelector((state) => state.sidebar.isOpen);

  const parId = [];

  navs?.data.map((data) => {
    if (data.parent_id === route.id) {
      return parId.push(data.parent_id);
    }
    return null;
  });

  const uniqueNames = Array.from(new Set(parId)).toString();

  return (
    <>
      <div key={route.id} title={route.name} className="w-full bg-white">
        <div className={` w-full border-b border-blue-400 bg-white px-6 py-1 ${isMenuOpen === true ? 'bg--600 ' : ''}`}>
          <div key={route.id} className="flex py-1">
            {uniqueNames === route.id.toString() && (
              <button type="button" onClick={toggleMenu} className="" animate={isMenuOpen ? { rotate: -90 } : { rotate: 0 }}>
                <FaAngleDown />
              </button>
            )}

            {/* {sidebar && ( */}
            <div key={route.id} className="text-black " title={route.name}>
              {route.name}
            </div>
            <div className="ml-auto flex justify-end">
              <button type="button" onClick={() => dispatch(openModal({ componentName: 'AddChildFooter', id: route.id }))} className="">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Collapse in={isMenuOpen}>
          <div className="menu_container ">
            {navs?.data.map((data) => {
              if (data.parent_id === route.id) {
                return (
                  <div className={`flex border-b border-green-400 bg-white py-1 ${sidebar ? 'ml-8' : 'ml-1'}`}>
                    <div className="px-2 " />
                    <div className="text-black">{data.name}</div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </Collapse>
      </div>
    </>
  );
}

export default FooterMenu;
