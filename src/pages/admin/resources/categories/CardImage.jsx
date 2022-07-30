import { useMutation, useQueryClient } from 'react-query';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import Edit from '../../../../components/button/Edit';
import { openModal } from '../../../../features/modal/modalSlice';
import { deleteMedias } from '../../../../hooks/useMediaData';
// import EditImageName from './EditImageName'
import Delete from '../../../../components/button/Delete';

export default function CardImage({ data }) {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(deleteMedias, {
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
