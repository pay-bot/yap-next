import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { toast } from "react-toastify";
import request from "../utils/axios-utils";

function AddMediaWrapper({
  httpPost,
  photoable_id,
  photoable_type_name,
  photoable_type,
}) {
  const fileInputRef = useRef();
  const modalImageRef = useRef();
  const modalRef = useRef();
  const progressRef = useRef();
  const uploadRef = useRef();
  const uploadModalRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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

  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/svg+xml",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/x-icon",
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }

    return true;
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i += 1) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        const flie = files;
        flie[i].invalid = true;
        setSelectedFiles((prevArray) => [...prevArray, flie[i]]);
        setErrorMessage("File type not permitted");
        setUnsupportedFiles((prevArray) => [...prevArray, flie[i]]);
      }
    }
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
      return "0 Bytes";
    }
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return `${parseFloat((size / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
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
    modalRef.current.style.display = "block";
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
    };
  };

  const closeModal = () => {
    modalRef.current.style.display = "none";
    modalImageRef.current.style.backgroundImage = "none";
  };

  const queryClient = useQueryClient();
  const closeUploadModal = () => {
    uploadModalRef.current.style.display = "none";
  };

  const uploadFiles = async () => {
    uploadModalRef.current.style.display = "block";
    uploadRef.current.innerHTML = "File(s) Uploading...";
    for (let i = 0; i < validFiles.length; i += 1) {
      const formData = new FormData();
      formData.append("file", validFiles[i]);
      formData.append("key", "");
      formData.append("photoable_id", photoable_id);
      formData.append("photoable_type_name", photoable_type_name);
      formData.append("photoable_type", `${photoable_type}`);

      request({
        url: `${process.env.REACT_APP_API_URL}/${httpPost}`,
        method: "post",
        data: formData,
        onUploadProgress: (progressEvent) => {
          const uploadPercentage = Math.floor(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          progressRef.current.innerHTML = `${uploadPercentage}%`;
          progressRef.current.style.width = `${uploadPercentage}%`;

          if (uploadPercentage === 100) {
            toast.success("Media has been uploaded", { position: "top-right" });
            queryClient.invalidateQueries("medias");
            validFiles.length = 0;
            setValidFiles([...validFiles]);
            setSelectedFiles([...validFiles]);
            setUnsupportedFiles([...validFiles]);
            closeUploadModal();
          }
        },
      }).catch(() => {
        uploadRef.current.innerHTML = `<span className="error">Error Uploading File(s)</span>`;
        progressRef.current.style.backgroundColor = "red";
        closeUploadModal();
        toast.error("Media fail to upload", { position: "top-right" });
      });
    }
  };

  const isAuthenticated = useSelector((state) => state.authReducer);

  const notAdmin = () => {
    swal({
      title: `Your login As ${isAuthenticated.adminName}`,
      text: "CRUD Operations, will be prosess on Super Admin Role",
      icon: "warning",
      // buttons: true,
      dangerMode: true,
    });
  };

  return (
    <>
      <div className=" w-full bg-white px-4 py-8">
        <button
          type="button"
          className="drop-container"
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
          onClick={fileInputClicked}
        >
          <div className="flex items-center justify-center">
            <div className="">
              <div className="flex justify-center">
                <img src="/dnd.svg" alt="" className="w-20" />
              </div>
              <div className="text-[#4AA1F3]">
                Drag & Drop files here or click to select file(s)
              </div>
            </div>
          </div>
          <input
            ref={fileInputRef}
            className="file-input"
            type="file"
            multiple
            onChange={filesSelected}
          />
        </button>

        <div className=" my-10">
          {unsupportedFiles.length === 0 && validFiles.length ? (
            <button
              type="button"
              className="file-upload-btn"
              onClick={() =>
                isAuthenticated.adminName === "user"
                  ? uploadFiles()
                  : notAdmin()
              }
            >
              Upload Files
            </button>
          ) : (
            ""
          )}
          {unsupportedFiles.length ? (
            <p>Please remove all unsupported files.</p>
          ) : (
            ""
          )}
          {validFiles.map((data) => (
            <div
              key={data.id}
              className="my-2 flex w-5/12 items-center border-2 border-[#4AA1F3]"
            >
              <div className="flex ">
                <div className="mr-2 h-fit w-fit bg-[#4AA1F3] p-0.5 text-center font-bold uppercase text-white">
                  {fileType(data.name)}
                </div>
                <span
                  className={` text-[#4AA1F3] ${
                    data.invalid ? "text-red-600" : ""
                  }`}
                >
                  {data.name.length > 16
                    ? `${data.name.slice(0, 16)}...`
                    : data.name}
                </span>
                <span className="ml-1">({fileSize(data.size)})</span>{" "}
                {data.invalid && (
                  <span className="file-error-message">({errorMessage})</span>
                )}
              </div>
              <div className="ml-auto flex items-center ">
                <button
                  type="button"
                  onClick={
                    !data.invalid
                      ? () => openImageModal(data)
                      : () => removeFile(data.name)
                  }
                  className="mr-1"
                >
                  <img src="/look.svg" alt="" className="w-5" />
                </button>
                <button
                  type="button"
                  className=" bg-[#f83245] py-0.5 px-2 font-bold text-white"
                  onClick={() => removeFile(data.name)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="modal" ref={modalRef}>
        <div className="overlay" />
        <button type="button" className="close" onClick={() => closeModal()}>
          X
        </button>
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
    </>
  );
}

export default AddMediaWrapper;

