import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import { closeModal, openModal } from '../../../../features/modal/modalSlice';

import Delete from '../../../button/Delete';
import { deleteResource, updateResources } from '../../../../hooks/useResourcesData';
import Edit from '../../../button/Edit';

import AddMedia from '../../../button/AddMedia';
import CategoryForm from '../../../form/category/CategoryForm';

import ModalWrapper from '../../../modal/ModalWrapper';
import { closeLoading, isReactLoading } from '../../../../features/reactLoadingSlice';

export default function ActionCell({ value, data }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const dataModal = useSelector((state) => state.modal);
  // console.log("in", dataModal);

  const { mutateAsync: mutateUpdate, isLoading: isMutatingUpdate } = useMutation(updateResources, {
    onSuccess: (e) => {
      queryClient.invalidateQueries('resourcesCategory');
      if (e.request.status === 200) {
        toast.success('Category has been created', { position: 'top-right' });
      } else {
        toast.error('Category failed to create  ', { position: 'top-right' });
      }
    },
  });

  const { mutateAsync: deleteResources } = useMutation(deleteResource, {
    onSuccess: () => {
      queryClient.invalidateQueries('resourcesCategory');
    },
  });
  const removeResource = async (id) => {
    await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteResources(id);
        swal('Poof! Your imaginary file has been deleted!', { icon: 'success' });
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };

  const onFormSubmit = async (e) => {
    dispatch(isReactLoading());
    await mutateUpdate(e);
    dispatch(closeLoading());
    dispatch(closeModal());
  };

  return (
    <>
      <div className="flex items-center gap-x-1">
        {data.map((re) => {
          let html;

          if (re.id === value) {
            return (
              <>
                <AddMedia link={`/admin/resources/resource-category/${value}/resources`} tooltip={`Add Media ${re.name}`} />
                <Edit tooltip={`Edit ${re.name}`} onClick={() => dispatch(openModal({ componentName: 'EditResourceCategory', id: value }))} />
                <Delete tooltip={`Delete ${re.name}`} onClick={() => removeResource(value)} />
              </>
            );
          }
          return html;
        })}
      </div>
      <ModalWrapper componentName="EditResourceCategory" modalid={value}>
        {data.map((re) => {
          let html;

          if (re.id.toString() === dataModal.id.toString()) {
            return <CategoryForm defaultValues={re} key={re.id} onFormSubmit={onFormSubmit} isLoading={isMutatingUpdate} />;
          }
          return html;
        })}
      </ModalWrapper>
    </>
  );
}
