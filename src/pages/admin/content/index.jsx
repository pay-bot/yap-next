import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { ReactSortable } from 'react-sortablejs';
import { fetchSections } from '../../../hooks/useSectionsData';
import TitlePage from '../../../components/TitlePage';
import SectionWrapper from '../../../components/layout/SectionWrapper';
import AttachContent from './AttachContent';
import request from '../../../utils/axios-utils';
import ContentCard from './ContentCard';
import Add from '../../../components/button/Add';
import ContentHeading from '../../../components/layout/ContentHeading';
import SnackBarWrapper from '../../../components/materialUI/SnackBarWrapper';

export default function Content() {
  const { pageId, sectionId } = useParams();

  const queryClient = useQueryClient();
  const [onMove, setOnMove] = useState(false);

  const handleMoveStart = () => {
    setOnMove(true);
  };
  const handleMoveEnd = () => {
    setOnMove(false);
  };

  const { data: section, isSuccess } = useQuery(['sections', { pageId }], fetchSections);
  const attachContent = isSuccess ? section?.data?.content : [];

  const attach = Object.entries(attachContent).map(([id, name]) => {
    return {
      id,
      name,
    };
  });

  const sectionIdSort = [];
  section?.data?.model?.sections?.map((data) => {
    return sectionIdSort.push(data);
  });

  const vipotContent = [];
  sectionIdSort.map((data) => {
    return vipotContent.push(data);
  });

  // console.log('sot', vipotContent)

  const createContent = (data) => {
    return request({
      url: `/pages/${pageId}/sections/${sectionId}/content/attach`,
      method: 'post',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const { mutateAsync } = useMutation(createContent, {
    onSuccess: (e) => {
      // console.log('d', e)
      if (e.request.status === 200) {
        toast.success('Content has been created', { position: 'top-right' });
        queryClient.invalidateQueries('sections');
        // navigate('/admin/pages');
        // dispatch(closeLoading());
        // navigate(`/admin/pages/${pageId}/sections`);
      } else {
        toast.error('Content failed to create  ', { position: 'top-right' });
        // dispatch(closeLoading());
      }
    },
  });

  const onSubmitContent = async (data) => {
    // dispatch(isReactLoading());
    await mutateAsync(data);
  };

  let sectionName;
  const dataCont = [];
  vipotContent.map((data) => {
    if (data.id.toString() === sectionId.toString()) {
      sectionName = data.name;
      console.log('df', data);
      return (
        <>
          {data.components.map((comp) => {
            return dataCont.push(comp);
          })}
        </>
      );
    }
    return null;
  });

  const sortedCont = isSuccess ? _.sortBy(dataCont, 'list_order') : [];

  const [sorCont, setSorCont] = useState([]);
  useEffect(() => {
    setSorCont(sortedCont);
  }, [section]);

  // console.log('sssor', sor)
  const dndCont = sorCont?.map((item) => {
    return { id: item.id };
  });

  const orderContent = (data) => {
    return request({
      url: `/pages/${pageId}/sections/${sectionId}/content/order`,
      method: 'post',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const { mutateAsync: saveSortCont } = useMutation(orderContent, {
    onSuccess: (e) => {
      if (e.request.status === 200) {
        toast.success('Content has been sorted', { position: 'top-right' });
        // dispatch(closeLoading());
      } else {
        toast.error('Content failed to sorted', { position: 'top-right' });
        // dispatch(closeLoading());
      }
    },
  });

  async function saveBoard() {
    const formData = new FormData();
    formData.append('list', JSON.stringify(dndCont));
    await saveSortCont(formData);
    handleMoveEnd();
  }

  const checkCont = sorCont?.map((item) => {
    return {
      id: item.id.toString(),
      name: item.heading,
    };
  });
  const fill = attach.filter((value) => {
    return !checkCont.some((item) => value.name === item.name);
  });

  // console.log('c', fill)

  return (
    <SectionWrapper>
      
      <ContentHeading>
        <div className="w-full">
          <div className="pb-4">
            <Add link={`/admin/pages/${pageId}/sections/${sectionId}/content/create`} title="Create Content" />
          </div>
          <AttachContent dataContent={fill} onFormSubmit={onSubmitContent} />
        </div>
      </ContentHeading>
      <SnackBarWrapper open={onMove} onClose={handleMoveEnd} severity="warning" message="Drag Mode On" />
      <ReactSortable swap list={sorCont} setList={setSorCont} onEnd={saveBoard} onStart={handleMoveStart}>
        {sorCont.map((data) => (
          <ContentCard key={data.id} data={data} />
        ))}
      </ReactSortable>

      {/* </ContentWrapper> */}
    </SectionWrapper>
  );
}
