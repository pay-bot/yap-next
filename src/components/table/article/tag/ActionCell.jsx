import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import { closeModal, openModal } from '../../../../features/modal/modalSlice';

import { deleteArticleTags, updateArticleTags } from '../../../../hooks/useArticleTagsData';
import ArticleTagForm from '../../../form/article/ArticleTagForm';
import Edit from '../../../button/Edit';
import Delete from '../../../button/Delete';
import { closeLoading, isReactLoading } from '../../../../features/reactLoadingSlice';
import ModalWrapper from '../../../modal/ModalWrapper';

export default function ActionCell({ value, data }) {
  // console.log(data);

  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal);
  const queryClient = useQueryClient();
  // console.log("in", dataModal);
  const closeModalHandler = () => dispatch(closeModal());

  const { id } = dataModal;

  const { mutateAsync: mutateUpdate, isLoading: isMutatingUpdate } = useMutation(updateArticleTags, {
    onSuccess: (e) => {
      queryClient.invalidateQueries('articleTags');
      if (e.request.status === 200) {
        toast.success('Article Tag has been updated', { position: 'top-right' });
      } else {
        toast.error('Article Tag failed to update  ', { position: 'top-right' });
      }
    },
  });

  const { mutateAsync } = useMutation(deleteArticleTags, {
    onSuccess: (_e) => {
      queryClient.invalidateQueries('articleTags');
    },
  });
  const removeArticleTag = async (e) => {
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

  const onFormSubmit = async (e) => {
    dispatch(isReactLoading());

    await mutateUpdate({ ...e, id });
    dispatch(closeLoading());

    closeModalHandler();
  };
  return (
    <div className="flex items-center gap-x-1 ">
      {data.map((tag) => {
        let html;
        if (tag.id.toString() === value.toString()) {
          return (
            <>
              <Edit tooltip={`Edit ${tag.name}`} onClick={() => dispatch(openModal({ componentName: 'EditArticleTag', id: value }))} />
              <Delete tooltip={`Delete ${tag.name}`} onClick={() => removeArticleTag(value)} />
            </>
          );
        }
        return html;
      })}

      <ModalWrapper componentName="EditArticleTag" modalid={value}>
        {data.map((tag) => {
          let html;

          if (tag.id === dataModal.id) {
            return <ArticleTagForm defaultValues={tag} key={tag.id} onFormSubmit={onFormSubmit} isLoading={isMutatingUpdate} />;
          }
          return html;
        })}
      </ModalWrapper>
    </div>
  );
}
