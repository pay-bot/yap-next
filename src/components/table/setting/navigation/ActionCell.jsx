import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "react-modal";
import swal from "sweetalert";
import { closeModal } from "../../../../features/modal/modalSlice";
import NavForm from "../../../form/NavForm";
import { deleteNav, updateNav } from "../../../../hooks/useNavigationsData";
import Edit from "../../../button/Edit";
import Delete from "../../../button/Delete";

Modal.setAppElement("#root");

export default function ActionCell({ value, data }) {
  // console.log('na', data)

  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal);
  // console.log("in", dataModal);
  const closeModalHandler = () => dispatch(closeModal());

  const { id } = dataModal;

  const { mutateAsync: mutateUpdate, isLoading: isMutatingUpdate } =
    useMutation(updateNav);

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(deleteNav, {
    onSuccess: () => {
      queryClient.invalidateQueries("navigations");
    },
  });
  const removeNav = async (e) => {
    await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutateAsync(e);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const onFormSubmit = async (e) => {
    await mutateUpdate({ ...e, id });
  };

  return (
    <div className="flex items-center gap-x-1">
      {data.map((nav) => {
        let html;

        if (nav.id.toString() === value.toString()) {
          return (
            <>
              <Edit
                tooltip={`Edit ${nav.name}`}
                link={`/admin/settings/navigations/${value}/edit`}
              />
              <Delete
                tooltip={`Delete ${nav.name}`}
                onClick={() => removeNav(value)}
              />
            </>
          );
        }
        return html;
      })}
      {dataModal.isOpen === true && dataModal.id === value && (
        <Modal
          isOpen={dataModal.isOpen}
          onRequestClose={closeModalHandler}
          contentLabel="My dialog"
          className="fixed  flex  h-screen w-screen items-center justify-center "
          overlayClassName="myoverlay "
          closeTimeoutMS={500}
        >
          {data.map((nav) => {
            let html;
            if (nav.id === dataModal.id) {
              return (
                <NavForm
                  defaultValues={nav}
                  onFormSubmit={onFormSubmit}
                  isLoading={isMutatingUpdate}
                />
              );
            }
            return html;
          })}
        </Modal>
      )}
    </div>
  );
}

