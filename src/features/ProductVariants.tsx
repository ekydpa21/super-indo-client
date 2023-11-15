import ModalDeleteProductForm from "@/fragments/ModalProduct/ModalConfirmationDeleteProduct";
import ModalEditProductForm from "@/fragments/ModalProduct/ModalEditProductForm";
import ModalDeleteProductVariantForm from "@/fragments/ModalProductVariant/ModalConfirmationDeleteProductVariant";
import ModalDetail from "@/fragments/ModalProductVariant/ModalDetail";
import ModalEditProductVariantForm from "@/fragments/ModalProductVariant/ModalEditProductVariantForm";
import {
  useProductVariantsQuery,
  useProductsQuery,
} from "@/redux/features/product/productApi";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { getCookie } from "cookies-next";
import React from "react";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: any = {
  true: "success",
  false: "danger",
};

type ProductVariant = {
  id: number;
  product_id: number;
  code: string;
  name: string;
  qty: number;
  price: number;
  active: boolean;
  created_user: string;
  created_date: string;
  updated_user: string;
  updated_date: string;
};

export const ProductVariants = () => {
  const session = getCookie("access_token");

  const { isLoading, data } = useProductVariantsQuery({ session });
  const productVariants = data?.data;

  return (
    <div className=" grid-cols-4 gap-4" style={{ display: "grid" }}>
      {productVariants?.map((item: any, index: number) => (
        <ModalDetail data={item} key={index} />
      ))}
    </div>
  );
};
