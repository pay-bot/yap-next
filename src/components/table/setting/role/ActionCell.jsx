import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "react-modal";

import swal from "sweetalert";
import { closeModal, openModal } from "../../../../features/modal/modalSlice";
import { deleteRole } from "../../../../hooks/useRolesData";
import Edit from "../../../button/Edit";
import Delete from "../../../button/Delete";

Modal.setAppElement("#root");

export default function ActionCell({ value }) {
  // console.log(data);

  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal);
  // console.log("in", dataModal);
  const closeModalHandler = () => dispatch(closeModal());

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(deleteRole, {
    onSuccess: () => {
      queryClient.invalidateQueries("roles");
    },
  });
  const removeRole = async (id) => {
    await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutateAsync(id);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  return (
    <div className="flex items-center ">
      <Edit
        onClick={() =>
          dispatch(openModal({ componentName: "EditArticleCat", id: value }))
        }
        // title={data.name}
      />
      <Delete onClick={() => removeRole(value)} />

      {dataModal.isOpen === true &&
        dataModal.id === value &&
        dataModal.componentName === "EditArticleCat" && (
          <Modal
            isOpen={dataModal.isOpen}
            onRequestClose={closeModalHandler}
            contentLabel="My dialog"
            className="fixed  flex  h-screen w-screen items-center justify-center "
            overlayClassName="myoverlay "
            closeTimeoutMS={500}
          />
        )}
    </div>
  );
}

