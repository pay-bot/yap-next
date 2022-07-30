import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import TitlePage from '../../../components/TitlePage';
import { useSectionData } from '../../../hooks/useSectionData';

import SectionWrapper from '../../../components/layout/SectionWrapper';
import TabsContent from './TabsContent';

export default function EditContent() {
  const { pageId, sectionId, contentId } = useParams();

  const { data, isSuccess } = useQuery(['sectionsContent', { pageId, sectionId, contentId }], useSectionData);

  const content = isSuccess ? data?.content.content_category : [];

  let val;

  if (content === 'Content') {
    val = 0;
  }
  if (content === 'Article') {
    val = 2;
  }
  if (content === 'Text') {
    val = 2;
  }
  if (content === 'Media') {
    val = 3;
  }

  return (
    <SectionWrapper>
      {isSuccess && <TabsContent val={val} data={data} />}
    </SectionWrapper>
  );
}
