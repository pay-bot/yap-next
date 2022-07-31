import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { closeModal } from "../../features/modal/modalSlice";
import request from "../../utils/axios-utils";
import ModalWrapper from "./ModalWrapper";
import { closeLoading, isReactLoading } from "../../features/reactLoadingSlice";

import CategoryForm from "../form/category/CategoryForm";

export default function AddShopFeatureModal() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const createFeature = (data) => {
    return request({
      url: `/shop/features`,
      method: "post",
      data,
    });
  };

  const { mutateAsync } = useMutation(createFeature, {
    onSuccess: (e) => {
      queryClient.invalidateQueries("shopFeatures");
      console.log("d", e);
      if (e.request.status === 200) {
        toast.success("Feature has been created", { position: "top-right" });
      } else {
        toast.error("Feature failed to create  ", { position: "top-right" });
      }
    },
  });

  const onSubmitArticleCat = async (data) => {
    dispatch(isReactLoading());
    await mutateAsync(data);
    dispatch(closeLoading());
    dispatch(closeModal());
  };

  const dataModal = useSelector((state) => state.modal);

  return (
    <ModalWrapper componentName="AddShopFeature" modalid={dataModal.id}>
      <CategoryForm onFormSubmit={onSubmitArticleCat} isLoading="" />
    </ModalWrapper>
  );
}

