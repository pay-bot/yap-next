import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import TitlePage from "../../../../components/TitlePage";

import ContentWrapper from "../../../../components/layout/ContentWrapper";
import {
  closeLoading,
  isReactLoading,
} from "../../../../features/reactLoadingSlice";
import SectionWrapper from "../../../../components/layout/SectionWrapper";
import request from "../../../../utils/axios-utils";
import ProductForm from "../../../../components/form/shop/ProductForm";

export default function CreateProduct() {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // const fill = useSelector((state) => state.artCollection.isFill);

  const createProduct = (data) => {
    return request({
      url: `/shop/products`,
      method: "post",
      data,
      headers: { "Content-Type": "application/json" },
    });
  };

  const { mutateAsync } = useMutation(createProduct, {
    onSuccess: (e) => {
      queryClient.invalidateQueries("shopProducts");

      if (e.request.status === 200) {
        toast.success("Product has been created", { position: "top-right" });
        // fill.length > 0 ? navigate(-1) : navigate('/admin/news/articles');

        dispatch(closeLoading());
      } else {
        toast.error("Product failed to create  ", { position: "top-right" });
        dispatch(closeLoading());
      }
    },
  });

  // console.log('ini', request)

  const onSubmitProduct = async (data) => {
    dispatch(isReactLoading());
    await mutateAsync(data);
  };

  return (
    <>
      <SectionWrapper>
        {/* <ContentHeading
          title='Create Product'
        /> */}
        <ContentWrapper>
          <ProductForm onFormSubmit={onSubmitProduct} />
        </ContentWrapper>
      </SectionWrapper>
    </>
  );
}

