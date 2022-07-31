import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import AddMediaWrapper from "../../../../components/AddMediaWrapper";
import { useMediasData } from "../../../../hooks/useMediaData";
import ReactShortableWrapper from "../../../../components/ReactShortableWrapper";
import request from "../../../../utils/axios-utils";
import { onMoveEnd } from "../../../../features/shortableSlice";
import CardImageWrapper from "../../../../components/CardImageWrapper";
import SectionWrapper from "../../../../components/layout/SectionWrapper";
import TitlePage from "../../../../components/TitlePage";
import ContentHeading from "../../../../components/layout/ContentHeading";

import AttachMediaForm from "../../../../components/form/AttachMediaForm";
import ModalWrapper from "../../../../components/modal/ModalWrapper";
import { openModal } from "../../../../features/modal/modalSlice";

export default function Media() {
  const { resCategoryId } = useParams();
  const dispatch = useDispatch();

  const { data: media, isSuccess } = useMediasData();

  const dataMedias = isSuccess ? media?.data?.data : [];

  const cardImageData = [];

  media?.data?.data?.map((data) => {
    if (
      data.photoable_id.toString() === resCategoryId.toString() &&
      data.photoable_type === "App\\Models\\ResourceCategory"
    ) {
      return cardImageData.push(data);
    }
    return null;
  });

  // console.log('card', cardImageData)

  const sortedCard = isSuccess ? _.sortBy(cardImageData, "list_order") : [];

  const [sorCard, setSorCard] = useState([]);

  useEffect(() => {
    setSorCard(sortedCard);
  }, [media]);

  const dndCard = sorCard?.map((item) => {
    return { id: item.id };
  });

  const orderMedia = (data) => {
    return request({
      url: `/resources/photos/order`,
      method: "post",
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const { mutateAsync: saveSortSection } = useMutation(orderMedia, {
    onSuccess: (e) => {
      console.log("d", e);
      if (e.request.status === 200) {
        toast.success("Content has been sorted", { position: "top-right" });
        // dispatch(closeLoading());
      } else {
        toast.error("Content failed to sorted", { position: "top-right" });
        // dispatch(closeLoading());
      }
    },
  });

  async function saveBoard() {
    const formData = new FormData();
    formData.append("list", JSON.stringify(dndCard));
    await saveSortSection(formData);
    dispatch(onMoveEnd());
  }

  return (
    <SectionWrapper>
      <ContentHeading title="Media List">
        <button
          type="button"
          onClick={() =>
            dispatch(
              openModal({
                componentName: "AttachMediaResourceCategory",
                id: "",
              })
            )
          }
        >
          Attach Media
        </button>

        <ModalWrapper componentName="AttachMediaResourceCategory" modalid="">
          <AttachMediaForm
            dataMedia={dataMedias}
            photoable_id={resCategoryId}
            photoable_type="App\Models\ResourceCategory"
            httpPost="/resources/photos/attach"
          />
        </ModalWrapper>
      </ContentHeading>

      <AddMediaWrapper
        httpPost="resources/photos/upload"
        photoable_id={resCategoryId}
        photoable_type_name="ResourceCategory"
        photoable_type="App\Models\ResourceCategory"
      />

      <ReactShortableWrapper
        onEnd={saveBoard}
        list={sorCard}
        setList={setSorCard}
        className="flex gap-4 flex-wrap bg-white  "
      >
        {sorCard.map((data) => (
          <CardImageWrapper key={data.id} data={data} editNameData={sorCard} />
        ))}
      </ReactShortableWrapper>
    </SectionWrapper>
  );
}

