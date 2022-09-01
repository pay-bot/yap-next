import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import TitlePage from "../../../../../components/TitlePage";
import { useRouter } from "next/router";


import { fetchSections } from "hooks/useSectionsData";
import SectionWrapper from "components/layout/SectionWrapper";
import ContentHeading from "components/layout/ContentHeading";
import Link from "next/link";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import { ExpandMore, Delete } from "@mui/icons-material";
import ContentForm from "components/form/content/ContentForm";


export default function Sections() {
const router = useRouter();
const pageId = router.query.pagesId;
const sectionId = router.query.sectionId;

  const [expanded, setExpanded] = useState(null);

console.log('router', router)

  const { data: section, isSuccess } = useQuery(
    ["sections", { pageId, sectionId }],
    fetchSections
  );

  const sectionIdSort = [];
  section?.data?.model?.sections?.map((data) => {
    sectionIdSort.push(data);
    return sectionIdSort;
  });

  const sortedCols = _.sortBy(sectionIdSort, "list_order");

  // const [sor, setSor] = useState(sortedCols);
  // useEffect(() => {
  //   setSor(sortedCols);
  // }, [sortedCols]);

  console.log("sssor", section);

  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    // setArticleSelected(null);
  };

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
        {section?.data?.model?.sections[0]?.components?.map((sec) => (
          <Accordion
            expanded={expanded?.id === sec.id}
            onChange={handleChange(sec)}
          >
            <AccordionSummary
              className="bg-blue-600"
              expandIcon={<ExpandMore className="text-black" />}
              ariarols="panel1bh-content"
              id="panel1bh-header"
            >
              <div className="text-black">{sec.heading}</div>
              <div className="ml-auto px-4 flex gap-x-3">
                <div className="text-black capitalize">
                  {sec.content_category}
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails className="m-3">
              <ContentForm
                defaultValues={sec}
                key={sec?.id}
                // onFormSubmit={onFormSubmit}
              />
              {/* {renderWidget(sec.widget.category_name, dataWidget?.data)} */}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </SectionWrapper>
  );
}

