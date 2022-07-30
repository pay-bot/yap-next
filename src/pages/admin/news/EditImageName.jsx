import { useSelector } from 'react-redux';
// import ArticleTagForm from "../form/article/ArticleTagForm";
import EditNameImageForm from '../../../components/form/article/EditNameImageForm';
import ModalWrapper from '../../../components/modal/ModalWrapper';

export default function EditImageName({ imageName }) {
  const dataModal = useSelector((state) => state.modal);

  return (
    <ModalWrapper componentName="EditNameImgArticle" modalid={dataModal.id}>
      {imageName.map((data) => {
        if (data.id.toString() === dataModal.id.toString()) {
          return <EditNameImageForm httpPost={`/resources/photos/${dataModal.id}/edit/name`} key={data.id} defaultValues={data} isLoading="" />;
        }
        return null;
      })}
    </ModalWrapper>
  );
}
