import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { ReactSortable } from 'react-sortablejs';
import { deleteMedias, useMediasData } from '../../../hooks/useMediaData';
import SectionWrapper from '../../../components/layout/SectionWrapper';
import CardImage from './CardImage';
import SnackBarWrapper from '../../../components/materialUI/SnackBarWrapper';
import request from '../../../utils/axios-utils';

// import './Dropzone.css';

function AddMedia() {
  const [onMove, setOnMove] = useState(false);

  const handleMoveStart = () => {
    setOnMove(true);
  };
  const handleMoveEnd = () => {
    setOnMove(false);
  };

  const fileInputRef = useRef();
  const modalImageRef = useRef();
  const modalRef = useRef();
  const progressRef = useRef();
  const uploadRef = useRef();
  const uploadModalRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    const filteredArr = selectedFiles.reduce((acc, current) => {
      const x = acc.find((item) => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      }
      return acc;
    }, []);
    setValidFiles([...filteredArr]);
  }, [selectedFiles]);

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/svg+xml', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }

    return true;
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        files[i].invalid = true;
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        setErrorMessage('File type not permitted');
        setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
      }
    }
  };

  const preventDefault = (e) => {
    e.preventDefault();
    // e.stopPropagation();
  };

  const dragOver = (e) => {
    preventDefault(e);
  };

  const dragEnter = (e) => {
    preventDefault(e);
  };

  const dragLeave = (e) => {
    preventDefault(e);
  };

  const fileDrop = (e) => {
    preventDefault(e);
    const { files } = e.dataTransfer;
    if (files.length) {
      handleFiles(files);
    }
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const fileSize = (size) => {
    if (size === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return `${parseFloat((size / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  const fileType = (fileName) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
  };

  const removeFile = (name) => {
    const index = validFiles.findIndex((e) => e.name === name);
    const index2 = selectedFiles.findIndex((e) => e.name === name);
    const index3 = unsupportedFiles.findIndex((e) => e.name === name);
    validFiles.splice(index, 1);
    selectedFiles.splice(index2, 1);
    setValidFiles([...validFiles]);
    setSelectedFiles([...selectedFiles]);
    if (index3 !== -1) {
      unsupportedFiles.splice(index3, 1);
      setUnsupportedFiles([...unsupportedFiles]);
    }
  };

  const openImageModal = (file) => {
    const reader = new FileReader();
    modalRef.current.style.display = 'block';
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
    };
  };

  const closeModal = () => {
    modalRef.current.style.display = 'none';
    modalImageRef.current.style.backgroundImage = 'none';
  };

  const { contentId } = useParams();
  const queryClient = useQueryClient();
  const closeUploadModal = () => {
    uploadModalRef.current.style.display = 'none';
  };

  const uploadFiles = async () => {
    uploadModalRef.current.style.display = 'block';
    uploadRef.current.innerHTML = 'File(s) Uploading...';
    for (let i = 0; i < validFiles.length; i++) {
      const formData = new FormData();
      formData.append('file', validFiles[i]);
      // formData.append("key", "");
      formData.append('photoable_id', contentId);
      formData.append('photoable_type_name', 'Content');
      formData.append('photoable_type', `App\\Models\\Content`);

      axios
        .post(`${process.env.REACT_APP_API_URL}/resources/photos/upload`, formData, {
          onUploadProgress: (progressEvent) => {
            const uploadPercentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
            progressRef.current.innerHTML = `${uploadPercentage}%`;
            progressRef.current.style.width = `${uploadPercentage}%`;

            if (uploadPercentage === 100) {
              queryClient.invalidateQueries('medias');
              toast.success('Media has been uploaded', { position: 'top-right' });
              validFiles.length = 0;
              setValidFiles([...validFiles]);
              setSelectedFiles([...validFiles]);
              setUnsupportedFiles([...validFiles]);
              closeUploadModal();
            }
          },
        })
        .catch(() => {
          uploadRef.current.innerHTML = `<span className="error">Error Uploading File(s)</span>`;
          progressRef.current.style.backgroundColor = 'red';
          closeUploadModal();
          toast.error('Media fail to upload', { position: 'top-right' });
        });
    }
  };

  const { data: media, isSuccess } = useMediasData();

  console.log(media);

  const { mutateAsync } = useMutation(deleteMedias, {
    onSuccess: () => {
      queryClient.invalidateQueries('medias');
    },
  });

  // const { data: article } = useQuery(
  //   ["article", { articleId }],
  //   fetchArticleData
  // );

  // console.log("art", article);

  const cardImageData = [];

  media?.data?.data?.map((data) => {
    if ((data.photoable_id == contentId) & (data.photoable_type === 'App\\Models\\Content')) {
      cardImageData.push(data);
    }
  });

  // console.log('card', cardImageData)

  const sortedCard = isSuccess ? _.sortBy(cardImageData, 'list_order') : [];

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

  async function saveBoard() {
    const formData = new FormData();
    formData.append('list', JSON.stringify(dndCard));
    await saveSortSection(formData);
    handleMoveEnd();
  }

  return (
    <SectionWrapper>
      <div className=" w-full bg-white px-4 py-8">
        {unsupportedFiles.length === 0 && validFiles.length ? (
          <button className="file-upload-btn" onClick={() => uploadFiles()}>
            Upload Files
          </button>
        ) : (
          ''
        )}
        {unsupportedFiles.length ? <p>Please remove all unsupported files.</p> : ''}
        <div className="drop-container" onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDrop={fileDrop} onClick={fileInputClicked}>
          <div className="flex items-center justify-center">
            <div className="">
              <div className="flex justify-center">
                <img src="/dnd.svg" alt="" className="w-20" />
              </div>
              <div className="text-[#4AA1F3]">Drag & Drop files here or click to select file(s)</div>
            </div>
          </div>
          <input ref={fileInputRef} className="file-input" type="file" multiple onChange={filesSelected} />
        </div>
        <div className=" my-10">
          {validFiles.map((data, i) => (
            <div className="my-2 flex w-5/12 items-center border-2 border-[#4AA1F3]" key={i}>
              <div className="flex ">
                <div className="mr-2 h-fit w-14 w-fit bg-[#4AA1F3] p-0.5 text-center font-bold uppercase text-white">{fileType(data.name)}</div>
                <span className={` text-[#4AA1F3] ${data.invalid ? 'text-red-600' : ''}`}>{data.name.length > 16 ? `${data.name.slice(0, 16)}...` : data.name}</span>
                <span className="ml-1">({fileSize(data.size)})</span> {data.invalid && <span className="file-error-message">({errorMessage})</span>}
              </div>
              <div className="ml-auto flex items-center ">
                <div onClick={!data.invalid ? () => openImageModal(data) : () => removeFile(data.name)} className="mr-1">
                  <img src="/look.svg" alt="" className="w-5" />
                </div>
                <div className=" bg-[#f83245] py-0.5 px-2 font-bold text-white" onClick={() => removeFile(data.name)}>
                  X
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="modal" ref={modalRef}>
        <div className="overlay" />
        <span className="close" onClick={() => closeModal()}>
          X
        </span>
        <div className="modal-image" ref={modalImageRef} />
      </div>

      <div className="upload-modal" ref={uploadModalRef}>
        <div className="overlay" />

        <div className="progress-container">
          <span ref={uploadRef} />
          <div className="progress">
            <div className="progress-bar" ref={progressRef} />
          </div>
        </div>
      </div>
      <SnackBarWrapper open={onMove} onClose={handleMoveEnd} severity="warning" message="Drag Mode On" />
      <div className="flex space-x-4 bg-white px-4 pb-8">
        <ReactSortable swap list={sorCard} setList={setSorCard} onStart={handleMoveStart} onEnd={saveBoard} className="flex gap-4 flex-wrap">
          {sorCard.map((data) => (
            <CardImage data={data} editNameData={sorCard} />
          ))}
        </ReactSortable>
      </div>
    </SectionWrapper>
  );
}

export default AddMedia;
