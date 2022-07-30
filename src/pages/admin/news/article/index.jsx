import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import ActionCell from "../../../../components/table/article/article/ActionCell";
import LikeCell from "../../../../components/table/article/article/LikeCell";
import TitlePage from "../../../../components/TitlePage";
import { useArticlesData } from "../../../../hooks/useArticlesData";
import Add from "../../../../components/button/Add";
import SectionWrapper from "../../../../components/layout/SectionWrapper";
import ContentHeading from "../../../../components/layout/ContentHeading";
import { resetCollection } from "../../../../features/articleCollectionSlice";
import ReactTable from "../../../../components/react-table/ReactTable";

export default function Article() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      // {
      //   Header: "Slug",
      //   accessor: "slug",
      //   // Cell: StatusPill,
      // },
      {
        Header: "Summary",
        accessor: "summary",
      },
      {
        Header: "Collection",
        accessor: "category.name",
      },
      {
        Header: "Likes",
        accessor: "like",
        Cell: LikeCell,
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
  const { data: articles, isSuccess } = useArticlesData();

  const article = isSuccess ? articles?.data[0] : [];

  const data = useMemo(() => article, [article]);
  // console.log('artis', data);

  return (
    <SectionWrapper>
      <ContentHeading>
        <Add
          onClick={() => [
            navigate("/admin/news/articles/create"),
            dispatch(resetCollection(data)),
          ]}
          title="Create Article"
        />
      </ContentHeading>
      <ReactTable columns={columns} data={data} />
    </SectionWrapper>
  );
}

