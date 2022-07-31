import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import request from "../../../utils/axios-utils";

import TitlePage from "../../../components/TitlePage";
import PageForm from "../../../components/form/page/PageForm";
import {
  closeLoading,
  isReactLoading,
} from "../../../features/reactLoadingSlice";
import SectionWrapper from "../../../components/layout/SectionWrapper";

export default function PageCreate() {
  const router = useRouter();
  const dispatch = useDispatch();

  const createPage = (data) => {
    return request({
      url: `/pages`,
      method: "post",
      data,
      // headers: { 'Content-Type': 'multipart/form-data' }
    });
  };

  const { mutateAsync } = useMutation(createPage, {
    onSuccess: (e) => {
      console.log("d", e);
      if (e.request.status === 200) {
        toast.success("Page has been created", { position: "top-right" });
        navigate("/admin/pages");
        dispatch(closeLoading());
      } else {
        toast.error("Page failed to create  ", { position: "top-right" });
        dispatch(closeLoading());
      }
    },
  });

  const onSubmitPage = async (data) => {
    dispatch(isReactLoading());
    await mutateAsync(data);
    // dispatch(closeLoading());
    // navigate(-1);
  };
  return (
    <SectionWrapper>
      <PageForm onFormSubmit={onSubmitPage} />
    </SectionWrapper>
  );
}

