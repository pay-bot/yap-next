import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../features/modal/modalSlice';

export default function TestModal({ modalData, id }) {
  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal);
  console.log('in', dataModal);

  return <div onClick={() => dispatch(openModal({ componentName: '', id }))}>{modalData}</div>;
}
