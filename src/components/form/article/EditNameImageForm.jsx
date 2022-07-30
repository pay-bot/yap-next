import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { closeModal } from '../../../features/modal/modalSlice';
import Submit from '../../button/Submit';
import InputContainer from '../../input/InputContainer';
import request from '../../../utils/axios-utils';

function EditNameImageForm({ defaultValues, httpPost }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useDispatch();

  const closeModalHandler = () => dispatch(closeModal());

  const queryClient = useQueryClient();

  const editName = (data) => {
    return request({
      url: httpPost,
      method: 'post',
      data,
    });
  };

  const { mutateAsync } = useMutation(editName, {
    onSuccess: (e) => {
      queryClient.invalidateQueries('medias');

      if (e.request.status === 200) {
        toast.success('Image name has been updated', { position: 'top-right' });
        closeModalHandler();
      } else {
        toast.error('Image name failed to update  ', { position: 'top-right' });
        closeModalHandler();
      }
    },
  });

  const onSubmitArticleTag = async (data) => {
    await mutateAsync(data);
  };

  const onSubmit = async (data) => {
    await onSubmitArticleTag(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer name="name" control={control} label="Name" errors={errors.name} />
      <Submit className="mt-0" />
    </form>
  );
}

export default EditNameImageForm;
