import Edit from '../../button/Edit';
import Delete from '../../button/Delete';
import { useDestroyBanner } from '../../../hooks/useBannersData';
import BannerForm from '../../form/banner/BannerForm';
import ModalWrapper from '../../modal/ModalWrapper';
import { openModal } from '../../../features/website/modal/modalSlice';
import { useDispatch } from 'react-redux';

export default function ActionCell({ value, data }) {
  console.log('band', data);
  const dispatch = useDispatch();

  const removeBanner = useDestroyBanner();

  return (
    <div className="flex items-center gap-x-1">
      {data.map((ban) => {
        let html;

        if (ban.id.toString() === value.toString()) {
          return (
            <div key={ban.id}>
              {/* <Manage
                tooltip={`Manage ${ban.name}`}
                link={`/admin/banners/${value}/sections`}
              /> */}
              <Edit tooltip={`Edit ${ban.name}`} onClick={() => dispatch(openModal({ componentName: 'EditBanner', id: ban.id }))} />
              <Delete tooltip={`Delete ${ban.name}`} onClick={() => removeBanner(value)} />
              <ModalWrapper componentName="EditBanner" header="Edit Collection Menu" modalId={ban.id} maxWidth="md">
                <BannerForm key={ban?.id} defaultValues={ban} />
              </ModalWrapper>
            </div>
          );
        }
        return html;
      })}
    </div>
  );
}
