import React, { useMemo } from 'react';
import ActionCell from '../../../components/table/page/ActionCell';
import TitlePage from '../../../components/TitlePage';
import { usePagesData } from '../../../hooks/usePagesData';
import Add from '../../../components/button/Add';
import SectionWrapper from '../../../components/layout/SectionWrapper';
import ContentHeading from '../../../components/layout/ContentHeading';
import ReactTable from '../../../components/react-table/ReactTable';

export default function Pages() {
  // const onSuccess = (data) => {
  //   console.log({ data });
  // };

  // const onError = (error) => {
  //   console.log({ error });
  // };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Url',
        accessor: 'url',
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
  const { data: pages, isSuccess } = usePagesData();

  const page = isSuccess ? pages?.data : [];

  // console.log('page',pages);

  const data = useMemo(() => page, [page]);

  return (
    <SectionWrapper>
      <ContentHeading>
        <Add link="/admin/pages/create" title="Create Page" />
      </ContentHeading>
      <ReactTable columns={columns} data={data} />
    </SectionWrapper>
  );
}
