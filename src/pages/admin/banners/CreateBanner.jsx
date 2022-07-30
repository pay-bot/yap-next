import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import request from "../../../utils/axios-utils";

import TitlePage from "../../../components/TitlePage";
import {
  closeLoading,
  isReactLoading,
} from "../../../features/reactLoadingSlice";
import SectionWrapper from "../../../components/layout/SectionWrapper";
import ContentWrapper from "../../../components/layout/ContentWrapper";
import BannerForm from "../../../components/form/banner/BannerForm";

export default function CreateBanner() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createBanners = (data) => {
    return request({
      url: `/banners`,
      method: "post",
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const { mutateAsync } = useMutation(createBanners, {
    onSuccess: (e) => {
      console.log("d", e);
      if (e.request.status === 200) {
        toast.success("Banner has been created", { position: "top-right" });
        navigate("/admin/banners");
        dispatch(closeLoading());
      } else {
        toast.error("Banner failed to create  ", { position: "top-right" });
        dispatch(closeLoading());
      }
    },
  });

  const onSubmitBanner = async (data) => {
    dispatch(isReactLoading());
    await mutateAsync(data);
    // dispatch(closeLoading());
    // navigate(-1);
  };
  return (
    <SectionWrapper>
      <ContentWrapper>
        <BannerForm onFormSubmit={onSubmitBanner} />
      </ContentWrapper>
    </SectionWrapper>
  );
}

