import { useMutation, useQueryClient } from "@tanstack/react-query";
import swal from "sweetalert";
import { deleteArticle } from "../../../../hooks/useArticlesData";
import Edit from "../../../button/Edit";
import Delete from "../../../button/Delete";
import AddMedia from "../../../button/AddMedia";
import React from "react";

export default function ActionCell({ value, data }) {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(deleteArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries("articles");
      queryClient.invalidateQueries("sectionsContent");
      queryClient.invalidateQueries("sections");
    },
  });
  const removeArticle = async (id) => {
    await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutateAsync(id);
        queryClient.invalidateQueries("articles");
        queryClient.invalidateQueries("sectionsContent");
        queryClient.invalidateQueries("sections");
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  return (
    <div className="flex items-center gap-x-1">
      {data.map((art) => {
        let html;
        if (art.id.toString() === value.toString()) {
          return (
            <>
              <AddMedia
                link={`/admin/news/articles/${value}/media`}
                tooltip={`Add Media ${art.name}`}
              />
              <Edit
                link={`/admin/news/articles/${value}/edit`}
                tooltip={`Edit ${art.name}`}
              />
              <Delete
                onClick={() => removeArticle(value)}
                tooltip={`Delete ${art.name}`}
              />
            </>
          );
        }
        return html;
      })}
    </div>
  );
}
