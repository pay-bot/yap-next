import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import InputContainer from "../input/InputContainer";
import Submit from "../button/Submit";
import SelectListApi from "../input/SelectListApi";
import request from "../../utils/axios-utils";
import { closeLoading, isReactLoading } from "../../features/reactLoadingSlice";
import { closeModal } from "../../features/modal/modalSlice";

export default function AttachMediaForm({
  dataMedia,
  photoable_id,
  photoable_type,
  httpPost,
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const Attach = (data) => {
    return request({
      url: httpPost,
      method: "post",
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const { mutateAsync: mediaAttach } = useMutation(Attach, {
    onSuccess: (e) => {
      if (e.request.status === 200) {
        toast.success("Media has been attachced", { position: "top-right" });
        queryClient.invalidateQueries("medias");
      } else {
        toast.error("Media failed to attacch  ", { position: "top-right" });
      }
    },
  });

  const onSubmitMedia = async (data) => {
    dispatch(isReactLoading());
    await mediaAttach(data);
    dispatch(closeLoading());
    dispatch(closeModal());
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("name", data.name);
    formData.append("photoable_id", photoable_id);
    formData.append("photoable_type", photoable_type);
    onSubmitMedia(formData);
  };

  return (
    <div>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <span className="flex justify-start py-2 text-xs">
              Attach a Media Component
            </span>
            <div className="space-y-6">
              <InputContainer
                name="name"
                control={control}
                // defaultValue={defau}
                label="Name"
                errors={errors.name}
              />
              <div className=" ">
                <SelectListApi
                  control={control}
                  name="id"
                  label="Media"
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                  size="small"
                  options={dataMedia}
                />
              </div>
              <Submit />

              {/* <button type='submit' variant="contained" className='h-fit' endIcon={<SendIcon />}>
                Send
              </button> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

