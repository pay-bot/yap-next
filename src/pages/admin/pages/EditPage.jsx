import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import TitlePage from '../../../components/TitlePage';
import PageForm from '../../../components/form/page/PageForm';

import { closeLoading, isReactLoading } from '../../../features/reactLoadingSlice';
import { usePageData } from '../../../hooks/usePageData';
import SectionWrapper from '../../../components/layout/SectionWrapper';
import request from '../../../utils/axios-utils';

export default function EditPage() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data } = useQuery(['page', { pageId }], usePageData);
  console.log('page', data);

  const updatePage = (dataPage) => {
    return request({
      headers: { 'Content-Type': 'application/json' },
      url: `/pages/${pageId}`,
      method: 'post',
      data: dataPage,
    });
  };

  const { mutateAsync } = useMutation(updatePage, {
    onSuccess: (e) => {
      queryClient.invalidateQueries('page');
      if (e.request.status === 200) {
        toast.success('Page has been updated', { position: 'top-right' });
        navigate(-1);
        dispatch(closeLoading());
      } else {
        toast.error('Page failed to update  ', { position: 'top-right' });
        dispatch(closeLoading());
      }
    },
  });

  const onFormSubmit = async (dataPage) => {
    dispatch(isReactLoading());
    await mutateAsync(dataPage);
  };

  return (
    <SectionWrapper>
      <PageForm defaultValues={data?.page} key={data?.page?.id} onFormSubmit={onFormSubmit} />
    </SectionWrapper>
  );
}
