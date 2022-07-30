import React, { useMemo } from 'react';

import TitlePage from '../../../../components/TitlePage';
// import { useArticlesData } from "../../hooks/useArticlesData";
import SectionWrapper from '../../../../components/layout/SectionWrapper';
import ContentHeading from '../../../../components/layout/ContentHeading';
import { useRolesData } from '../../../../hooks/useRolesData';

import ReactTable from '../../../../components/react-table/ReactTable';
import ActionCell from '../../../../components/table/setting/role/ActionCell';

export default function Role() {
  const onSuccess = (data) => {
    console.log({ data });
  };

  const onError = (error) => {
    console.log({ error });
  };

  const { data: banners, isSuccess } = useRolesData(onSuccess, onError);

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
