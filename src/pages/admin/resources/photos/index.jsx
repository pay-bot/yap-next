import { useMemo, useState } from "react";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Pagination,
  Typography,
} from "@mui/material";

// import { ActionCell } from "../../../../components/table/photo/category/ActionCell";
// import { CountCell } from "../../../../components/table/photo/category/CountCell";
// import { ImageCell } from "../../../../components/table/photo/category/ImageCell";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import TitlePage from "../../../../components/TitlePage";
import Add from "../../../../components/button/Add";
import SectionWrapper from "../../../../components/layout/SectionWrapper";

import ContentHeading from "../../../../components/layout/ContentHeading";

import AddCategoryResourceModal from "../../../../components/modal/AddCategoryResourceModal";
import { openModal } from "../../../../features/modal/modalSlice";
// import ReactTable from '../../../../components/react-table/ReactTable';
// import { usePhotosData } from '../../../../hooks/usePhotosData';
import { fetchPhotos } from "../../../../hooks/usePhotosData";
import usePagination from "../../../../helper/Pagination";
import ActionCell from "../../../../components/table/resource/photo/ActionCell";
import { shortText } from "../../../../helper/StringHelper";

export default function Photo() {
  const [photoData, setPhotoData] = useState([]);
  useQuery(["photos"], fetchPhotos, {
    onSuccess: (e) => {
      setPhotoData(e?.data?.data);
    },
  });

  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  // eslint-disable-next-line no-unsafe-optional-chaining
  const count = Math.ceil(photoData?.length / PER_PAGE);
  const locations = usePagination(photoData, PER_PAGE);
  // eslint-disable-next-line no-underscore-dangle
  const _DATA = useMemo(() => locations, [locations]);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const dispatch = useDispatch();

  return (
    <SectionWrapper>
      <ContentHeading>
        <Add
          onClick={() =>
            dispatch(
              openModal({ componentName: "AddResourceCategory", id: null })
            )
          }
          title="Create Category"
        />
        <AddCategoryResourceModal />
      </ContentHeading>
      <div className="mt-6 grid grid-cols-5 gap-3 ">
        {/* <ReactTable columns={columns} data={data} /> */}
        {_DATA?.currentData().map((pho) => (
          <div key={pho.id}>
            <Card className="w-full relative">
              {/* <input type="checkbox" name="lang" value={assetsData.id} onChange={handlePair} className="absolute top-3 left-3 w-5 h-5" /> */}
              <CardActions className=" flex justify-between items-center">
                <Typography gutterBottom className="" component="div">
                  {shortText(pho.name, 15)}
                </Typography>
                <ActionCell value={pho.id} data={_DATA?.currentData()} />
              </CardActions>
              <CardActionArea>
                <CardMedia
                  component="img"
                  className="h-[180px] object-cover w-full"
                  image={pho.url}
                  alt="Image"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {/* {assetsData?.description || 'Description'} */}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </SectionWrapper>
  );
}

