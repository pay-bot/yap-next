import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import TitlePage from "../../../../../components/TitlePage";
import { useRouter } from "next/router";

import SectionWrapper from "components/layout/SectionWrapper";
import ContentHeading from "components/layout/ContentHeading";
import Link from "next/link";
import { fetchSections } from "hooks/useSectionsData";

export default function Sections() {
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
  }, [sortedCols]);

  console.log("sssor", section);

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
                            {/* <div className="">{generateNprops(page)}</div> */}
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
