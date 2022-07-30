// import React from 'react'
// import AddMenuHeaderModal from '../../../../components/modal/AddMenuHeaderModal'
// import Headers from './Headers'
// import Edit from '../../../../components/button/Edit'
// import { openModal, closeModal } from '../../../../features/website/modal/modalSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import MenuForm from '../../../../components/form/menu/Form'
// import { useMutation, useQueryClient } from "react-query";
// import Modal from "react-modal";
// import request from '../../../../utils/axios-utils'
// import TitlePage from '../../../../components/TitlePage'
// import ContentHeading from "../../../../components/layout/ContentHeading";
// import SectionWrapper from "../../../../components/layout/SectionWrapper";
// import Add from '../../../../components/button/Add'
// import { toast } from 'react-toastify'

// import { useMenusHeaderData, updateHeader } from '../../../../hooks/useMenusData'

// export default function Header() {
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();

//   const { isReactLoading, data: headers, isError, error, refetch } = useMenusHeaderData();

//   console.log('head', headers)

//   const createHeader = (data) => {
//     return request({
//       url: `/menus/header`,
//       method: "post",
//       data,
//     });
//   };

//   const { mutateAsync } = useMutation(createHeader, {
//     onSuccess: (e) => {
//       queryClient.invalidateQueries("menuHeader");
//       if (e.request.status === 200) {
//         toast.success("Header has been created", {
//           position: "top-right",
//         });
//         dispatch(closeModal())

//       } else {
//         toast.error("Header failed to create  ", {
//           position: "top-right",
//         });
//         dispatch(closeModal())

//       }
//     },
//   });

//   const onSubmitHeader = async (data) => {
//     await mutateAsync(data);
//     dispatch(closeModal())
//   };

//   const dataModal = useSelector((state) => state.modal);

//   const id = dataModal.id;

//   // const { mutateAsync: mutateUpdate, isLoading: isMutatingUpdate } =
//   // useMutation(updateHeader);

//   // const onUpdateNav = async (data) => {
//   //   await mutateUpdate({ ...data, id });
//   // };

//   const updateHeader = (data) => {
//     return request({
//       url: `/menus/header/${id}`,
//       method: "post",
//       data,

//     }
//     );
//   };

//   const { mutateAsync: mutateUpdate } = useMutation(updateHeader,
//     {
//       onSuccess: (e) => {
//         queryClient.invalidateQueries("menuHeader");

//         if (e.request.status === 200) {
//           toast.success("Header has been updated", {
//             position: "top-right",
//           })
//           // dispatch(closeLoading());
//         } else {
//           toast.error("Header failed to update  ", {
//             position: "top-right",
//           })
//           // dispatch(closeLoading());
//         }
//       },

//     });

//   const onUpdateHeaders = async (data) => {
//     // dispatch(isReactLoading());
//     await mutateUpdate(data);
//   };

//   return (
//     <>
//       <TitlePage title="Menu Header" description="" />
//       <SectionWrapper>
//         <ContentHeading
//         >
//           <Add onClick={() =>
//             dispatch(openModal({ componentName: "AddMenuHeaderModal", id: null }))
//           }
//             title='Create Header'
//           />

//         </ContentHeading>
//         {/* <Edit
//         onClick={() =>
//           dispatch(openModal({ componentName: "AddMenuHeaderModal", id: null }))
//         }
//         /> */}
//         <Headers />
//       </SectionWrapper>
//       <AddMenuHeaderModal />
//       {dataModal.isOpen === true &&
//         dataModal.componentName === "AddChildHeader" && (
//           <Modal
//             isOpen={dataModal.isOpen}
//             // onRequestClose={closeModalHandler}
//             contentLabel="My dialog"
//             className="fixed  flex  h-screen w-screen items-center justify-center "
//             overlayClassName="myoverlay "
//             closeTimeoutMS={500}
//           >

//             <MenuForm
//               // defaultValues={data}
//               // key={data.id}
//               onFormSubmit={onSubmitHeader}
//             />

//           </Modal>
//         )}
//       {dataModal.isOpen === true &&
//         dataModal.componentName === "EditMenu" && (
//           <Modal
//             isOpen={dataModal.isOpen}
//             // onRequestClose={closeModalHandler}
//             contentLabel="My dialog"
//             className="fixed  flex  h-screen w-screen items-center justify-center "
//             overlayClassName="myoverlay "
//             closeTimeoutMS={500}
//           >
//             {headers?.data?.map((data) => {
//               if (data.id === dataModal.id) {
//                 return <MenuForm
//                   defaultValues={data}
//                   key={data.id}
//                   onFormSubmit={onUpdateHeaders}
//                 />
//               }
//             })}

//           </Modal>
//         )}

//     </>
//   )
// }
