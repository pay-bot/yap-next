import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TitlePage from '../../../../components/TitlePage';

import NavForm from '../../../../components/form/NavForm';
import { fetchNavigationData } from '../../../../hooks/useNavigationData';
import { closeLoading, isReactLoading } from '../../../../features/reactLoadingSlice';
import SectionWrapper from '../../../../components/layout/SectionWrapper';
import ContentWrapper from '../../../../components/layout/ContentWrapper';
import request from '../../../../utils/axios-utils';

export default function EditNavigation() {
  const { navId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(navId);
  const { data } = useQuery(['navigations', { navId }], fetchNavigationData);
  console.log('nav', data);

  const updateNav = (dataNavigation) => {
    return request({
      // headers: { 'Content-Type': 'application/json' },
      url: `/settings/navigations/${navId}`,
      method: 'post',
      data: dataNavigation,
    });
  };

  const { mutateAsync } = useMutation(updateNav);

  const onFormSubmit = async (dataNavigation) => {
    dispatch(isReactLoading());
    await mutateAsync(dataNavigation);
    navigate(-1);
    dispatch(closeLoading());
  };

  return (
    <div>

      <SectionWrapper>
        <ContentWrapper>
          {data?.navigation?.map((dataNavigation) => {
            if (dataNavigation.id.toString() === navId.toString()) {
              return <NavForm defaultValues={dataNavigation} key={dataNavigation.id} onFormSubmit={onFormSubmit} />;
            }
            return null;
          })}
        </ContentWrapper>
      </SectionWrapper>
    </div>
  );
}
