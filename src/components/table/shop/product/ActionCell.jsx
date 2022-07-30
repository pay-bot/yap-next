import { useMutation, useQueryClient } from 'react-query';

import swal from 'sweetalert';
import Edit from '../../../button/Edit';
import Delete from '../../../button/Delete';
import { deleteShopProducts } from '../../../../hooks/useShopProductsData';
import AddMedia from '../../../button/AddMedia';

export default function ActionCell({ value, data }) {
  // console.log('band', data)

  const queryClient = useQueryClient();
  const { mutateAsync: deleteCategory } = useMutation(deleteShopProducts, {
    onSuccess: () => {
      queryClient.invalidateQueries('banners');
    },
  });
  const removeCategory = async (id) => {
    await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCategory(id);
        swal('Poof! Your imaginary file has been deleted!', { icon: 'success' });
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };

  return (
    <div className="flex items-center gap-x-1">
      {data.map((prod) => {
        let html;

        if (prod.id.toString() === value.toString()) {
          return (
            <>
              <AddMedia link={`/admin/shop/products/${value}/resources`} tooltip={`Add Media ${prod.name}`} />
              <Edit tooltip={`Edit ${prod.name}`} link={`/admin/shop/products/${value}/edit`} />
              <Delete tooltip={`Delete ${prod.name}`} onClick={() => removeCategory(value)} />
            </>
          );
        }
        return html;
      })}
    </div>
  );
}
