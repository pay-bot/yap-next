import React, { useMemo } from "react";
import ActionCell from "../../../components/table/page/ActionCell";
import TitlePage from "../../../components/TitlePage";
import { usePagesData } from "../../../hooks/usePagesData";
import Add from "../../../components/button/Add";
import SectionWrapper from "../../../components/layout/SectionWrapper";
import ContentHeading from "../../../components/layout/ContentHeading";
import ReactTable from "../../../components/react-table/ReactTable";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import SortableTree from "@nosferatu500/react-sortable-tree";

import { useSiteStructureData } from "hooks/useStructuresData";

export default function Pages() {
  // const onSuccess = (data) => {
  //   console.log({ data });
  // };

  // const onError = (error) => {
  //   console.log({ error });
  // };

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

  const treeData = childrenOf(0);

  // const treeData = [
  //   { title: "Chicken", children: [{ title: "Egg" }] },
  //   { title: "Fish", children: [{ title: "fingerline" }] },
  // ];

  function generateNprops(node) {
    const html = <div title={node.title}>{node.title}</div>;
    return html;
  }

  return (
    <SectionWrapper>
      <ContentHeading>
        <Add link="/admin/pages/create" title="Create Page" />
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
          <SortableTree
            className=""
            treeData={treeData}
            // slideRegionSize={0}
            onChange={(tree) => console.log(tree)}
            generateNodeProps={({ node }) => ({ title: generateNprops(node) })}
          />
        </div>
      )}
    </SectionWrapper>
  );
}

