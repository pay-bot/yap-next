import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import Modal from 'react-modal';
import AddMenuFooterModal from '../../../../components/modal/AddMenuFooterModal';
import Footers from './Footers';
import { openModal } from '../../../../features/website/modal/modalSlice';
import MenuForm from '../../../../components/form/menu/Form';
import request from '../../../../utils/axios-utils';
import TitlePage from '../../../../components/TitlePage';
import ContentHeading from '../../../../components/layout/ContentHeading';
import SectionWrapper from '../../../../components/layout/SectionWrapper';
import Add from '../../../../components/button/Add';

export default function Footer({ data }) {
  const dispatch = useDispatch();

  const createFooter = (data) => {
    return request({
      url: `/menus/footer`,
      method: 'post',
      data,
    });
  };

  const { mutateAsync } = useMutation(createFooter, {
    onSuccess: (e) => {
      queryClient.invalidateQueries('menuFooter');
      console.log('d', e);
      if (e.request.status === 200) {
        toast.success('Article category has been created', { position: 'top-right' });
        setTimeout(closeModalHandler, 1000);
      } else {
        toast.error('Article category failed to create  ', { position: 'top-right' });
        setTimeout(closeModalHandler, 1000);
      }
    },
  });

  const onSubmitFooter = async (data) => {
    await mutateAsync(data);
  };

  const dataModal = useSelector((state) => state.modal);

  return (
    <>
      <SectionWrapper>
        <ContentHeading>
          <Add onClick={() => dispatch(openModal({ componentName: 'AddMenuFooterModal', id: null }))} />
        </ContentHeading>
        {/* <Edit
        onClick={() =>
          dispatch(openModal({ componentName: "AddMenuFooterModal", id: null }))
        }
        /> */}
        <Footers />
      </SectionWrapper>
      <AddMenuFooterModal />
      {dataModal.isOpen === true && dataModal.componentName === 'AddChildFooter' && (
        <Modal
          isOpen={dataModal.isOpen}
          // onRequestClose={closeModalHandler}
          contentLabel="My dialog"
          className="fixed  flex  h-screen w-screen items-center justify-center "
          overlayClassName="myoverlay "
          closeTimeoutMS={500}
        >
          <MenuForm
            // defaultValues={data}
            // key={data.id}
            onFormSubmit={onSubmitFooter}
          />
        </Modal>
      )}
    </>
  );
}
