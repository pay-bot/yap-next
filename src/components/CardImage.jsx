import React from 'react';
import { useForm } from 'react-hook-form';

import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

import { useDispatch } from 'react-redux';
import Edit from '../../../../components/button/Edit';
import { openModal } from '../../../../features/modal/modalSlice';
import { deleteMedias } from '../../../../hooks/useMediaData';
// import EditImageName from './EditImageName'
import Delete from '../../../../components/button/Delete';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CardImage({ data, editNameData }) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    // defaultValues,
  });
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading: isMutating } = useMutation(deleteMedias, {
    onSuccess: () => {
      queryClient.invalidateQueries('medias');
    },
  });

  const removeArticleMedia = async (id) => {
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
        queryClient.invalidateQueries('medias');
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };

  const createCategory = (data) => {
    return request({
      url: `/news/categories`,
      method: 'post',
      data,
    });
  };

  const { mutateAsync: updateName } = useMutation(createCategory, {
    onSuccess: (e) => {
      queryClient.invalidateQueries('articleCategories');
      console.log('d', e);
      if (e.request.status === 200) {
        toast.success('Article category has been created', { position: 'top-right' });
        setTimeout(closeModalHandler, 1000);
      } else {
        toast.error('Article category failed to create  ', { position: 'top-right' });
        setTimeout(closeModalHandler, 1000);
      }
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log('submit', data);
    // setAddarray((prev) => [...prev, state]);
    updateName(data);
  });

  // console.log('cc', data)
  return (
    <div className="border border-black rounded-sm">
      <div className="flex items-center py-2 px-4 text-white border-b border-[#1F2937]">
        {/* <FormInputRadio name={'radioValue'} control={control} label={'Radio Input'} value={data.id} onChange={(e) => console.log(e.target.value)} /> */}

        {/* <RadioContainer
          control={control}
          name="gender"
          label="Gender"
          // value='1'
          onClick={() => console.log(data.id)}
        // defaultValue="female"
        /> */}
        <div className="ml-auto">
          <Delete tooltip={`Delete ${data.name} `} onClick={() => removeArticleMedia(data.id)} />
        </div>
      </div>
      <div className="">
        <img src={data.url} alt="" className="h-48 w-64 object-cover" />
      </div>
      <div className="">
        <div className="flex bg-gray-300 p-2 border-t border-black">
          <div className="mr-auto">{data.name.length > 20 ? `${data.name.slice(0, 20)}...` : data.name}</div>
          <Edit tooltip={`Edit name ${data.name} `} onClick={() => dispatch(openModal({ componentName: 'EditNameImgArticle', id: data.id }))} />
        </div>
        {/* <EditImageName imageName={editNameData} /> */}
      </div>
    </div>
  );
}
