import { useMutation, useQueryClient } from 'react-query';

import swal from 'sweetalert';
import Edit from '../../button/Edit';
import Delete from '../../button/Delete';
import { deletePage } from '../../../hooks/usePagesData';
import Manage from '../../button/Manage';

export default function ActionCell({ value, data }) {
  const queryClient = useQueryClient();
  const { mutateAsync: deletePages } = useMutation(deletePage, {
    onSuccess: () => {
      queryClient.invalidateQueries('pages');
    },
  });
  const removePage = async (id) => {
    await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletePages(id);
        swal('Poof! Your imaginary file has been deleted!', { icon: 'success' });
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };

  return (
    <div className="flex items-center gap-x-1">
      {data.map((page) => {
        let html;
        if (page.id.toString() === value.toString()) {
          return (
            <>
              <Manage tooltip={`Manage ${page.name}`} link={`/admin/pages/${value}/sections`} />
              <Edit tooltip={`Edit ${page.name}`} link={`/admin/pages/${value}/edit`} />
              <Delete tooltip={`Delete ${page.name}`} onClick={() => removePage(value)} />
            </>
          );
        }
        return html;
      })}
    </div>
  );
}
