import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import ActionCell from '../../../../components/table/article/tag/ActionCell';
import { openModal } from '../../../../features/modal/modalSlice';
import TitlePage from '../../../../components/TitlePage';
import AddArticleTagModal from '../../../../components/modal/AddArticleTagModal';
import { useArticleTagsData } from '../../../../hooks/useArticleTagsData';
import Add from '../../../../components/button/Add';
import SectionWrapper from '../../../../components/layout/SectionWrapper';
import ContentHeading from '../../../../components/layout/ContentHeading';
import ReactTable from '../../../../components/react-table/ReactTable';

export default function Tag() {
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
  const { data: pages, isSuccess } = useArticleTagsData(onSuccess, onError);

  const page = isSuccess ? pages?.data : [];

  console.log('ini', pages);

  const data = useMemo(() => page, [page]);

  const dispatch = useDispatch();

  return (
    <>
      <SectionWrapper>
        <ContentHeading>
          <Add onClick={() => dispatch(openModal({ componentName: 'AddArticleTagModal', id: null }))} title="Create Tag" />
        </ContentHeading>

        <AddArticleTagModal />
        <div className="mt-6 ">
          <ReactTable columns={columns} data={data} />
        </div>
      </SectionWrapper>
    </>
  );
}
