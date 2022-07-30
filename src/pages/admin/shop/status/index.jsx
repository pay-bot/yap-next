import React, { useMemo } from 'react';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../../features/modal/modalSlice';
import TitlePage from '../../../../components/TitlePage';

import Add from '../../../../components/button/Add';
import SectionWrapper from '../../../../components/layout/SectionWrapper';

import ContentHeading from '../../../../components/layout/ContentHeading';
import ActionCell from '../../../../components/table/shop/status/ActionCell';

import ReactTable from '../../../../components/react-table/ReactTable';
import { useShopStatusesData } from '../../../../hooks/useShopsData';
import AddShopStatusModal from '../../../../components/modal/AddShopStatusModal';

export default function ShopStatus() {
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
        Header: 'Badge Color',
        accessor: 'category',
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
  const { data: features, isSuccess } = useShopStatusesData(onSuccess, onError);

  const feature = isSuccess ? features?.data : [];

  console.log(features);

  const data = useMemo(() => feature, [feature]);

  const dispatch = useDispatch();

  return (
    <>
      <SectionWrapper>
        <ContentHeading>
          <Add onClick={() => dispatch(openModal({ componentName: 'AddShopStatus', id: null }))} title="Create Article Category" />
        </ContentHeading>
        <ReactTable columns={columns} data={data} />
      </SectionWrapper>
      <AddShopStatusModal />
    </>
  );
}
