import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TitlePage from '../../../components/TitlePage';

import { closeLoading, isReactLoading } from '../../../features/reactLoadingSlice';

import { useArticleDetail, useUpdateArticle } from '../../../hooks/useArticlesData';
import ArticleForm from '../../../components/form/article/ArticleForm';
import SectionWrapper from '../../../components/layout/SectionWrapper';

export default function EditArticle(props) {
  const [dataArticleDetail, setDataArticleDetail] = useState(null);
  const { articleId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { isLoading, data, isError, error, isSuccess } = useArticleDetail(articleId);

  console.log(dataArticleDetail);

  const { mutate: updateArticle } = useUpdateArticle(articleId);

  const onSubmitArticle = (values) => {
    console.log(values);
    dispatch(isReactLoading());
    const id = articleId;
    updateArticle(values);
    dispatch(closeLoading());
  };

  return (
    <SectionWrapper>
      <ArticleForm key={data?.data?.article[0].id} defaultValues={data?.data?.article[0]} onFormSubmit={onSubmitArticle} />;
    </SectionWrapper>
  );
}
