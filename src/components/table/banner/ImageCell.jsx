import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../features/modal/modalSlice';
import ModalWrapper from '../../modal/ModalWrapper';

export default function ImageCell({ column, row }) {
  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal);
  console.log(row.original[column.imgAccessor]);

  return (
    <div className="flex items-center">
      <button type="button" onClick={() => dispatch(openModal({ componentName: 'ShowBannerModal', id: row.original[column.imgAccessor] }))} className="w-40 flex-shrink-0">
        <img className="h-20 w-full object-cover" src={`${process.env.REACT_APP_API_ASSET_URL}/uploads/images/${row.original[column.imgAccessor]}`} alt="" />
      </button>
      <ModalWrapper componentName="ShowBannerModal" modalid={dataModal.id}>
        <img className="h-auto" src={`${process.env.REACT_APP_API_ASSET_URL}/uploads/images/${dataModal.id}`} alt="" />
      </ModalWrapper>
    </div>
  );
}
