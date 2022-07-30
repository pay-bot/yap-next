import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse } from '@mui/material';
import swal from 'sweetalert';

import classnames from 'classnames';
import { useMutation, useQueryClient } from 'react-query';
import { deleteHeader, useMenusHeaderData } from '../../../../hooks/useMenusData';
import { openModal } from '../../../../features/modal/modalSlice';

function HeaderMenu({ route }) {
  const [anchorEl, setAnchorEl] = useState({ id: '', isParent: false });

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

  const { data: navs } = useMenusHeaderData();

  const sidebar = useSelector((state) => state.sidebar.isOpen);

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
      queryClient.invalidateQueries('menuHeader');
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
      <div key={route.id} className="my-2 w-6/12 items-center rounded-md bg-white">
        <div className={` w-full items-center rounded-md border-b border-blue-400 bg-white px-6 py-1 ${isMenuOpen === true ? 'bg--600 ' : ''}`}>
          <div key={route.id} className="flex items-center py-1">
            <div className="px-2">
              {uniqueNames === route.id.toString() ? (
                <butoon type="button" onClick={toggleMenu} className="" animate={isMenuOpen ? { rotate: -90 } : { rotate: 0 }}>
                  <div className={classnames('rounded-full', isMenuOpen && 'bg-blue-200')}>
                    <img src="/expand.svg" alt="" className="h-5 w-5" />
                  </div>
                </butoon>
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
              <FontAwesomeIcon title={`Add Children${route.name}`} onClick={() => dispatch(openModal({ componentName: 'AddChildMenu', id: route.id }))} icon="fas fa-bars" />
              <div className="realative">
                <FontAwesomeIcon onClick={() => [!uniqueNames ? removeNav(route.id) : handleClickParent(route.id)]} icon="fas fa-trash" />
                {anchorEl.isParent && anchorEl.id === route.id && <div className="absolute rounded-md border-2 border-red-600 bg-white p-1">You cannot delete menu with child</div>}
              </div>
              <FontAwesomeIcon onClick={() => dispatch(openModal({ componentName: 'EditMenu', id: route.id }))} icon="fas fa-edit" />
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
                  <div className={`my-1 flex gap-x-1 rounded-md border-b border-green-400 bg-white py-1 px-6 ${sidebar ? 'ml-8' : 'ml-1'}`}>
                    <div className="gap-x-1 px-2" />

                    <div className="text-black">{data.name}</div>
                    <div className="ml-auto flex gap-x-1">
                      <FontAwesomeIcon onClick={() => removeNav(data.id)} icon="fas fa-trash" />
                      <FontAwesomeIcon onClick={() => dispatch(openModal({ componentName: 'EditMenu', id: data.id }))} icon="fas fa-edit" />
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
