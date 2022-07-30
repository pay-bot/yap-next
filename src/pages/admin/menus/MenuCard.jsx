import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Collapse } from '@mui/material';

import classnames from 'classnames';
import swal from 'sweetalert';

import { useMutation, useQueryClient } from 'react-query';
import { deleteHeader, useMenuData } from '../../../hooks/useMenusData';
import { openModal } from '../../../features/modal/modalSlice';

import Delete from '../../../components/button/Delete';
import Edit from '../../../components/button/Edit';
import Menu from '../../../components/button/Menu';

const useClickOutside = (handler) => {
  const ref = useRef();

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, [ref, handler]);

  return [ref];
};

function HeaderMenu({ route }) {
  const [anchorEl, setAnchorEl] = useState({ id: '', isParent: false });
  const [ref] = useClickOutside(() => {
    setAnchorEl({ isParent: false, id: null });
  });

  const handleClickParent = (id) => {
    setAnchorEl({ isParent: true, id });
  };

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // console.log('ini', route)
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { data: navs } = useMenuData();

  const parId = [];

  navs?.data.map((data) => {
    if (data.parent_id === route.id) {
      return parId.push(data.parent_id);
    }
    return null;
  });

  const uniqueNames = Array.from(new Set(parId)).toString();

  const { mutateAsync } = useMutation(deleteHeader, {
    onSuccess: () => {
      queryClient.invalidateQueries('menus');
    },
  });
  const removeNav = async (id) => {
    await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutateAsync(id);
        swal('Poof! Your imaginary file has been deleted!', { icon: 'success' });
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };

  return (
    <>
      <div ref={ref} key={route.id} className="my-2 w-6/12 items-center rounded-md bg-white">
        <div className={` w-full items-center rounded-md border-b border-blue-400 bg-white px-6 py-1 ${isMenuOpen === true ? 'bg--600 ' : ''}`}>
          <div key={route.id} className="flex items-center py-1">
            <div className="px-2">
              {uniqueNames === route.id.toString() ? (
                <button type="button" onClick={toggleMenu} className="" animate={isMenuOpen ? { rotate: -90 } : { rotate: 0 }}>
                  <div className={classnames('rounded-full', isMenuOpen && 'bg-blue-200')}>
                    <img src="/expand.svg" alt="" className="h-5 w-5" />
                  </div>
                </button>
              ) : (
                <div className="rounded-full bg-gray-200">
                  <img src="/collapse.svg" alt="" className="h-5 w-5" />
                </div>
              )}
            </div>

            {/* {sidebar && ( */}
            <div key={route.id} className="text-black " title={route.name}>
              {route.name}
            </div>
            <div className="ml-auto flex justify-end gap-x-1">
              {/* <Icon>menu</Icon> */}
              <Menu tooltip={`Add Children ${route.name}`} onClick={() => dispatch(openModal({ componentName: 'AddChildMenu', id: route.id }))} />
              <div className="realative">
                <Delete tooltip={`Delete ${route.name}`} onClick={() => [!uniqueNames ? removeNav(route.id) : handleClickParent(route.id)]} />
                {anchorEl.isParent && anchorEl.id === route.id && (
                  <div className="">
                    <div className="absolute -translate-x-[50%] p-1 border-2 border-red-600 bg-red-300 rounded-md">You cannot delete menu with child </div>
                  </div>
                )}
              </div>
              <Edit tooltip={`Edit ${route.name}`} onClick={() => dispatch(openModal({ componentName: 'EditMenu', id: route.id }))} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <Collapse in={isMenuOpen}>
          <div className=" w-6/12 gap-x-1 ">
            {navs?.data.map((data) => {
              if (data.parent_id === route.id) {
                return (
                  <div className="my-1 flex gap-x-1 rounded-md border-b border-green-400 bg-white py-2 px-6 ml-8">
                    <div className="gap-x-1 px-2" />

                    <div className="text-black">{data.name}</div>
                    <div className="ml-auto flex gap-x-1">
                      <Delete tooltip={`Delete ${route.name}`} onClick={() => removeNav(data.id)} />

                      <Edit tooltip={`Edit ${data.name}`} onClick={() => dispatch(openModal({ componentName: 'EditMenu', id: data.id }))} />
                    </div>
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

export default HeaderMenu;
