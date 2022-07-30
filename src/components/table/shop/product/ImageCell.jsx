import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { closeModal, openModal } from '../../../../features/modal/modalSlice';

export default function ImageCell({ column, row }) {
  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal);
  const closeModalHandler = () => dispatch(closeModal());
  // console.log(row.original[column.imgAccessor][0].url)

  return (
    <div className="flex items-center">
      <button onClick={() => dispatch(openModal({ componentName: 'ShowShopProduct', id: '' }))} type="button" className="w-40 flex-shrink-0">
        <img className="h-20 w-full object-cover" src={`${row.original[column.imgAccessor][0].url}`} alt="" />
      </button>
      {dataModal.isOpen === true && dataModal.componentName === 'ShowShopProduct' && !dataModal.id && (
        <Modal
          isOpen={dataModal.isOpen}
          onRequestClose={closeModalHandler}
          contentLabel="My dialog"
          className="fixed  flex  h-screen w-screen items-center justify-center  "
          overlayClassName="myoverlay "
          closeTimeoutMS={500}
        >
          <img className="h-auto" src={`${row.original[column.imgAccessor][0].url}`} alt="" />
        </Modal>
      )}
    </div>
  );
}
