import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SectionForm from "../../../components/form/section/SectionForm";
import request from "../../../utils/axios-utils";
import TitlePage from "../../../components/TitlePage";
import ContentWrapper from "../../../components/layout/ContentWrapper";
import {
  closeLoading,
  isReactLoading,
} from "../../../features/reactLoadingSlice";
import SectionWrapper from "../../../components/layout/SectionWrapper";

export default function SectionCreate() {
  const { pageId } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const createSection = (data) => {
    return request({
      url: `/pages/${pageId}/sections`,
      method: "post",
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const { mutateAsync } = useMutation(createSection, {
    onSuccess: (e) => {
      console.log("d", e);
      if (e.request.status === 200) {
        toast.success("Page has been created", { position: "top-right" });
        navigate(`/admin/pages/${pageId}/sections`);
        dispatch(closeLoading());
      } else {
        toast.error("Page failed to create  ", { position: "top-right" });
        dispatch(closeLoading());
      }
    },
  });

  // const { mutateAsync } = useMutation(addSection);

  // console.log('ise', isError, error)

  const onSubmitSection = async (data) => {
    dispatch(isReactLoading());
    await mutateAsync(data);
  };

  return (
    <>
      <SectionWrapper>
        <ContentWrapper>
          <SectionForm onFormSubmit={onSubmitSection} />
        </ContentWrapper>
      </SectionWrapper>
    </>
  );
}

