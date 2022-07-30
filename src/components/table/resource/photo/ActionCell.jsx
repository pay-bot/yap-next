import { useMutation, useQueryClient } from 'react-query';
import swal from 'sweetalert';
import { toast } from 'react-toastify';

import Delete from '../../../button/Delete';
import { updateResources } from '../../../../hooks/useResourcesData';

import { deletePhoto } from '../../../../hooks/usePhotosData';

export default function ActionCell({ value, data }) {
  const queryClient = useQueryClient();
  // console.log("in", dataModal);

  const { mutateAsync: mutateUpdate } = useMutation(updateResources, {
    onSuccess: (e) => {
      queryClient.invalidateQueries('resourcesCategory');
      if (e.request.status === 200) {
        toast.success('Category has been created', { position: 'top-right' });
      } else {
        toast.error('Category failed to create  ', { position: 'top-right' });
      }
    },
  });

  const { mutateAsync: deleteResources } = useMutation(deletePhoto, {
    onSuccess: () => {
      queryClient.invalidateQueries('photos');
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

  return (
    <div className="flex items-center gap-x-1">
      {data.map((pot) => {
        let html;
        if (pot.id === value) {
          return <Delete key={value} tooltip={`Delete ${pot.name}`} onClick={() => removeResource(value)} />;
        }
        return html;
      })}
    </div>
  );
}
