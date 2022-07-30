import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../../features/modal/modalSlice';
import ModalWrapper from '../../../modal/ModalWrapper';

export default function ImageCell({ column, row }) {
  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal);

  return (
    <div className="flex items-center">
      <button onClick={() => dispatch(openModal({ componentName: 'ShowPhotoModal', id: row.original[column.imgAccessor] }))} type="button" className="w-40 flex-shrink-0">
        <img className="h-20 w-full object-cover" src={`${row.original[column.imgAccessor]}`} alt="" />
      </button>
      <ModalWrapper componentName="ShowPhotoModal" modalid={dataModal.id}>
        <img className="h-auto" src={`${dataModal.id}`} alt="" />
      </ModalWrapper>
    </div>
  );
}
