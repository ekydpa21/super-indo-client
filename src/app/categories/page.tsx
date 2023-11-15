"use client";
import Container from "@/fragments/Container";
import React from "react";
import ModalAddCategoryForm from "@/fragments/ModalCategory/ModalAddCategoryForm";
import { useCategoriesQuery } from "@/redux/features/category/categoryApi";
import { getCookie } from "cookies-next";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";

import ModalDeleteCategoryForm from "@/fragments/ModalCategory/ModalConfirmationDeleteCategory";
import ModalEditCategoryForm from "@/fragments/ModalCategory/ModalEditCategoryForm";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: any = {
  true: "success",
  false: "danger",
};

type Category = {
  id: number;
  name: string;
  active: boolean;
  created_user: string;
  created_date: string;
  updated_user: string;
  updated_date: string;
};

export default function Categories() {
  const session = getCookie("access_token");
  const { isLoading, data } = useCategoriesQuery({ session });
  const categories = data?.data;

  const renderCell = React.useCallback(
    (category: Category, columnKey: React.Key) => {
      const cellValue = category[columnKey as keyof Category];

      switch (columnKey) {
        case "name":
          return <div className="flex flex-col">{category.name}</div>;

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
        case "actions":
          return (
            <div className="relative flex justify-end gap-2">
              <ModalEditCategoryForm
                initialValues={{ name: category.name, active: category.active }}
                id={category.id}
              />
              <ModalDeleteCategoryForm id={category.id} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <Container>
      <div className="mb-6 w-full items-center justify-between text-sm lg:flex">
        <h1 className="text-3xl font-bold">Categories</h1>

        <ModalAddCategoryForm />
      </div>

      <div>
        <Table
          aria-label="Table categories"
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
            items={categories ?? []}
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
      </div>
    </Container>
  );
}
