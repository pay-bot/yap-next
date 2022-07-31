import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ContentForm from "../../../components/form/content/ContentForm";
import {
  closeLoading,
  isReactLoading,
} from "../../../features/reactLoadingSlice";

import TextForm from "../../../components/form/text/TextForm";
import request from "../../../utils/axios-utils";
import TextFormEdit from "../../../components/form/text/TextFormEdit";
import ContentArticle from "./ContentArticle";
import Media from "./Media";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  // children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function TabsContent({ val, data }) {
  const { pageId, sectionId, contentId } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const colData = data.article;

  const collection = [];
  Object.entries(colData).map(([, value]) => {
    return collection.push(value);
  });
  console.log("content", data);

  const updateContent = (dataContent) => {
    return request({
      headers: { "Content-Type": "application/json" },
      url: `/pages/${pageId}/sections/${sectionId}/content/${contentId}`,
      method: "post",
      data: dataContent,
    });
  };

  const { mutateAsync } = useMutation(updateContent, {
    onSuccess: (e) => {
      queryClient.invalidateQueries("sections");
      queryClient.invalidateQueries("sectionsContent");

      if (e.request.status === 200) {
        toast.success("Content has been updated", { position: "top-right" });
        dispatch(closeLoading());
      } else {
        toast.error("Content failed to update  ", { position: "top-right" });
        dispatch(closeLoading());
      }
    },
  });

  const onFormSubmit = async (dataContent) => {
    dispatch(isReactLoading());
    await mutateAsync(dataContent);
    navigate(-1);
    // dispatch(closeLoading());
  };

  const addText = (text) => {
    return request({
      url: `/pages/${pageId}/sections/${sectionId}/content/${contentId}/texts`,
      method: "post",
      data: { ...text },
    });
  };

  const { mutateAsync: addTexts } = useMutation(addText, {
    onSuccess: (e) => {
      queryClient.invalidateQueries("sectionsContent");
      if (e.request.status === 200) {
        toast.success("Text has been created", { position: "top-right" });
        dispatch(closeLoading());
      } else {
        toast.error("Text failed to create", { position: "top-right" });
        dispatch(closeLoading());
      }
    },
  });

  const onSubmitText = async (dataText) => {
    dispatch(isReactLoading());
    await addTexts(dataText);
    // dispatch(closeLoading());
  };

  console.log("c", val);

  const theme = useTheme();
  const [valueTab, setValueTab] = useState(val);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleChangeIndex = (index) => {
    setValueTab(index);
  };

  return (
    <Box
      sx={{ bgcolor: "background.paper" }}
      className="3xl:w-7/12 2xl:w-9/12 2xl:mx-auto mx-4 my-8 "
    >
      <Tabs value={valueTab} onChange={handleChange} centered>
        <Tab label="Content" {...a11yProps(0)} />
        <Tab label="Article" {...a11yProps(1)} />
        <Tab label="Text" {...a11yProps(2)} />
        <Tab label="Media" {...a11yProps(3)} />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={valueTab}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={valueTab} index={0} dir={theme.direction}>
          <ContentForm
            defaultValues={data?.content}
            key={data?.content?.id}
            onFormSubmit={onFormSubmit}
          />
        </TabPanel>
        <TabPanel value={valueTab} index={1} dir={theme.direction}>
          {collection?.length > 0 ? (
            <ContentArticle collectionData={collection} />
          ) : (
            <div className="">no article collection</div>
          )}
        </TabPanel>
        <TabPanel value={valueTab} index={2} dir={theme.direction}>
          <TextForm
            defaultValues={data}
            key={data?.content?.id}
            onFormSubmit={onSubmitText}
          />
          {data?.content?.texts.length > 0 && (
            <div className="mt-8">
              <div className="flex py-4">
                <div className="w-11/12 flex gap-x-4 border-b-2 border-black py-2">
                  <div className="w-4/12 text-center">Titile</div>
                  <div className="w-4/12 text-center">Description</div>
                  <div className="w-4/12 text-center">Link</div>
                </div>
                <div className="w-32 border-b-2 border-black py-2">
                  <p className=" text-center">Action</p>
                </div>
              </div>
              {data?.content?.texts?.map((text) => (
                <div key={text.id} className="px-2">
                  <TextFormEdit defaultValues={text} isEditForm id={text.id} />
                </div>
              ))}
            </div>
          )}
        </TabPanel>
        <TabPanel value={valueTab} index={3} dir={theme.direction}>
          {/* <AddMedia /> */}

          <Media />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

