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

import { useSiteStructureData } from "hooks/useStructuresData";
import { openModal } from "features/modal/modalSlice";
import { useDispatch } from "react-redux";
import ModalWrapper from "components/modal/ModalWrapper";
import PageForm from "components/form/page/PageForm";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button

} from "@mui/material";
import { Add, ArrowForward, Delete, Edit, Factory } from "@mui/icons-material";
import Link from "next/link";

export default function Structure() {
  const dispatch = useDispatch();

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Url",
        accessor: "url",
      },

      {
        Header: "action",
        accessor: "id",
        modalAccessor: "name",
        Cell: ActionCell, // new
      },
    ],
    []
  );
  const { data: pages, isSuccess } = usePagesData();

  const page = isSuccess ? pages?.data : [];

  // const sections = useSiteStructureData(page);

  // const structureList = sections?.map((list) => list?.data?.data?.model);

  // console.log("sections", structureList);
  // const tree = structureList.map((t) => {
  //   return {
  //     title: t?.name,
  //     id: t?.id,
  //     children: t?.sections?.map((sec) => {
  //       return {
  //         title: sec.name,
  //         id: sec.id,
  //       };
  //     }),
  //   };
  // });
  const grouped = _.groupBy(page, (product) => product?.parent_id);

  function childrenOf(parentId) {
    return (grouped[parentId] || []).map((product) => ({
      id: product.id,
      icon: product.icon,
      title: product.name,
      path: product.url,
      slug: product.slug,
      children: childrenOf(product.id),
    }));
  }

  // const treeData = childrenOf(0);

  // const treeData = [
  //   { title: "Chicken", children: [{ title: "Egg" }] },
  //   { title: "Fish", children: [{ title: "fingerline" }] },
  // ];

 function generateNprops(node) {
   const html = (
     <div title={node.title} className="">
       <span className="float-left">{`${node.title} `}</span>
       <div className="flex  right-0 absolute">
         <Button
           title="Add child"
           className="min-w-0 mx-1 w-6 h-6 p-0"
           size="small"
           variant="contained"
           color="success"
           onClick={() =>
             dispatch(openModal({ modalId: node.id, componentName: "addPage" }))
           }
         >
           <Add fontSize="small" />
         </Button>
         <Button
           title="Update this item"
           className="min-w-0 mx-1 w-6 h-6 p-0"
           size="small"
           variant="contained"
           sx={{ width : '3px' }}
           onClick={() =>
             dispatch(
               openModal({ modalId: node.id, componentName: "editPage" })
             )
           }
         >
           <Edit fontSize="small" />
         </Button>

         <Button
           // disabled={node.parent === undefined}
           title="Delete this item"
           className="min-w-0 mx-1 w-6 h-6 p-0"
           size="small"
           variant="contained"
           color="error"
           //  onClick={() => onDestroyPage(node.id)}
         >
           <Delete fontSize="small" />
         </Button>
         <Button
           title={`To Page ${node.title}`}
           size="small"
           variant="contained"
           className="min-w-0 mx-1 w-6 h-6 p-0"
         >
           <Link href={`/page/detail/${node.id}`}>
             <a href="" className="">
               <ArrowForward fontSize="small" />
             </a>
           </Link>
         </Button>
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
  }, [page]);

  return (
    <SectionWrapper>
      <ContentHeading>
        {/* <Add
          onClick={() =>
            dispatch(
              openModal({
                componentName: "addPage",
                id: "",
              })
            )
          }
          title="Create Page"
        /> */}
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
        header="Edit Collection Menu"
        modalId=""
        maxWidth="sm"
        onClick={() => dispatch(isSubmitOn({ componentName: "addPage" }))}
      >
        <PageForm />
      </ModalWrapper>
    </SectionWrapper>
  );
}
