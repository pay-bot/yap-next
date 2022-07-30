import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import ActionCell from '../../../../components/table/resource/category/ActionCell';
import CountCell from '../../../../components/table/resource/category/CountCell';
import ImageCell from '../../../../components/table/resource/category/ImageCell';

import TitlePage from '../../../../components/TitlePage';
import Add from '../../../../components/button/Add';
import SectionWrapper from '../../../../components/layout/SectionWrapper';

import ContentHeading from '../../../../components/layout/ContentHeading';

import { useResourcesData } from '../../../../hooks/useResourcesData';
import AddCategoryResourceModal from '../../../../components/modal/AddCategoryResourceModal';
import { openModal } from '../../../../features/modal/modalSlice';
import ReactTable from '../../../../components/react-table/ReactTable';

export default function ResourceCategory() {
  const { data: resources, isSuccess } = useResourcesData();

  const resource = isSuccess ? resources?.data : [];

  // console.log('resources', resources);

  const data = useMemo(() => resource, [resource]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Count',
        accessor: 'count',
        Cell: CountCell,
        countAccessor: 'photos',
      },
      {
        Header: 'Photos',
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

  const dispatch = useDispatch();

  return (
    <SectionWrapper>
      <ContentHeading>
        <Add onClick={() => dispatch(openModal({ componentName: 'AddResourceCategory', id: null }))} title="Create Category" />
        <AddCategoryResourceModal />
      </ContentHeading>
      <div className="mt-6 ">
        <ReactTable columns={columns} data={data} />
      </div>
    </SectionWrapper>
  );
}
