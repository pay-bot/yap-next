import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import SortableTree from "@nosferatu500/react-sortable-tree";
import { useAddMenuData, useMenuData } from "../../../hooks/useMenusData";
import TitlePage from "../../../components/TitlePage";
import SectionWrapper from "../../../components/layout/SectionWrapper";
import ContentHeading from "../../../components/layout/ContentHeading";
import Add from "../../../components/button/Add";
import AddMenuModal from "../../../components/modal/AddMenuModal";
import { closeModal, openModal } from "../../../features/modal/modalSlice";
import MenuForm from "../../../components/form/menu/Form";
import request from "../../../utils/axios-utils";
import ModalWrapper from "../../../components/modal/ModalWrapper";
import {
  closeLoading,
  isReactLoading,
} from "../../../features/reactLoadingSlice";

function MenuCollection() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data: menus } = useMenuData();

  console.log(menus?.data);

  const dataModal = useSelector((state) => state.modal);

  const { id } = dataModal;

  const createMenu = (data) => {
    return request({
      url: `/menus`,
      method: "post",
      data,
    });
  };

  const { mutate: addMenu } = useAddMenuData();

  const { mutateAsync } = useMutation(createMenu, {
    onSuccess: (e) => {
      queryClient.invalidateQueries("menus");
      if (e.request.status === 200) {
        toast.success("Menu Child has been created", { position: "top-right" });
        // dispatch(closeModal())
      } else {
        toast.error("Menu Child failed to create  ", { position: "top-right" });
        // dispatch(closeModal())
      }
    },
  });

  const onSubmitMenu = async (data) => {
    dispatch(isReactLoading());
    await addMenu(data);
    dispatch(closeLoading());
    dispatch(closeModal());
  };

  const updateMenu = (data) => {
    return request({
      url: `/menus/${id}`,
      method: "post",
      data,
    });
  };

  const { mutateAsync: mutateUpdate } = useMutation(updateMenu, {
    onSuccess: (e) => {
      queryClient.invalidateQueries("menus");

      if (e.request.status === 200) {
        toast.success("Menu has been updated", { position: "top-right" });
        // dispatch(closeModal());
      } else {
        toast.error("Menu failed to update  ", { position: "top-right" });
        // dispatch(closeModal());
      }
    },
  });

  const onUpdateMenus = async (data) => {
    dispatch(isReactLoading());
    await mutateUpdate(data);
    dispatch(closeLoading());
    dispatch(closeModal());
  };
  const treeData = [
    { title: "Chicken", children: [{ title: "Egg" }] },
    { title: "Fish", children: [{ title: "fingerline" }] },
  ];

  function generateNprops(node) {
    const html = (
      <div title={node.title} className="">
        <span className="float-left">{node.title}</span>
      </div>
    );
    return html;
  }

  return (
    <SectionWrapper>
      <ContentHeading>
        <Add
          onClick={() =>
            dispatch(openModal({ componentName: "AddMenu", id: null }))
          }
          title="Create Menu"
        />
      </ContentHeading>
      <AddMenuModal />
      <ModalWrapper componentName="AddChildMenu" modalid={dataModal.id}>
        <MenuForm
          // defaultValues={data}
          // key={data.id}
          data={menus?.data}
          onFormSubmit={onSubmitMenu}
        />
      </ModalWrapper>

      <ModalWrapper componentName="EditMenu" modalid={dataModal.id}>
        {menus?.data?.map((data) => {
          if (data.id === dataModal.id) {
            console.log("men", data);
            return (
              <MenuForm
                defaultValues={data}
                key={data.id}
                onFormSubmit={onUpdateMenus}
              />
            );
          }
          return null;
        })}
      </ModalWrapper>

      <section className="w-full">
        <div style={{ height: 400 }}>
          <SortableTree
            treeData={treeData}
            // slideRegionSize={0}
            onChange={(tree) => console.log(tree)}
            generateNodeProps={({ node }) => ({ title: generateNprops(node) })}
          />
        </div>
        {/* {menus?.data?.map((route, index) => {
              if (route.parent_id === 0 && route.collection_id == collectionId) {
                return <MenuCard key={index} setIsOpen={sidebar} route={route} showAnimation={showAnimation} isOpen={sidebar} />;
              }
            })} */}
      </section>
    </SectionWrapper>
  );
}

export default MenuCollection;

