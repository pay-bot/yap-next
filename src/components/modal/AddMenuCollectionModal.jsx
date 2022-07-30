import CollectionForm from '../form/menu/CollectionForm';
import ModalWrapper from './ModalWrapper';
import { useAddMenuCollectionData } from '../../hooks/useCollectionMenusData';
import { useDispatch } from 'react-redux';
import { isSubmitOn } from '../../features/crudSlice';

export default function AddMenuCollectionModal() {
  const dispatch = useDispatch();
  const { mutate: addMenu } = useAddMenuCollectionData();

  const onSubmitCollection = async (data) => {
    await addMenu(data);
  };

  return (
    <ModalWrapper componentName="AddMenuCollection" modalId="" header="Add Menu Collection" onClick={() => dispatch(isSubmitOn({ componentName: 'AddMenuCollection' }))}>
      <CollectionForm onFormSubmit={onSubmitCollection} isLoading="" />
    </ModalWrapper>
  );
}
