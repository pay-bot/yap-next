import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import request from '../../../../utils/axios-utils';
import TitlePage from '../../../../components/TitlePage';
import ContentWrapper from '../../../../components/layout/ContentWrapper';
import { closeLoading, isReactLoading } from '../../../../features/reactLoadingSlice';
import SectionWrapper from '../../../../components/layout/SectionWrapper';
import FormWrapper from '../../../../components/layout/FormWrapper';
import ClientForm from '../../../../components/form/accounts/clients/ClientForm';
import { useClientsData } from '../../../../hooks/accounts/clients/useClientsData';

export default function EditClient() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: clients } = useClientsData();

  console.log('c', clients);

  const updateClient = (data) => {
    return request({
      url: `/accounts/clients/${clientId}`,
      method: 'post',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const { mutateAsync } = useMutation(updateClient, {
    onSuccess: (e) => {
      console.log('d', e);
      if (e.request.status === 200) {
        toast.success('Content has been created', { position: 'top-right' });
        navigate('/admin/pages');
        dispatch(closeLoading());
        navigate(-1);
      } else {
        toast.error('Content failed to create  ', { position: 'top-right' });
        dispatch(closeLoading());
      }
    },
  });

  const onSubmitClient = async (data) => {
    dispatch(isReactLoading());
    await mutateAsync(data);
  };

  return (
    <>
      <SectionWrapper>
        <ContentWrapper>
          <FormWrapper>
            {clients?.data?.map((data) => {
              if (data.id.toString() === clientId.toString()) {
                return <ClientForm key={data.id} defaultValues={data} onFormSubmit={onSubmitClient} />;
              }
              return null;
            })}
          </FormWrapper>
        </ContentWrapper>
      </SectionWrapper>
    </>
  );
}
