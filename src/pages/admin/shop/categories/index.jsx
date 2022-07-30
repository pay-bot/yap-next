import React, { useMemo } from 'react';

// import { ImageCell } from "../../../../components/table/shop/CategoryTable";
import { useDispatch } from 'react-redux';
import ImageCell from '../../../../components/table/shop/category/ImageCell';
import ActionCell from '../../../../components/table/shop/category/ActionCell';
import TitlePage from '../../../../components/TitlePage';
import Add from '../../../../components/button/Add';
import SectionWrapper from '../../../../components/layout/SectionWrapper';

import ContentHeading from '../../../../components/layout/ContentHeading';

import { openModal } from '../../../../features/modal/modalSlice';
import AddCategoryShopModal from '../../../../components/modal/AddCategoryShopModal';
import { useShopCategoriesData } from '../../../../hooks/useShopCategoriesData';
import ReactTable from '../../../../components/react-table/ReactTable';

export default function ShopCategory() {
  const onSuccess = (data) => {
    console.log({ data });
  };

  const onError = (error) => {
    console.log({ error });
  };

  const { data: categories, isSuccess } = useShopCategoriesData(onSuccess, onError);

  const category = isSuccess ? categories?.data : [];

  // console.log('categories', categories);

  const data = useMemo(() => category, [category]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Url',
        accessor: 'url',
      },
      // {
      //   Header: "Count",
      //   accessor: "count",
      //   // Cell: CountCell,
      //   countAccessor: 'photos',
      // },
      {
        Header: 'Image',
        accessor: 'image',
        Cell: ImageCell,
        imgAccessor: 'image',
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

  const dispatch = useDispatch();

  return (
    <SectionWrapper>
      <ContentHeading>
        <Add onClick={() => dispatch(openModal({ componentName: 'AddCategoryShop', id: null }))} title="Create Category" />
        <AddCategoryShopModal />
      </ContentHeading>
      <ReactTable columns={columns} data={data} />
    </SectionWrapper>
  );
}
