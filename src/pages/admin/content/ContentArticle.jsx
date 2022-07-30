import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import ActionCell from "../../../components/table/article/article/ActionCell";
import Add from "../../../components/button/Add";
import SectionWrapper from "../../../components/layout/SectionWrapper";
import ContentHeading from "../../../components/layout/ContentHeading";
import { fillCollection } from "../../../features/articleCollectionSlice";
import ReactTable from "../../../components/react-table/ReactTable";

export default function ContentArticle({ collectionData }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Summary",
        accessor: "summary",
      },
      {
        Header: "Collection",
        accessor: "category.name",
      },
      {
        Header: "Slug",
        accessor: "slug",
        // Cell: StatusPill,
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

  const data = useMemo(() => collectionData, [collectionData]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <SectionWrapper>
      <ContentHeading>
        <Add
          // link="/admin/news/articles/create" title="Create Article"
          onClick={() => [
            navigate("/admin/news/articles/create"),
            dispatch(fillCollection(data)),
          ]}
          title="Create Article"
        />
      </ContentHeading>
      <div className="mt-6 ">
        <ReactTable columns={columns} data={data} collectionData={data} />
      </div>
    </SectionWrapper>
  );
}

