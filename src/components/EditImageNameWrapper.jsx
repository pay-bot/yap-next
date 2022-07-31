import { useDispatch, useSelector } from "react-redux";
// import ArticleTagForm from "../form/article/ArticleTagForm";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { closeModal } from "../../../features/modal/modalSlice";
import request from "../../../utils/axios-utils";
import EditNameImageForm from "../../../components/form/article/EditNameImageForm";

export default function EditImageNameWrapper({ imageName, EditImageName }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const closeModalHandler = () => dispatch(closeModal());
  const dataModal = useSelector((state) => state.modal);

  const editName = (data) => {
    return request({
      url: `/resources/photos/${dataModal.id}/edit/name`,
      method: "post",
      data,
    });
  };

  const { mutateAsync } = useMutation(editName, {
    onSuccess: (e) => {
      queryClient.invalidateQueries("medias");

      if (e.request.status === 200) {
        toast.success("Image name has been updated", { position: "top-right" });
        closeModalHandler();
      } else {
        toast.error("Image name failed to update  ", { position: "top-right" });
        closeModalHandler();
      }
    },
  });

  const onSubmitArticleTag = async (data) => {
    await mutateAsync(data);
  };

  const name = [];

  // console.log('img', imageName)

  return (
    <ModalWrapper componentName="EditNameImgArticle" modalid={dataModal.id}>
      {imageName.map((data) => {
        if (data.id == dataModal.id) {
          return (
            <EditNameImageForm
              onFormSubmit={onSubmitArticleTag}
              key={data.id}
              defaultValues={data}
              isLoading=""
            />
          );
        }
      })}
    </ModalWrapper>
  );
}

