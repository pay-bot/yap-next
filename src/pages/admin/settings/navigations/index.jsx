import React, { useMemo } from 'react';
import ActionCell from '../../../../components/table/setting/navigation/ActionCell';
import { useNavigationsData } from '../../../../hooks/useNavigationsData';
import TitlePage from '../../../../components/TitlePage';
import Add from '../../../../components/button/Add';
import SectionWrapper from '../../../../components/layout/SectionWrapper';
import ContentHeading from '../../../../components/layout/ContentHeading';
import ReactTable from '../../../../components/react-table/ReactTable';

export default function Navigations() {
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
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Slug',
        accessor: 'slug',
        // Cell: StatusPill,
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
  const { data: navs, isSuccess } = useNavigationsData(onSuccess, onError);

  const nav = isSuccess ? navs?.data : [];

  // console.log(nav)

  const data = useMemo(() => nav, [nav]);

  return (
    <SectionWrapper>
      <ContentHeading title="Navigation List">
        <Add link="/admin/settings/navigations/create" title="Create Navigations" />
      </ContentHeading>
      <ReactTable columns={columns} data={data} />
    </SectionWrapper>
  );
}
