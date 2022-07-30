import React, { useMemo } from 'react';
import ActionCell from '../../../../components/table/article/comment/ActionCell';
import TitlePage from '../../../../components/TitlePage';
import SectionWrapper from '../../../../components/layout/SectionWrapper';
import ContentHeading from '../../../../components/layout/ContentHeading';
import { useCommentsData } from '../../../../hooks/useCommentsData';
import ReactTable from '../../../../components/react-table/ReactTable';

export default function Comment() {
  const onSuccess = (data) => {
    console.log({ data });
  };

  const onError = (error) => {
    console.log({ error });
  };

  const { data: banners, isSuccess } = useCommentsData(onSuccess, onError);

  const banner = isSuccess ? banners?.data : [];

  // console.log('banners', banners);

  const data = useMemo(() => banner, [banner]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Content',
        accessor: 'content',
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

  return (
    <SectionWrapper>
      <ContentHeading title="Article List" />
      <ReactTable columns={columns} data={data} />
    </SectionWrapper>
  );
}
