import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import AddMediaWrapper from '../../../components/AddMediaWrapper';
import { useMediasData } from '../../../hooks/useMediaData';
import ReactShortableWrapper from '../../../components/ReactShortableWrapper';
import request from '../../../utils/axios-utils';
import { onMoveEnd } from '../../../features/shortableSlice';
import CardImageWrapper from '../../../components/CardImageWrapper';

import ContentHeading from '../../../components/layout/ContentHeading';
import AttachMediaForm from '../../../components/form/AttachMediaForm';
// import AttachMedia from 'AttachMedia';
import ModalWrapper from '../../../components/modal/ModalWrapper';
import { openModal } from '../../../features/modal/modalSlice';

export default function Media() {
  const { contentId } = useParams();

  const { data: media, isSuccess } = useMediasData();

  const dataMedias = isSuccess ? media?.data?.data : [];

  const cardImageData = [];

  media?.data?.data?.map((data) => {
    if (data.photoable_id.toString() === contentId.toString() && data.photoable_type === 'App\\Models\\Content') {
      return cardImageData.push(data);
    }
    return null;
  });

  // console.log('card', cardImageData)

  const sortedCard = isSuccess ? _.sortBy(cardImageData, 'list_order') : [];

  const [sorCard, setSorCard] = useState([]);

  useEffect(() => {
    setSorCard(sortedCard);
  }, [sortedCard]);

  const dndCard = sorCard?.map((item) => {
    return { id: item.id };
  });

  const orderMedia = (data) => {
    return request({
      url: `/resources/photos/order`,
      method: 'post',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const { mutateAsync: saveSortSection } = useMutation(orderMedia, {
    onSuccess: (e) => {
      console.log('d', e);
      if (e.request.status === 200) {
        toast.success('Content has been sorted', { position: 'top-right' });
        // dispatch(closeLoading());
      } else {
        toast.error('Content failed to sorted', { position: 'top-right' });
        // dispatch(closeLoading());
      }
    },
  });

  const dispatch = useDispatch();

  const saveBoard = useCallback(() => {
    const formData = new FormData();
    formData.append('list', JSON.stringify(dndCard));
    saveSortSection(formData);
    dispatch(onMoveEnd());
  }, [saveSortSection, dispatch, dndCard]);

  return (
    <>
      <ContentHeading title="Media List">
        <button type="button" onClick={() => dispatch(openModal({ componentName: 'AttachMediaContent', id: '' }))}>
          Attach Media
        </button>
        <ModalWrapper componentName="AttachMediaContent" modalid="">
          <AttachMediaForm dataMedia={dataMedias} photoable_id={contentId} photoable_type="App\Models\Content" httpPost="/resources/photos/attach" />
          {/* <AttachMedia dataMedia={dataMedias} onFormSubmit={onSubmitMedia} /> */}
        </ModalWrapper>
      </ContentHeading>
      <AddMediaWrapper httpPost="resources/photos/upload" photoable_id={contentId} photoable_type_name="Content" photoable_type="App\Models\Content" />

      <ReactShortableWrapper onEnd={saveBoard} list={sorCard} setList={setSorCard} className="flex gap-4 flex-wrap bg-white  ">
        {sorCard.map((data) => (
          <CardImageWrapper
            key={data.id}
            data={data}
            // httpDelete={removeArticleMedia}
            editNameData={sorCard}
          />
        ))}
      </ReactShortableWrapper>
    </>
  );
}
