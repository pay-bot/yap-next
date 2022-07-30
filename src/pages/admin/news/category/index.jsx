import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../features/modal/modalSlice';
import TitlePage from '../../../../components/TitlePage';
import AddArticleCatModal from '../../../../components/modal/AddArticleCatModal';
import { useArticleCategoriesData } from '../../../../hooks/useArticleCategoriesData';
import Add from '../../../../components/button/Add';
import SectionWrapper from '../../../../components/layout/SectionWrapper';
import ContentHeading from '../../../../components/layout/ContentHeading';
import ReactTable from '../../../../components/react-table/ReactTable';
import ActionCell from '../../../../components/table/article/category/ActionCell';

export default function ArticleCategory() {
  const onSuccess = (data) => {
    console.log({ data });
  };

  const onError = (error) => {
    console.log({ error });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },

      {
        Header: 'Slug',
        accessor: 'slug',
        // Cell: StatusPill,
      },

      {
        Header: 'action',
        accessor: 'id',
        modalAccessor: 'name',
        Cell: ActionCell, // new
      },
    ],
    []
  );
  const { data: pages, isSuccess } = useArticleCategoriesData(onSuccess, onError);

  const page = isSuccess ? pages?.data : [];

  console.log(pages);

  const data = useMemo(() => page, [page]);

  const dispatch = useDispatch();

  return (
    <SectionWrapper>
      <ContentHeading>
        <Add onClick={() => dispatch(openModal({ componentName: 'AddArticleCatModal', id: null }))} title="Create Collection" />
        <AddArticleCatModal />
      </ContentHeading>

      <div className="mt-6 ">
        <ReactTable columns={columns} data={data} />
      </div>
    </SectionWrapper>
  );
}
