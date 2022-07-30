import React, { useMemo } from 'react';
// import { ActionCell } from "../../../../components/table/setting/clientigation/ActionCell";
import TitlePage from '../../../../components/TitlePage';
import SectionWrapper from '../../../../components/layout/SectionWrapper';
import ContentHeading from '../../../../components/layout/ContentHeading';
import ReactTable from '../../../../components/react-table/ReactTable';
import { useAdministratorsData } from '../../../../hooks/accounts/administrator/useAdministratorsData';

export default function Administrator() {
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
        accessor: 'fullname',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'cellphone',
        // Cell: StatusPill,
      },
      {
        Header: 'Url',
        accessor: 'url',
      },
    ],
    []
  );
  const { data: clients, isSuccess } = useAdministratorsData(onSuccess, onError);

  console.log('clie', clients);

  const client = isSuccess ? clients?.data : [];

  // console.log(client)

  const data = useMemo(() => client, [client]);

  return (
    <SectionWrapper>
      <ContentHeading title="Navigation List" />
      <ReactTable columns={columns} data={data} />
    </SectionWrapper>
  );
}
