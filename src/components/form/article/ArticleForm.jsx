import React, { useEffect, useReducer, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FormWrapper from "../../layout/FormWrapper";
import Submit from "../../button/Submit";
import { useArticleCategoriesData } from "../../../hooks/useArticleCategoriesData";
import InputContainer from "../../input/InputContainer";
import DatePickerField from "../../input/DatePickerField";
import CustomSelect from "../../input/CustomSelect";
import { useArticleTagsData } from "../../../hooks/useArticleTagsData";
import CheckBoxContainer from "../../input/CheckBoxContainer";
import SelectListApi from "../../input/SelectListApi";
import Field from "components/molecules/field";
import FormLinker from "form-linker";

import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Layout from "components/app";

function ArticleForm({ defaultValues, onFormSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    // resolver: schema,
    defaultValues,
  });

  // console.log('deva', defaultValues)

  const defValTags = defaultValues?.tags?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  const defValTagsUp = defValTags?.map((item) => {
    return {
      // label: item.label,
      value: item.value,
    };
  });

  const fill = useSelector((state) => state.artCollection.isFill);
  // console.log('filloo', fill)

  const arr = defValTagsUp?.map((t) => t.value);

  const onSubmit = (data) => {
    // console.log('tt', data.tags)
    const tagg = data.tags?.map((t) => t.id);
    const isSame =
      arr?.length === tagg?.length &&
      arr?.every(
        (o, i) =>
          Object.keys(o).length === Object.keys(tagg[i]).length &&
          Object.keys(o).every((k) => o[k] === tagg[i][k])
      );
    const newData = data;
    let actFrom;
    if (newData.active_from === defaultValues?.active_from) {
      actFrom = defaultValues?.active_from;
    } else actFrom = format(newData.active_from, "yyyy-MM-dd");

    let actTo;
    if (newData.active_to === defaultValues?.active_to) {
      actTo = defaultValues?.active_to;
    } else actTo = format(newData.active_to, "yyyy-MM-dd");

    const formData = new FormData();
    if (isSame) {
      arr.forEach((tag) => formData.append("tags[]", tag));
    } else data.tags?.forEach((tag) => formData.append("tags[]", tag));

    if (defaultValues) {
      formData.append("_method", "PUT");
    }
    formData.append("content", data.content ? data.content : "");
    formData.append("name", data.name ? data.name : "");
    formData.append("content_in", data.content_in ? data.content_in : "");
    formData.append("name_in", data.name_in ? data.name_in : "");
    formData.append("active_to", actTo ?? format(new Date(), "yyyy-MM-dd"));
    formData.append(
      "action_name_in",
      data.action_name_in ? data.action_name_in : ""
    );
    formData.append("action_url", data.action_url ? data.action_url : "");
    formData.append(
      "category_id",
      fill?.length === 0 ? data.category_id : fill[0]?.category_id
    );
    // formData.append("tags[]", data.tags)
    formData.append("summary", data.summary ? data.summary : "");
    formData.append("summary_in", data.summary_in ? data.summary_in : "");
    formData.append("active_from", actFrom ?? format(new Date(), "yyyy-MM-dd"));
    let allowComment;
    if (parseInt(data.allow_comments, 10) === 1) {
      allowComment = "on";
    } else allowComment = "";
    formData.append("allow_comments", allowComment);
    onFormSubmit(formData);
  };

  useEffect(() => {
    register("content", { required: true, minLength: 11 });
    register("content_in", { required: true, minLength: 11 });
  }, [register]);

  const onEditorStateChange = (editorState) => {
    setValue("content", editorState);
    setValue("content_in", editorState);
  };

  const editorContent = watch("content");
  const editorContent_in = watch("content_in");

  const { data: categories } = useArticleCategoriesData();

  const { data: tags } = useArticleTagsData();
  // console.log('tag', defaultValues)

  const options = tags?.data?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  console.log("dev", defValTags);

  const [valueTab, setValueTab] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  // let namee = defaultValues[0].name
  // const active = new Date().toISOString().subStr(0, 10)

  const category = categories?.data?.map((cat) => cat);

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const formLinker = useRef(
    new FormLinker({
      data: {
        editor: "",
      },
      schema: {
        editor: "string",
      },
    })
  );
  return (
    <FormWrapper>
      <div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={valueTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="English" value="1" />
                <Tab label="Indonesia" value="2" />
              </TabList>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TabPanel value="1">
                <div className="">
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
                      <div className="w-4/12">Category</div>
                      <div className="w-8/12">
                        {fill?.length === 0 ? (
                          <div className="w-full">
                            <SelectListApi
                              control={control}
                              name="category_id"
                              label="Category"
                              fullWidth
                              sx={{ marginBottom: "20px" }}
                              size="small"
                              options={category}
                              // error={!!errors.age}
                              // helperText={errors.age?.message}
                            />
                          </div>
                        ) : (
                          <div className="w-full">
                            <SelectListApi
                              control={control}
                              name="category_id"
                              label="Category"
                              fullWidth
                              sx={{ marginBottom: "20px" }}
                              size="small"
                              options={category}
                              defaultValue={fill[0]?.category?.id}
                              disabled
                              // error={!!errors.age}
                              // helperText={errors.age?.message}
                            />
                          </div>
                        )}

                        <div className="relative  w-full  ">
                          <Controller
                            name="tags"
                            control={control}
                            // defaultValue={defValTagsUp}
                            {...register("tags")}
                            render={({ field: { onChange } }) => (
                              <CustomSelect
                                options={options}
                                placeholder="Tag"
                                // getOptionLabel={tags => tags?.data[0].name}
                                // getOptionValue={tags => tags?.data[0].name}
                                defaultValue={defValTags}
                                isMulti
                                onChange={(v) =>
                                  onChange(v?.map((val) => val.value))
                                }
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </Box>
                </div>
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
                    <div className="w-4/12">Article Detail</div>
                    <div className="w-8/12 space-y-5">
                      <InputContainer
                        name="name"
                        control={control}
                        // defaultValue={defau}
                        label="Name"
                        errors={errors.name}
                      />
                      <InputContainer
                        name="summary"
                        control={control}
                        // defaultValue={defau}
                        label="Summary"
                        // errors={errors.name}
                      />

                      <DatePickerField
                        sx={{ marginBottom: "20px" }}
                        control={control}
                        name="active_from"
                        label="Active from"
                        error={!!errors.datePicker}
                        helperText={errors.datePicker?.message}
                        size="small"
                        fullWidth
                      />

                      <DatePickerField
                        sx={{ marginBottom: "20px" }}
                        control={control}
                        name="active_to"
                        label="Active to"
                        error={!!errors.datePicker}
                        helperText={errors.datePicker?.message}
                        size="small"
                        fullWidth
                      />
                      <InputContainer
                        name="action_name"
                        control={control}
                        // defaultValue={defau}
                        label="Action Name"
                        errors={errors.name}
                      />
                      <InputContainer
                        name="action_url"
                        control={control}
                        // defaultValue={defau}
                        label="Action Url"
                        // errors={errors.name}
                      />
                      <div className="">
                        <CheckBoxContainer
                          name="allow_comments"
                          control={control}
                          defaultValue={defaultValues?.allow_comment === 1}
                          label="Allow comment?"
                          errors={errors.acceptTerms}
                        />
                      </div>
                    </div>
                  </div>
                </Box>

                <div className="flex gap-x-4 mt-6" />

                <div className="flex gap-x-4" />

                <Box
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    padding: 2,
                    margin: 2,
                    borderRadius: 1,
                  }}
                >
                  <div className="flex w-full pb-5">
                    <div className="w-4/12">Article Content</div>
                    <div className="w-8/12">
                      <div className="relative my-6 w-full ">
                        <Layout>
                          <Field
                            formLinker={formLinker.current}
                            name="editor"
                            type="editor"
                            minHeight={150}
                            height={620}
                            maxHeight={800}
                            placeholder="Enter your content here"
                            toolbar={["withImages"]}
                            onChange={forceUpdate}
                          />
                        </Layout>
                      </div>{" "}
                    </div>
                  </div>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    padding: 2,
                    margin: 2,
                    borderRadius: 1,
                  }}
                >
                  <div className="flex w-full pb-5">
                    <div className="w-4/12">Article Description</div>
                    <div className="w-8/12 space-y-5">
                      <InputContainer
                        name="name_in"
                        control={control}
                        // defaultValue={defau}
                        label="Nama"
                        errors={errors.name}
                      />
                      <InputContainer
                        name="summary_in"
                        control={control}
                        // defaultValue={defau}
                        label="Ringkasan"
                        // errors={errors.name}
                      />
                      <InputContainer
                        name="action_name_in"
                        control={control}
                        // defaultValue={defau}
                        label="Nama Aksi"
                        errors={errors.name}
                      />
                      <div className="relative pb-6 w-full "></div>{" "}
                    </div>
                  </div>
                </Box>
              </TabPanel>

              <Submit />
            </form>
          </TabContext>
        </Box>
      </div>
    </FormWrapper>
  );
}

export default ArticleForm;

