import ModalDeleteProductForm from "@/fragments/ModalProduct/ModalConfirmationDeleteProduct";
import ModalEditProductForm from "@/fragments/ModalProduct/ModalEditProductForm";
import { useProductsQuery } from "@/redux/features/product/productApi";
import {
  Chip,
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

type Product = {
  id: number;
  product_category_id: number;
  plu: string;
  name: string;
  active: boolean;
  created_user: string;
  created_date: string;
  updated_user: string;
  updated_date: string;
};

export const Products = () => {
  const session = getCookie("access_token");

  const { isLoading, data } = useProductsQuery({ session });
  const products = data?.data;

  const renderCell = React.useCallback(
    (product: Product, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof Product];

      switch (columnKey) {
        case "name":
          return <div className="flex flex-col">{product.name}</div>;

        case "status":
          return (
            <div className="flex justify-center">
              <Chip
                className="capitalize"
                color={statusColorMap[`${product.active}`]}
                size="sm"
                variant="flat"
              >
                {product.active ? "active" : "inactive"}
              </Chip>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex justify-end gap-2">
              <ModalEditProductForm
                initialValues={{
                  product_category_id: product.product_category_id,
                  name: product.name,
                  active: product.active,
                }}
                id={product.id}
              />
              <ModalDeleteProductForm id={product.id} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <Table
      aria-label="Table products"
      classNames={{
        wrapper: isLoading ? "h-60 overflow-hidden" : "h-max",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            className={`${
              column.uid === "actions" ? "text-end" : "text-center"
            }`}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={products ?? []}
        loadingContent={
          <div className="flex h-60 animate-pulse items-center">
            <p>Loading...</p>
          </div>
        }
        loadingState={isLoading ? "loading" : "idle"}
      >
        {(product: any) => (
          <TableRow key={product.id}>
            {(columnKey: any) => (
              <TableCell>{renderCell(product, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
