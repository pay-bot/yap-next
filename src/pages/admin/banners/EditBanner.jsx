import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import TitlePage from "../../../components/TitlePage";

import { closeLoading } from "../../../features/reactLoadingSlice";

import ContentWrapper from "../../../components/layout/ContentWrapper";
import BannerForm from "../../../components/form/banner/BannerForm";
import SectionWrapper from "../../../components/layout/SectionWrapper";
import {
  useBannerDetail,
  useUpdateBanner,
} from "../../../hooks/useBannersData";
import ScrollDialog from "../../../components/modal/ScrollDialog";

export default function EditBanner() {
  const { bannerId } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const bannerDetail = useBannerDetail(bannerId);
  // console.log('ban', bannerDetail);

  const { mutate: updateBanner } = useUpdateBanner(
    bannerId,
    bannerDetail?.data
  );

  const { mutateAsync } = useMutation(updateBanner, {
    onSuccess: (e) => {
      queryClient.invalidateQueries("banner-detail");
      if (e.request.status === 200) {
        toast.success("Banner has been updated", { position: "top-right" });
        navigate(-1);
        dispatch(closeLoading());
      } else {
        toast.error("Banner failed to update  ", { position: "top-right" });
        dispatch(closeLoading());
      }
    },
  });

  const onSubmitBanner = async (bannerData) => {
    await updateBanner(bannerData);
  };

  console.log("dataa", bannerDetail);
  return (
    <SectionWrapper>
      <ContentWrapper>
        {/* <BannerForm key={bannerDetail?.data[0]?.id} defaultValues={bannerDetail?.data[0]} onFormSubmit={onSubmitBanner} />; */}
        <ScrollDialog />
      </ContentWrapper>
    </SectionWrapper>
  );
}

