import React, { useMemo } from 'react';
import ActionCell from '../../../../components/table/accounts/clients/ActionCell';
import TitlePage from '../../../../components/TitlePage';
import Add from '../../../../components/button/Add';
import SectionWrapper from '../../../../components/layout/SectionWrapper';
import ContentHeading from '../../../../components/layout/ContentHeading';
import ReactTable from '../../../../components/react-table/ReactTable';
import { useClientsData } from '../../../../hooks/accounts/clients/useClientsData';

export default function Client() {
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
        Header: 'action',
        accessor: 'id',
        modalAccessor: 'name',
        Cell: ActionCell,
      },
      // {
      //   Header: "Role",
      //   accessor: 'roles',
      //   Filter: SelectColumnFilter,  // new
      //   filter: 'includes',
      // },
    ],
    []
  );
  const { data: clients, isSuccess } = useClientsData(onSuccess, onError);

  console.log('clie', clients);

  const client = isSuccess ? clients?.data : [];

  const data = useMemo(() => client, [client]);

  const rl = data?.roles?.map((role) => {
    return role;
  });
  console.log('rl', rl);

  return (
    <SectionWrapper>
      <ContentHeading title="Navigation List">
        <Add link="/admin/accounts/clients/create" title="Create Navigations" />
      </ContentHeading>
      <ReactTable columns={columns} data={data} />
    </SectionWrapper>
  );
}
