import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import TitlePage from "../../../../components/TitlePage";
import NavForm from "../../../../components/form/NavForm";
import { useAddNavigationData } from "../../../../hooks/useNavigationsData";
import {
  closeLoading,
  isReactLoading,
} from "../../../../features/reactLoadingSlice";
import SectionWrapper from "../../../../components/layout/SectionWrapper";

export default function CreateNavigation() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { mutate: addNav } = useAddNavigationData();

  const onSubmitNav = async (state) => {
    await setTimeout(dispatch(isReactLoading()), 999);
    await addNav(state);
    navigate(-1);
    dispatch(closeLoading());
  };
  return (
    <>
      <SectionWrapper>
        <NavForm onFormSubmit={onSubmitNav} />
      </SectionWrapper>
    </>
  );
}

