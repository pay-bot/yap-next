import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
// import TitlePage from "components/TitlePage";
import TitlePage from "components/TitlePage";
import ArticleForm from "components/form/article/ArticleForm";
// import { useAddArticleData } from "hooks/useArticlesData";
import ContentWrapper from "components/layout/ContentWrapper";
import {
  closeLoading,
  isReactLoading,
} from "features/reactLoadingSlice";
import SectionWrapper from "components/layout/SectionWrapper";
import request from "utils/axios-utils";

export default function CreateArticle() {
  const router = useRouter();
  const dispatch = useDispatch();
  const fill = useSelector((state) => state.artCollection.isFill);

  const createArticle = (data) => {
    return request({
      url: `/news/articles`,
      method: "post",
      data,
      headers: { "Content-Type": "application/json" },
    });
  };

  const { mutateAsync } = useMutation(createArticle, {
    onSuccess: (e) => {
      console.log("d", e);
      if (e.request.status === 200) {
        toast.success("Article has been created", { position: "top-right" });
        fill.length > 0 ? navigate(-1) : navigate("/admin/news/articles");

        dispatch(closeLoading());
      } else {
        toast.error("Article failed to create  ", { position: "top-right" });
        dispatch(closeLoading());
      }
    },
  });

  // console.log('ini', request)

  const onSubmitArticle = async (data) => {
    dispatch(isReactLoading());
    await mutateAsync(data);
  };

  return (
    <SectionWrapper>
      {/* <ContentHeading
          title='Create Article'
        /> */}
      <ContentWrapper>
        <ArticleForm onFormSubmit={onSubmitArticle} />
      </ContentWrapper>
    </SectionWrapper>
  );
}

