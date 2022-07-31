import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import swal from "sweetalert";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import Collapse from "@mui/material/Collapse";
import request from "../../utils/axios-utils";
import SectionForm from "../form/section/SectionForm";
import Delete from "../button/Delete";
import Edit from "../button/Edit";
import { closeLoading, isReactLoading } from "../../features/reactLoadingSlice";
import Menu from "../button/Menu";

export default function SectionCard({ sectionData, menuData }) {
  const queryClient = useQueryClient();
  const { pageId } = useParams();
  const dispatch = useDispatch();
  const [isCardOpen, setIsCardOpen] = useState(true);
  const [isEditSectionOpen, setIsEditSectionOpen] = useState(false);
  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };
  const toggleEditSection = () => {
    setIsEditSectionOpen(!isEditSectionOpen);
  };

  const deleteSection = async (id) => {
    return await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/pages/${pageId}/sections/${id}`,
        { data: { _id: `${id}` } }
      )
      .then(() => console.log(true))
      .catch((err) => err.message);
  };

  const { mutateAsync: mutateAsyncDelSec } = useMutation(deleteSection, {
    onSuccess: () => {
      queryClient.invalidateQueries("sections");
    },
  });

  const removeSection = async (id) => {
    await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutateAsyncDelSec(id);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // sectionData?.map((data) => {
  //   console.log('dd', data)
  // })

  // console.log('d', sectionData)
  const deleteContent = async (id) => {
    return await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/pages/${pageId}/sections/${sectionData.id}/content/${id}/remove`,
        {
          data: {
            _id: `${id}`,
            // _method: 'delete'
          },
        }
      )
      .then(() => console.log(true))
      .catch((err) => err.message);
  };

  const { mutateAsync } = useMutation(deleteContent, {
    onSuccess: () => {
      queryClient.invalidateQueries("sections");
    },
  });

  const secId = sectionData.id;

  const updateSection = (data) => {
    return request({
      // headers: { 'Content-Type': 'application/json' },
      url: `/pages/${pageId}/sections/${secId}`,
      method: "post",
      data,
    });
  };

  const { mutateAsync: updateSections } = useMutation(updateSection, {
    onSuccess: (e) => {
      queryClient.invalidateQueries("sections");
      if (e.request.status === 200) {
        toast.success("Section has been updated", { position: "top-right" });
        dispatch(closeLoading());

        toggleEditSection();
      } else {
        toast.error("Section failed to update  ", { position: "top-right" });
        dispatch(closeLoading());
        toggleEditSection();
      }
    },
  });

  const onFormSubmit = async (data) => {
    dispatch(isReactLoading());
    await updateSections(data);
  };

  const onImgLoad = ({ target: img }) => {
    const { offsetHeight, offsetWidth } = img;
    console.log("onnn", offsetHeight, offsetWidth);
  };

  return (
    <>
      {/* {sectionData.map((data) => {
      console.log('card', data)
    })} */}
      <div
        key={sectionData.id}
        className="mt-2 rounded border shadow-lg bg-white cursor-move"
      >
        <div className="flex items-center bg-[#4191ff] px-4 py-2">
          <p className="font-semibold text-white">
            Section : {sectionData.name}
          </p>
          <div className="ml-auto flex gap-x-1">
            <Link
              to={`/admin/pages/${pageId}/sections/${sectionData.id}/content`}
              tooltip={`Edit section ${sectionData.name}`}
            >
              <div className="flex w-fit cursor-pointer items-center rounded border-2 border-white h-fit py-0.5 px-1 text-indigo-900 shadow  hover:text-white ">
                {/* <img src="/add.svg" alt="" className="mr-1 w-4" /> */}
                <div className="text-sm font-semibold">Go To Content</div>
              </div>
            </Link>
            {menuData.map((data) => {
              if (sectionData.collection_id && data.id == sectionData.id) {
                return (
                  <Menu
                    tooltip={`Menu ${data.name}`}
                    link={`/admin/menus/collection/${data.collection_id}`}
                    variant="bordered"
                  />
                );
              }
            })}
            <Edit
              onClick={toggleEditSection}
              bg="bg-[#F3F5F7]"
              variant="bordered"
              tooltip={`Edit section ${sectionData.name}`}
            />
            <Delete
              onClick={() => removeSection(sectionData.id)}
              tooltip={`Delete section ${sectionData.name}`}
              bg="bg-[#F3F5F7]"
              variant="bordered"
            />
            <div
              onClick={toggleCard}
              className="ml-2 text-xl font-bold text-white"
            >
              {isCardOpen ? (
                <FontAwesomeIcon icon="fas fa-minus" />
              ) : (
                <FontAwesomeIcon icon="fas fa-plus" />
              )}
            </div>
          </div>
        </div>

        <Collapse in={isEditSectionOpen}>
          <div className="m-4 relative overflow-hidden transition-all duration-700">
            <SectionForm
              defaultValues={sectionData}
              key={sectionData.id}
              onFormSubmit={onFormSubmit}
            />
          </div>
        </Collapse>
        <Collapse in={isCardOpen}>
          <div className="flex justify-center">
            {sectionData.media ? (
              <img
                onLoad={onImgLoad}
                src={`${process.env.REACT_APP_API_ASSET_URL}/uploads/images/${sectionData?.media}`}
                alt=""
                className=""
              />
            ) : (
              <img src="/yaplogofullblack.svg" alt="" className=" h-[20] " />
            )}
          </div>
        </Collapse>
      </div>
    </>
  );
}

