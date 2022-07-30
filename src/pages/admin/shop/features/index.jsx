import React, { useMemo } from 'react';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../../features/modal/modalSlice';
import TitlePage from '../../../../components/TitlePage';

import Add from '../../../../components/button/Add';
import SectionWrapper from '../../../../components/layout/SectionWrapper';

import ContentHeading from '../../../../components/layout/ContentHeading';
import AddShopFeatureModal from '../../../../components/modal/AddShopFeatureModal';
import { useShopFeaturesData } from '../../../../hooks/useShopFeaturesData';
import ActionCell from '../../../../components/table/shop/feature/ActionCell';

import ReactTable from '../../../../components/react-table/ReactTable';

export default function ShopFeature() {
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
  const { data: features, isSuccess } = useShopFeaturesData(onSuccess, onError);

  const feature = isSuccess ? features?.data : [];

  // console.log(features);

  const data = useMemo(() => feature, [feature]);

  const dispatch = useDispatch();

  return (
    <>
      <SectionWrapper>
        <ContentHeading>
          <Add onClick={() => dispatch(openModal({ componentName: 'AddShopFeature', id: null }))} title="Create Feature" />
        </ContentHeading>
        <ReactTable columns={columns} data={data} />
      </SectionWrapper>
      <AddShopFeatureModal />
    </>
  );
}
