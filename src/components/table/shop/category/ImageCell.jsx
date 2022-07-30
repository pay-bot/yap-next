import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../../../features/modal/modalSlice';

export default function ImageCell({ column, row }) {
  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal);
  const closeModalHandler = () => dispatch(closeModal());
  // console.log(row)

  return (
    <div className="flex items-center">
      <button onClick={() => dispatch(openModal({ componentName: 'ShowShopCategory', id: '' }))} type="button" className="w-40 flex-shrink-0">
        <img className="h-20 w-full object-cover" src={`${process.env.REACT_APP_API_ASSET_URL}/uploads/images/${row.original[column.imgAccessor]}`} alt="" />
      </button>
      {dataModal.isOpen === true && dataModal.componentName === 'ShowShopCategory' && !dataModal.id && (
        <Modal
          isOpen={dataModal.isOpen}
          onRequestClose={closeModalHandler}
          contentLabel="My dialog"
          className="fixed  flex  h-screen w-screen items-center justify-center  "
          overlayClassName="myoverlay "
          closeTimeoutMS={500}
        >
          <img className="h-auto" src={`${process.env.REACT_APP_API_ASSET_URL}/uploads/images/${row.original[column.imgAccessor]}`} alt="" />
        </Modal>
      )}
    </div>
  );
}
