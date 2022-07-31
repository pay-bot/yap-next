import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { closeModal } from "../../features/modal/modalSlice";
import ArticleTagForm from "../form/article/ArticleTagForm";
import request from "../../utils/axios-utils";
import ModalWrapper from "./ModalWrapper";
import { closeLoading, isReactLoading } from "../../features/reactLoadingSlice";

export default function AddArticleTagModal() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const createTag = (data) => {
    return request({
      url: `/news/tags`,
      method: "post",
      data,
    });
  };

  const { mutateAsync } = useMutation(createTag, {
    onSuccess: (e) => {
      queryClient.invalidateQueries("articleTags");

      if (e.request.status === 200) {
        toast.success("Article tag has been created", {
          position: "top-right",
        });
      } else {
        toast.error("Article tag failed to create  ", {
          position: "top-right",
        });
      }
    },
  });

  const onSubmitArticleTag = async (data) => {
    dispatch(isReactLoading());
    await mutateAsync(data);
    dispatch(closeLoading());
    dispatch(closeModal());
  };

  const dataModal = useSelector((state) => state.modal);

  return (
    <ModalWrapper componentName="AddArticleTagModal" modalid={dataModal.id}>
      <ArticleTagForm onFormSubmit={onSubmitArticleTag} isLoading="" />
    </ModalWrapper>
  );
}

