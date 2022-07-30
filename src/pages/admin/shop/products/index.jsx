import React, { useMemo } from 'react';

import TitlePage from '../../../../components/TitlePage';
import Add from '../../../../components/button/Add';
import SectionWrapper from '../../../../components/layout/SectionWrapper';
import ContentHeading from '../../../../components/layout/ContentHeading';

import AddCategoryShopModal from '../../../../components/modal/AddCategoryShopModal';
import { useShopProductsData } from '../../../../hooks/useShopProductsData';
import ImageCell from '../../../../components/table/shop/product/ImageCell';
import FeatureCell from '../../../../components/table/shop/product/FeatureCell';
import ActionCell from '../../../../components/table/shop/product/ActionCell';
import ReactTable from '../../../../components/react-table/ReactTable';

export default function ShopProduct() {
  const { data: products, isSuccess } = useShopProductsData();

  const product = isSuccess ? products?.data : [];

  // console.log('products', products);

  const data = useMemo(() => product, [product]);
  // console.log('prod', data)

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      // {
      //   Header: "Code",
      //   accessor: "reference",
      // },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Category',
        accessor: 'category.name',
      },
      {
        Header: 'Features',
        accessor: 'features',
        Cell: FeatureCell,
        featureAccessor: 'features',
      },
      {
        Header: 'Image',
        accessor: 'photos',
        Cell: ImageCell,
        imgAccessor: 'photos',
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
      <ContentHeading>
        <Add link="/admin/shop/products/create" title="Create Product" />
        <AddCategoryShopModal />
      </ContentHeading>
      <ReactTable columns={columns} data={data} />
    </SectionWrapper>
  );
}
