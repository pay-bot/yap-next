import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Link from "next/link";
import { fetchSections } from "hooks/useSectionsData";
import SectionWrapper from "components/layout/SectionWrapper";
import ContentHeading from "components/layout/ContentHeading";
import {
  CardActionArea,
  CardActions,
  CardContent,
  Card,
  Pagination,
  Button,
  styled,
  Tabs,
  Tab,
  Box,
  FormControlLabel,
  FormLabel,
  FormControl,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  ArrowForward,
  Edit,
  Sync,
  Code,
  LogoDev,
  Menu,
} from "@mui/icons-material";

function PageDetail() {
  const router = useRouter();
  const pageId = router.query.pagesId;

  const { data: section, isSuccess } = useQuery(
    ["sections", { pageId }],
    fetchSections
  );

  const sectionIdSort = [];
  section?.data?.model?.sections?.map((data) => {
    sectionIdSort.push(data);
    return sectionIdSort;
  });

  const sortedCols = _.sortBy(sectionIdSort, "list_order");

  const [sor, setSor] = useState(sortedCols);
  useEffect(() => {
    setSor(sortedCols);
  }, [section]);

  console.log("sssor", sectionIdSort);

  function generateNprops(node) {
    const html = (
      <div title={node.name} className="">
        {/* <span className="float-left">{`${shortSentence(node.name, 9)} ... `}</span> */}
        <div className="flex gap-x-2  right-0 absolute">
          <Button
            title="Generate Metadata"
            className="min-w-0 mx-1 w-6 h-6 p-0"
            size="small"
            variant="contained"
            color="success"
            sx={{ minWidth: 0 }}
            // onClick={() => onGenerateMeta(node.id)}
          >
            <Sync fontSize="small" />
          </Button>
          <Button
            title="View Metadata"
            className="min-w-0 mx-1 w-6 h-6 p-0"
            size="small"
            variant="contained"
            color="success"
            sx={{ minWidth: 0 }}
            // onClick={() =>
            //   dispatch(
            //     handleModal({ modalId: node.id, componentName: "generateMeta" })
            //   )
            // }
          >
            <Code fontSize="small" />
          </Button>
          <Button
            // disabled={node.parent === undefined}
            title="To Developer Mode"
            className="min-w-0 mx-1 w-6 h-6 p-0"
            size="small"
            variant="contained"
            color="error"
          >
            <Link href={`/section/developer/${node.id}`}>
              <a>
                <LogoDev fontSize="small" />
              </a>
            </Link>
          </Button>
          <Button
            title="Edit Section"
            className="min-w-0 mx-1 w-6 h-6 p-0"
            size="small"
            variant="contained"
            // onClick={() =>
            //   dispatch(
            //     handleModal({ modalId: node.id, componentName: "editSection" })
            //   )
            // }
          >
            <Edit fontSize="small" />
          </Button>
          {node.menu && (
            <Button
              title="Section Menu"
              className="min-w-0 mx-1 w-6 h-6 p-0"
              size="small"
              variant="contained"
            >
              <Link href={`/menu-list/${node.menu}`}>
                <a>
                  <Menu fontSize="small" />
                </a>
              </Link>
            </Button>
          )}

          <Button
            title={`To Page ${node.name}`}
            size="small"
            variant="contained"
            className="min-w-0 mx-1 w-6 h-6 p-0"
          >
            <Link href={`/admin/section/detail/${node.id}`}>
              <a>
                <ArrowForward fontSize="small" />
              </a>
            </Link>
          </Button>
        </div>
      </div>
    );
    return html;
  }



  return (
    <SectionWrapper>
      <ContentHeading>
        <Link href={`/admin/pages/${pageId}/sections/create`}>
          <a>
            <div className="w-fit flex cursor-pointer items-center rounded bg-indigo-100 p-1 text-indigo-900 shadow hover:bg-indigo-900 hover:text-white">
              <img src="/add.svg" alt="" className="mr-1 w-4" />
              <div className="text-sm font-semibold">Create Section</div>
            </div>
          </a>
        </Link>
      </ContentHeading>

      <div className="w-full">
        <DragDropContext onDragEnd={(e) => console.log(e)}>
          <Droppable droppableId="sections">
            {(provided) => (
              <ul
                className="space-y-5"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {sor?.map((page, index) => (
                  <Draggable
                    key={page.id}
                    draggableId={`${page.id}`}
                    value={page.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          key={page.id}
                          className="bg-white border shadow rounded  "
                        >
                          <div className="bg-blue-600 w-full text-white p-2 rounded-t relative flex">
                            {/* <input type="checkbox" name="lang" value={page.id} className="" onChange={handleDeleteSection} /> */}
                            <p className="ml-8">{page?.name}</p>
                            <div className="">{generateNprops(page)}</div>
                          </div>
                          <div className="w-full p-3">
                            <img
                              src={`${
                                page.url ??
                                "https://admin.bzpublish.com/img/bz-publish.svg"
                              }`}
                              alt=""
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        {/* <ReactShortableWrapper onEnd={saveBoard} list={sor} setList={setSor}>
          {sor.map((data) => (
            <SectionCard key={data.id} sectionData={data} menuData={menuData} />
          ))}
        </ReactShortableWrapper> */}
      </div>
    </SectionWrapper>
  );
}

export default PageDetail;
