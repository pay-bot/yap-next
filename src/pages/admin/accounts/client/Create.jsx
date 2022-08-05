import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import request from "../../../../utils/axios-utils";
import TitlePage from "../../../../components/TitlePage";
import ContentWrapper from "../../../../components/layout/ContentWrapper";
import {
  closeLoading,
  isReactLoading,
} from "../../../../features/reactLoadingSlice";
import SectionWrapper from "../../../../components/layout/SectionWrapper";
import FormWrapper from "../../../../components/layout/FormWrapper";
import ClientForm from "../../../../components/form/accounts/clients/ClientForm";

export default function CreateClient() {
  const router = useRouter();
  const dispatch = useDispatch();

  const createContent = (data) => {
    return request({
      url: `/accounts/clients`,
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
        navigate(-1);
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
    <>
      <SectionWrapper>
        <ContentWrapper>
          <FormWrapper>
            {/* <ContentForm onFormSubmit={onSubmitContent} isLoading="" /> */}
            <ClientForm onFormSubmit={onSubmitContent} />
          </FormWrapper>
        </ContentWrapper>
      </SectionWrapper>
    </>
  );
}

