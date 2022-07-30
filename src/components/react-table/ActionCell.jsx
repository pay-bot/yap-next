// import { useDispatch, useSelector } from 'react-redux';
// import { useMutation, useQueryClient } from 'react-query';
// import swal from 'sweetalert';
// import { toast } from 'react-toastify';
// import { closeModal, openModal } from '../../../../features/modal/modalSlice';

// import { deleteArticleCategories, updateArticleCategories } from '../../../../hooks/useArticleCategoriesData';
// import ArticleCategoryForm from '../../../form/article/category/ArticleCategoryForm';
// import Edit from '../../../button/Edit';
// import Delete from '../../../button/Delete';
// import { closeLoading, isReactLoading } from '../../../../features/reactLoadingSlice';
// import ModalWrapper from '../../../modal/ModalWrapper';

// export function ActionCell({ value, column, row, data }) {
//   // console.log(data);

//   const dispatch = useDispatch();
//   const dataModal = useSelector((state) => state.modal);
//   // console.log("in", dataModal);
//   const closeModalHandler = () => dispatch(closeModal());

//   const { id } = dataModal;

//   const onFormSubmit = async (data) => {
//     dispatch(isReactLoading());
//     await mutateUpdate({ ...data, id });
//     dispatch(closeLoading());
//     dispatch(closeModal());
//   };

//   const { mutateAsync: mutateUpdate, isLoading: isMutatingUpdate } = useMutation(updateArticleCategories, {
//     onSuccess: (e) => {
//       queryClient.invalidateQueries('articleCategories');
//       if (e.request.status === 200) {
//         toast.success('Article Category has been created', { position: 'top-right' });
//       } else {
//         toast.error('Article Category failed to create  ', { position: 'top-right' });
//       }
//     },
//   });

//   const queryClient = useQueryClient();
//   const { mutateAsync, isLoading: isMutating } = useMutation(deleteArticleCategories, {
//     onSuccess: (e) => {
//       queryClient.invalidateQueries('articleCategories');
//     },
//   });
//   const removeArticleCat = async (id) => {
//     await swal({
//       title: 'Are you sure?',
//       text: 'Once deleted, you will not be able to recover this imaginary file!',
//       icon: 'warning',
//       buttons: true,
//       dangerMode: true,
//     }).then((willDelete) => {
//       if (willDelete) {
//         mutateAsync(id);
//         swal('Poof! Your imaginary file has been deleted!', { icon: 'success' });
//       } else {
//         swal('Your imaginary file is safe!');
//       }
//     });
//   };

//   return (
//     <div className="flex items-center gap-x-1 ">
//       {data.map((data) => {
//         if (data.id === value) {
//           return (
//             <>
//               <Edit tooltip={`Edit ${data.name}`} onClick={() => dispatch(openModal({ componentName: 'EditArticleCat', id: value }))} />
//               <Delete tooltip={`Delete ${data.name}`} onClick={() => removeArticleCat(value)} />
//             </>
//           );
//         }
//       })}
//       <ModalWrapper componentName="EditArticleCat" modalid={value}>
//         {data.map((data) => {
//           if (data.id == dataModal.id) {
//             return (
//               <ArticleCategoryForm
//                 defaultValues={data}
//                 key={data.id}
//                 onFormSubmit={onFormSubmit}
//                 // isLoading={isMutatingUpdate}
//               />
//             );
//           }
//         })}
//       </ModalWrapper>
//     </div>
//   );
// }
