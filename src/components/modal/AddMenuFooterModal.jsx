import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import request from "../../utils/axios-utils";
import { closeModal } from "../../features/modal/modalSlice";
import MenuForm from "../form/menu/Form";

export default function AddMenuFooterModal() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const closeModalHandler = () => dispatch(closeModal());

  const createFooter = (data) => {
    return request({
      url: `/menus/footer`,
      method: "post",
      data,
    });
  };

  const { mutateAsync } = useMutation(createFooter, {
    onSuccess: (e) => {
      queryClient.invalidateQueries("menuFooter");
      console.log("d", e);
      if (e.request.status === 200) {
        toast.success("Footer has been created", { position: "top-right" });
        setTimeout(closeModalHandler, 1000);
      } else {
        toast.error("Footer failed to create  ", { position: "top-right" });
        setTimeout(closeModalHandler, 1000);
      }
    },
  });

  const onSubmitFooter = async (data) => {
    await mutateAsync(data);
  };

  const dataModal = useSelector((state) => state.modal);

  return (
    <>
      {dataModal.isOpen === true &&
        dataModal.componentName === "AddMenuFooterModal" &&
        dataModal.id === null && (
          <Modal
            isOpen={dataModal.isOpen}
            onRequestClose={closeModalHandler}
            contentLabel="My dialog"
            className="fixed  flex  h-screen w-screen items-center justify-center  "
            overlayClassName="myoverlay "
            closeTimeoutMS={500}
          >
            <MenuForm onFormSubmit={onSubmitFooter} isLoading="" />
          </Modal>
        )}
    </>
  );
}

