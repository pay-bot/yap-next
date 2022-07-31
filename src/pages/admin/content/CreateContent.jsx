import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import request from "../../../utils/axios-utils";
import ContentForm from "../../../components/form/content/ContentForm";
import TitlePage from "../../../components/TitlePage";
import {
  closeLoading,
  isReactLoading,
} from "../../../features/reactLoadingSlice";
import SectionWrapper from "../../../components/layout/SectionWrapper";
import FormWrapper from "../../../components/layout/FormWrapper";

export default function CreateContent() {
  const { pageId, sectionId, contentId } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const createContent = (data) => {
    return request({
      url: `/pages/${pageId}/sections/${sectionId}/content`,
      method: "post",
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const { mutateAsync } = useMutation(createContent, {
    onSuccess: (e) => {
      console.log("d", e);
      if (e.request.status === 200) {
        toast.success("Content has been created", { position: "top-right" });
        navigate("/admin/pages");
        dispatch(closeLoading());
        navigate(`/admin/pages/${pageId}/sections/${sectionId}/content`);
      } else {
        toast.error("Content failed to create  ", { position: "top-right" });
        dispatch(closeLoading());
      }
    },
  });

  const onSubmitContent = async (data) => {
    dispatch(isReactLoading());
    await mutateAsync(data);
  };

  return (
    <SectionWrapper>
      <FormWrapper>
        <ContentForm onFormSubmit={onSubmitContent} isLoading="" />
      </FormWrapper>
    </SectionWrapper>
  );
}

