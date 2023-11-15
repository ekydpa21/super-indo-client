"use client";
import { useProductVariantsQuery } from "@/redux/features/product/productApi";
import {
  Button,
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
import { useCallback, useEffect } from "react";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { useAddCartMutation } from "@/redux/features/cart/cartApi";
import toast from "react-hot-toast";
import { useTransactionsQuery } from "@/redux/features/transaction/transactionApi";

const columns = [
  { name: "TRANSACTION NO", uid: "transaction_no" },
  { name: "CUSTOMER", uid: "created_user" },
  { name: "TOTAL AMOUNT", uid: "total_amount" },
  { name: "STATUS", uid: "status" },
];

const statusColorMap: any = {
  true: "success",
  false: "danger",
};

type Category = {
  id: number;
  transaction_no: string;
  total_amount: number;
  active: boolean;
  created_user: string;
  created_date: string;
  updated_user: string;
  updated_date: string;
};

export default function ListTransactionForAdmin() {
  const session = getCookie("access_token");
  const { isLoading, data } = useTransactionsQuery({ session });
  const transactions = data?.data;

  const renderCell = useCallback((category: Category, columnKey: React.Key) => {
    const cellValue = category[columnKey as keyof Category];

    switch (columnKey) {
      case "transaction_no":
        return <div className="flex flex-col">{category.transaction_no}</div>;
      case "created_user":
        return <div className="">{category.created_user}</div>;

      case "total_amount":
        return (
          <div className="flex justify-center">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(category.total_amount)}
          </div>
        );
      case "status":
        return (
          <div className="flex justify-center">
            <Chip
              className="capitalize"
              color={statusColorMap[`${category.active}`]}
              size="sm"
              variant="flat"
            >
              {category.active ? "active" : "inactive"}
            </Chip>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Table transactions"
      classNames={{
        wrapper: isLoading ? "h-60 overflow-hidden" : "h-max",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} className={"text-center"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={transactions ?? []}
        loadingContent={
          <div className="flex h-60 animate-pulse items-center">
            <p>Loading...</p>
          </div>
        }
        loadingState={isLoading ? "loading" : "idle"}
      >
        {(category: any) => (
          <TableRow key={category.id}>
            {(columnKey: any) => (
              <TableCell>{renderCell(category, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
