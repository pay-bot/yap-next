import React, { useMemo, useState, useEffect } from "react";
import ActionCell from "components/table/page/ActionCell";
import TitlePage from "components/TitlePage";
import { usePagesData } from "../../../hooks/usePagesData";
// import Add from "components/button/Add";
import SectionWrapper from "components/layout/SectionWrapper";
import ContentHeading from "components/layout/ContentHeading";
import ReactTable from "components/react-table/ReactTable";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import SortableTree, {
  toggleExpandedForAll,
  addNodeUnderParent,
  removeNodeAtPath,
} from "@nosferatu500/react-sortable-tree";
import "@nosferatu500/react-sortable-tree/style.css";

import { usePageDetail, useSiteStructureData } from "hooks/useStructuresData";
import { openModal } from "features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "components/modal/ModalWrapper";
import PageForm from "components/form/page/PageForm";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@mui/material";
import { Add, ArrowForward, Delete, Edit, Factory } from "@mui/icons-material";
import Link from "next/link";
import AddItem from "components/button/AddItem";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { isReactLoading, closeLoading } from "features/reactLoadingSlice";
import request from "components/utils/axios-utils";

export default function Structure() {
  const dispatch = useDispatch();

  const dataModal = useSelector((state) => state.modal);
  const pageId = dataModal.id;


  console.log("dm", dataModal);

  const { data: pages, isSuccess } = usePagesData();
  const { isLoading, data: pageDetail, isError, error } = usePageDetail(pageId);

  console.log("dm", pageDetail);


  const page = isSuccess ? pages?.data : [];

  const grouped = _.groupBy(page, (product) => product?.parent_id);

  function childrenOf(parentId) {
    return (grouped[parentId] || []).map((product) => ({
      id: product.id,
      icon: product.icon,
      title: product.name,
      path: product.url,
      expanded: true,
      slug: product.slug,
      children: childrenOf(product.id),
    }));
  }

  function generateNprops(node) {
    const html = (
      <div key={node.title} title={node.title} className="">
        <span className="float-left">{`${node.title} `}</span>
        <div className="flex  right-3 gap-x-1 absolute">
          <button
            type="button"
            title="Add child"
            className="  w-6 h-6 p-0 bg-green-300 flex items-center justify-center rounded"
            onClick={() =>
              dispatch(openModal({ id: node.id, componentName: "addPage" }))
            }
          >
            <Add fontSize="small" />
          </button>
          <button
            type="button"
            title="Add child"
            className="  w-6 h-6 p-0 bg-green-300 flex items-center justify-center rounded"
            onClick={() =>
              dispatch(openModal({ componentName: "editPage", id: node.id }))
            }
            // onClick={() =>
            //   dispatch(
            //     openModal({ id: node.id, componentName: "editPage" })
            //   )
            // }
          >
            <Edit fontSize="small" />
          </button>

          <button
            type="button"
            title="Add child"
            className="  w-6 h-6 p-0 bg-green-300 flex items-center justify-center rounded"
            //  onClick={() => onDestroyPage(node.id)}
          >
            <Delete fontSize="small" />
          </button>
          <button
            type="button"
            title="Add child"
            className="  w-6 h-6 p-0 bg-green-300 flex items-center justify-center rounded"
          >
            <Link href={`/page/detail/${node.id}`}>
              <a href="" className="">
                <ArrowForward fontSize="small" />
              </a>
            </Link>
          </button>
        </div>
      </div>
    );
    return html;
  }

  const [treeData, setTreeData] = useState([]);
  useEffect(() => {
    if (grouped) {
      setTreeData(childrenOf(0));
    }
  }, [pages]);

  const createPage = (data) => {
    return request({
      url: `/pages`,
      method: "post",
      data,
      // headers: { 'Content-Type': 'multipart/form-data' }
    });
  };

  const { mutateAsync } = useMutation(createPage, {
    onSuccess: (e) => {
      console.log("d", e);
      if (e.request.status === 200) {
        toast.success("Page has been created", { position: "top-right" });
        navigate("/admin/pages");
        dispatch(closeLoading());
      } else {
        toast.error("Page failed to create  ", { position: "top-right" });
        dispatch(closeLoading());
      }
    },
  });

  const onSubmitPage = async (data) => {
    dispatch(isReactLoading());
    await mutateAsync(data);
    // dispatch(closeLoading());
    // navigate(-1);
  };

  return (
    <SectionWrapper>
      <ContentHeading>
        <AddItem
          onClick={() =>
            dispatch(
              openModal({
                componentName: "addPage",
                id: "",
              })
            )
          }
          title="Create Page"
        />
      </ContentHeading>
      {/* <ReactTable columns={columns} data={data} /> */}
      {treeData && (
        <div
          style={{
            height: "100vh",
            width: "100%",
            position: "relative",
          }}
        >
          <div style={{ height: 500 }}>
            <SortableTree
              treeData={treeData}
              onChange={(treeData) => setTreeData(treeData)}
              generateNodeProps={({ node }) => ({
                title: generateNprops(node),
              })}
            />
          </div>
        </div>
      )}

      <ModalWrapper
        componentName="addPage"
        header="Add Page"
        modalId=""
        maxWidth="sm"
        onClick={() => dispatch(isSubmitOn({ componentName: "addPage" }))}
      >
        <PageForm onFormSubmit={onSubmitPage} />
      </ModalWrapper>
      <ModalWrapper
        componentName="editPage"
        header="Edit Page"
        modalId={pageId}
        maxWidth="sm"
        onClick={() => dispatch(isSubmitOn({ componentName: "editPage" }))}
      >
        <PageForm
          onFormSubmit={onSubmitPage}
          defaultValues={pageDetail?.data}
          key={pageDetail?.data?.id}
        />
      </ModalWrapper>
    </SectionWrapper>
  );
}
