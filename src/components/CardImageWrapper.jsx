import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import swal from 'sweetalert';
import Edit from './button/Edit';
import { openModal } from '../features/modal/modalSlice';
import Delete from './button/Delete';
import EditImageName from '../pages/admin/news/EditImageName';
import { deleteMedias } from '../hooks/useMediaData';

export default function CardImageWrapper({ data, editNameData }) {
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

  return (
    <div className="border border-black rounded-sm cursor-move">
      <div className="flex items-center py-2 px-4 text-white border-b border-[#1F2937]">
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
        <EditImageName imageName={editNameData} />
      </div>
    </div>
  );
}
