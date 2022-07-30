import { useDispatch, useSelector } from 'react-redux';
import Add from '../../../components/button/Add';
import Delete from '../../../components/button/Delete';
import Edit from '../../../components/button/Edit';
import { useCollectionDetail, useDestroyCollMenu, useUpdateCollection } from '../../../hooks/useCollectionMenusData';
import ModalWrapper from '../../../components/modal/ModalWrapper';
import CollectionForm from '../../../components/form/menu/CollectionForm';
import { openModal } from '../../../features/modal/modalSlice';
import { isSubmitOn } from '../../../features/crudSlice';
import { useState } from 'react';
// import { Button } from '@mui/material';
import swal from 'sweetalert';
import { useMutation } from '@tanstack/react-query';
import request from '../../../utils/axios-utils';

export default function CollectionCard({ data }) {
  const dispatch = useDispatch();

  const dataModal = useSelector((state) => state.modal);
  const dataState = useSelector((state) => state);
  const { id } = dataModal;
  const collectionId = dataModal.id;

  const [bulkMenuDel, setBulkMenuDel] = useState([]);

  console.log(bulkMenuDel);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      const newSelection = Array.from(bulkMenuDel);
      newSelection.push(parseInt(value));
      setBulkMenuDel(newSelection);
    } else {
      const newSelection = bulkMenuDel;
      const newSubs = newSelection.filter((sub) => parseInt(sub) !== parseInt(value));
      setBulkMenuDel(newSubs);
    }
  };

  const { mutate: updateCollection } = useUpdateCollection(id, data);

  const onFormSubmit = async (dataMenu) => {
    await updateCollection(dataMenu);
  };

  const { isLoading, data: collectionDetail, isError, error, isSuccess } = useCollectionDetail(id);

  const removeCollMenu = useDestroyCollMenu();


  const deleteMenu = async (data) =>
    request({
      url: `/menus/collections/bulk_delete`,
      method: 'delete',
      data,
    });

  const { mutateAsync: destroyMenus } = useMutation(deleteMenu, {
    onSuccess: async () => {
      // await qClient.invalidateQueries('menus');
    },
  });


  const onDestroyMenu = async (data) => {
    await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        destroyMenus({ ids: data });
        swal('Poof! Your imaginary file has been deleted!', { icon: 'success' });
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* <Button
        color="success"
        onClick={() => onDestroyMenu(bulkMenuDel)}
        className="ml-auto flex bg-red-600 text-white"
        type="button"
        variant="filled"
      >
        Delete Selected Menu
      </Button> */}
      {data?.map((dataMenu) => (
        <div key={dataMenu.id} className="">
          <div className="bg-indigo-300 px-3 py-2 text-white font-semibold flex relative">
            <input
              type="checkbox"
              name="lang"
              value={dataMenu.id}
              onChange={handleChange}
              className="absolute top-3 left-3 w-5 h-5"
            />
            <div className="">{dataMenu.name}</div>

            <div className="flex ml-auto gap-x-1">
              <Edit
                tooltip={`Edit ${dataMenu.name}`}
                variant="bordered"
                onClick={() =>
                  dispatch(
                    openModal({
                      componentName: "EditCollection",
                      id: dataMenu.id,
                    })
                  )
                }
              />
              <Delete
                onClick={() => removeCollMenu(dataMenu.id)}
                tooltip={`Delete ${dataMenu.name}`}
                variant="bordered"
              />
            </div>
          </div>
          <div className="bg-white p-4">
            <div className="flex items-center">
              <Add
                title="Go To Menu"
                link={`/admin/menus/collection/${dataMenu.id}`}
                // onClick={() => dispatch(getParent({ name: data.name}))}
              />
            </div>
          </div>
          <ModalWrapper
            componentName="EditCollection"
            header="Edit Collection Menu"
            modalId={dataMenu?.id}
            maxWidth="sm"
            onClick={() =>
              dispatch(isSubmitOn({ componentName: "EditCollection" }))
            }
          >
            <CollectionForm
              defaultValues={collectionDetail?.data}
              key={collectionDetail?.data?.id}
              onFormSubmit={onFormSubmit}
            />
          </ModalWrapper>
        </div>
      ))}
    </div>
  );
}

