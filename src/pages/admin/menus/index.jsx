import { useDispatch } from 'react-redux';
import TitlePage from '../../../components/TitlePage';
import SectionWrapper from '../../../components/layout/SectionWrapper';
import ContentHeading from '../../../components/layout/ContentHeading';
import Add from '../../../components/button/Add';
import { openModal } from '../../../features/modal/modalSlice';
import AddMenuCollectionModal from '../../../components/modal/AddMenuCollectionModal';
import { useCollectionMenusData } from '../../../hooks/useCollectionMenusData';
import CollectionCard from './CollectionCard';

export default function Menu() {
  const dispatch = useDispatch();
  const { data: collections, isSuccess } = useCollectionMenusData();

  const collectionData = isSuccess ? collections?.data : [];

  return (
    <SectionWrapper>
      <ContentHeading>
        <Add onClick={() => dispatch(openModal({ componentName: 'AddMenuCollection', id: '' }))} title="Create Collection" />
      </ContentHeading>
      <AddMenuCollectionModal />
      <CollectionCard data={collectionData} />
    </SectionWrapper>
  );
}
