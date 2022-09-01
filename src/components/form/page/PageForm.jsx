import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import "react-quill/dist/quill.snow.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InputContainer from "../../input/InputContainer";
import FormWrapper from "../../layout/FormWrapper";
import Submit from "../../button/Submit";
import schema from "./validation";
import CheckBoxContainer from "../../input/CheckBoxContainer";
import { useSelector } from "react-redux";
import { isSubmitOn } from "features/crudSlice";

function PageForm({ defaultValues, onFormSubmit }) {
  const { handleSubmit, control } = useForm({
    defaultValues,
  });

  const dataModal = useSelector((state) => state.modal);

  console.log("def", defaultValues);
  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    if (defaultValues) {
      formData.append("_method", "PUT");
    }
    formData.append("icon", data.icon ? data.icon : "");
    formData.append("name", data.name ? data.name : "");
    // formData.append("slug", data.slug ? data.slug : '');
    formData.append("title", data.title);
    formData.append("description", data.description);

    let allowComment;
    if (parseInt(data.allow_comments, 10) === 1) {
      allowComment = "on";
    } else allowComment = "";
    formData.append("allow_comments", allowComment);
    let isHeader;
    if (parseInt(data.is_header, 10) === 1) {
      isHeader = "on";
    } else allowComment = "";
    formData.append("is_header", isHeader);

    // formData.append("heading_element", data.heading_element);

    // onFormSubmit(formData);

    let parent;
    if (dataModal.componentName === "addChild") {
      parent = dataModal.id;
    }
    if (dataModal.componentName === "addPage") {
      parent = 0;
    }

    if (dataModal.componentName === "editPage") {
      parent = data.parent_id;
    }

    onFormSubmit({
      name: data.name,
      icon: data.icon,
      title: data.title,
      description: data.description,
      slug: data.slug,
      parent_id: parent,
      url_parent_id: parent,
      url: "",
      is_header: "",
      is_footer: "",
      allow_comments: "",
    });
  });

  const [valueTab, setValueTab] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleSubmitCollection = useSelector((state) => state.crud.submitReq);
  useEffect(() => {
    if (
      handleSubmitCollection.componentName === "addChild" ||
      handleSubmitCollection.componentName === "addPage" ||
      handleSubmitCollection.componentName === "editPage"
    ) {
      onSubmit();
      console.log("cate", onFormSubmit);
    }
  }, [handleSubmitCollection]);

  return (
    <FormWrapper>
      <div>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            padding: 2,
            margin: 2,
            borderRadius: 1,
          }}
        >
          <div className="flex w-full ">
            <div className="w-4/12">Page Detail</div>
            <div className="w-8/12 space-y-5">
              <InputContainer
                name="icon"
                control={control}
                // defaultValue={defau}
                label="Icon"
                // errors={errors.name}
              />

              <InputContainer
                name="name"
                control={control}
                // defaultValue={defau}
                label="Name"
              />

              {/* <InputContainer
                          name="slug"
                          control={control}
                          // defaultValue={defau}
                          label="Slug"
                        // errors={errors.name}
                        /> */}
              <div className="flex">
                <div className="">
                  <CheckBoxContainer
                    name="is_header"
                    control={control}
                    defaultValue={
                      defaultValues?.allow_comment === 1 ? "on" : ""
                    }
                    label="Is Header?"
                  />
                </div>

                {/* <div className="">
                      <input
                        type="checkbox"
                        id="is_header"
                        name="is_header"
                        value="on"
                        // selected={defaultValues?.allow_coments}
                        className=""
                        // required
                        {...register("is_header")}
                      />
                      <label className="" htmlFor="is_header">
                        Is Header
                      </label>
                    </div> */}
                {/* <div className="">
                <input
                  type="checkbox"
                  id="allow_comments"
                  name="allow_comments"
                  value="on"
                  defaultValue={defaultValues?.allow_coments}
                  className=""
                  // required
                  {...register("allow_comments")}
                />
                <label className="" htmlFor="allow_comments">
                  Name
                </label>
              </div>
              <div className="">
                <input
                  type="checkbox"
                  id="allow_comments"
                  name="allow_comments"
                  value="1"
                  defaultValue={defaultValues?.allow_coments}
                  className=""
                  // required
                  {...register("allow_comments")}
                />
                <label className="" htmlFor="allow_comments">
                  Name
                </label>
              </div>
              <div className="">
                <input
                  type="checkbox"
                  id="allow_comments"
                  name="allow_comments"
                  value="on"
                  defaultValue={defaultValues?.allow_coments}
                  className=""
                  // required
                  {...register("allow_comments")}
                />
                <label className="" htmlFor="allow_comments">
                  Name
                </label>
              </div> */}

                <div className="">
                  <CheckBoxContainer
                    name="allow_comments"
                    control={control}
                    defaultValue={
                      defaultValues?.allow_comment === 1 ? "on" : ""
                    }
                    label="Allow Comments?"
                  />
                </div>
              </div>
            </div>
          </div>
        </Box>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            padding: 2,
            margin: 2,
            borderRadius: 1,
          }}
        >
          <div className="flex w-full ">
            <div className="w-4/12">Meta Detail</div>
            <div className="w-8/12 space-y-5">
              <InputContainer
                name="title"
                control={control}
                // defaultValue={defau}
                label="Meta title"
              />

              <InputContainer
                name="description"
                control={control}
                // defaultValue={defau}
                label="Meta description"
              />
            </div>
          </div>
        </Box>
      </div>
    </FormWrapper>
  );
}

export default PageForm;

