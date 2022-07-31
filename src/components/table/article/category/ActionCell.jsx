import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { closeModal, openModal } from "../../../../features/modal/modalSlice";

import {
  deleteArticleCategories,
  updateArticleCategories,
} from "../../../../hooks/useArticleCategoriesData";
import ArticleCategoryForm from "../../../form/article/category/ArticleCategoryForm";
import Edit from "../../../button/Edit";
import Delete from "../../../button/Delete";
import {
  closeLoading,
  isReactLoading,
} from "../../../../features/reactLoadingSlice";
import ModalWrapper from "../../../modal/ModalWrapper";

export default function ActionCell({ value, data }) {
  // console.log(data);

  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal);
  // console.log("in", dataModal);

  const { id } = dataModal;

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(deleteArticleCategories, {
    onSuccess: () => {
      queryClient.invalidateQueries("articleCategories");
    },
  });
  const removeArticleCat = async (e) => {
    await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutateAsync(e);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const { mutateAsync: mutateUpdate } = useMutation(updateArticleCategories, {
    onSuccess: (e) => {
      queryClient.invalidateQueries("articleCategories");
      if (e.request.status === 200) {
        toast.success("Article Category has been created", {
          position: "top-right",
        });
      } else {
        toast.error("Article Category failed to create  ", {
          position: "top-right",
        });
      }
    },
  });

  const onFormSubmit = async (e) => {
    dispatch(isReactLoading());
    await mutateUpdate({ ...e, id });
    dispatch(closeLoading());
    dispatch(closeModal());
  };

  return (
    <div className="flex items-center gap-x-1 ">
      {data.map((cat) => {
        let html;

        if (cat.toString() === value.toString()) {
          return (
            <>
              <Edit
                tooltip={`Edit ${cat.name}`}
                onClick={() =>
                  dispatch(
                    openModal({ componentName: "EditArticleCat", id: value })
                  )
                }
              />
              <Delete
                tooltip={`Delete ${cat.name}`}
                onClick={() => removeArticleCat(value)}
              />
            </>
          );
        }
        return html;
      })}
      <ModalWrapper componentName="EditArticleCat" modalid={value}>
        {data.map((cat) => {
          let html;

          if (cat.id.toString() === dataModal.id.toString()) {
            return (
              <ArticleCategoryForm
                defaultValues={cat}
                key={cat.id}
                onFormSubmit={onFormSubmit}
                // isLoading={isMutatingUpdate}
              />
            );
          }
          return html;
        })}
      </ModalWrapper>
    </div>
  );
}

