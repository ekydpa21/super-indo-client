"use client";
import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Tooltip,
  SelectItem,
  Select,
} from "@nextui-org/react";
import { IconEdit } from "@tabler/icons-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getCookie } from "cookies-next";
import { useEditProductMutation } from "@/redux/features/product/productApi";
import toast from "react-hot-toast";
import { useCategoriesQuery } from "@/redux/features/category/categoryApi";

const schema = Yup.object().shape({
  product_category_id: Yup.string().required("product_category_id required!"),
  name: Yup.string().required("Please enter category name!"),
  active: Yup.boolean().default(false),
});

export default function ModalEditProductForm({
  initialValues,
  id,
}: {
  initialValues: { product_category_id: number; name: string; active: boolean };
  id: number;
}) {
  const session = getCookie("access_token");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isLoading: isCategoriesLoading, data: categoriesData } =
    useCategoriesQuery({ session });
  const categories = categoriesData?.data;

  const [editProduct, { isSuccess, error }] = useEditProductMutation();

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async ({ product_category_id, name, active }) => {
      await editProduct({ product_category_id, name, active, id, session });
    },
    onReset: () => {
      formik.resetForm({ values: formik.initialValues });
    },
  });

  const { values, handleChange, handleSubmit, handleReset, isSubmitting } =
    formik;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product edited successfully");
      onClose();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, onClose]);

  return (
    <>
      <Tooltip content="Edit product">
        <Button onPress={onOpen} color="primary" isIconOnly size="sm">
          <IconEdit />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pb-0">
                Edit a product
              </ModalHeader>

              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Select
                    isRequired
                    label="Category"
                    name="product_category_id"
                    placeholder="Select a category"
                    onChange={handleChange}
                    defaultSelectedKeys={[
                      `${initialValues?.product_category_id}`,
                    ]}
                  >
                    {categories?.map((category: any) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </Select>

                  <div className="flex flex-col gap-2">
                    <Input
                      autoFocus
                      label="Name"
                      name="name"
                      placeholder="Enter product name"
                      variant="bordered"
                      value={values.name}
                      onChange={handleChange}
                    />

                    <Checkbox
                      name="active"
                      isSelected={values.active}
                      onChange={handleChange}
                    >
                      Set this product active
                    </Checkbox>
                  </div>
                </form>

                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
