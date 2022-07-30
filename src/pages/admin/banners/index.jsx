import React, { useMemo } from 'react';
import ImageCell from '../../../components/table/banner/ImageCell';
import ActiveCell from '../../../components/table/banner/ActiveCell';
import ActionCell from '../../../components/table/banner/ActionCell';

import TitlePage from '../../../components/TitlePage';
import Add from '../../../components/button/Add';
import SectionWrapper from '../../../components/layout/SectionWrapper';
import ContentHeading from '../../../components/layout/ContentHeading';
import { useBannersData } from '../../../hooks/useBannersData';
import ReactTable from '../../../components/react-table/ReactTable';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../features/website/modal/modalSlice';
import ModalWrapper from '../../../components/modal/ModalWrapper';
import BannerForm from '../../../components/form/banner/BannerForm';
import Assistive from '../../../components/Helper/Assistive';

export default function Banner() {
  const dispatch = useDispatch();

  const banners = useBannersData();
  const banner = banners?.data ?? [];
  const data = useMemo(() => banner, [banner]);

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
        Header: 'Actif from',
        accessor: 'active_from',
        Cell: ActiveCell,
        // imgAccessor: 'active_from',
      },
      {
        Header: 'Active To',
        accessor: 'active_to',
        Cell: ActiveCell,
      },
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

  return (
    <SectionWrapper>
      <ContentHeading>
        <Add onClick={() => dispatch(openModal({ componentName: 'AddBanner', id: '' }))} title="Create Banner" />
      </ContentHeading>
      <ReactTable columns={columns} data={data} />
      <ModalWrapper componentName="AddBanner" header="Edit Collection Menu" modalId="" maxWidth="md">
        <BannerForm />
      </ModalWrapper>
      <Assistive />
    </SectionWrapper>
  );
}
