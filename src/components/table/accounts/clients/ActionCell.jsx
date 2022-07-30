import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import { closeModal } from '../../../../features/modal/modalSlice';

import { updateArticleCategories } from '../../../../hooks/useArticleCategoriesData';
import Edit from '../../../button/Edit';
import Delete from '../../../button/Delete';
import { closeLoading, isReactLoading } from '../../../../features/reactLoadingSlice';
import ModalWrapper from '../../../modal/ModalWrapper';
import ClientForm from '../../../form/accounts/clients/ClientForm';
import { deleteClient } from '../../../../hooks/accounts/clients/useClientsData';

export default function ActionCell({ value, data }) {
  // console.log(data);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal);
  // console.log("in", dataModal);

  const { id } = dataModal;
  const { mutateAsync: mutateUpdate } = useMutation(updateArticleCategories, {
    onSuccess: (e) => {
      queryClient.invalidateQueries('articleCategories');
      if (e.request.status === 200) {
        toast.success('Article Category has been created', { position: 'top-right' });
      } else {
        toast.error('Article Category failed to create  ', { position: 'top-right' });
      }
    },
  });

  const onFormSubmit = async (e) => {
    dispatch(isReactLoading());
    await mutateUpdate({ ...e, id });
    dispatch(closeLoading());
    dispatch(closeModal());
  };

  const { mutateAsync } = useMutation(deleteClient, {
    onSuccess: () => {
      queryClient.invalidateQueries('clients');
    },
  });
  const removeArticleCat = async (e) => {
    await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutateAsync(e);
        swal('Poof! Your imaginary file has been deleted!', { icon: 'success' });
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };

  return (
    <div className="flex items-center gap-x-1 ">
      {data.map((client) => {
        let html;
        if (client.id === value) {
          return (
            <>
              <Edit tooltip={`Edit ${client.fullname}`} link={`/admin/accounts/clients/${value}/edit`} />
              <Delete tooltip={`Delete ${client.fullname}`} onClick={() => removeArticleCat(value)} />
            </>
          );
        }
        return html;
      })}
      <ModalWrapper componentName="EditClient" modalid={value}>
        {data.map((cl) => {
          let html;

          if (cl.id.toString() === dataModal.id.toString()) {
            return (
              <ClientForm
                defaultValues={cl}
                key={cl.id}
                onFormSubmit={onFormSubmit}
                // isLoading={isMutatingUpdate}
              />
            );
          }
          return html;
        })}
      </ModalWrapper>
    </div>
  );
}
