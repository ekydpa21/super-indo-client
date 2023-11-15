"use client";
import React, { useEffect, useMemo } from "react";
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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getCookie } from "cookies-next";
import {
  useAddCategoryMutation,
  useCategoriesQuery,
} from "@/redux/features/category/categoryApi";
import toast from "react-hot-toast";
import { useAddProductMutation } from "@/redux/features/product/productApi";

const schema = Yup.object().shape({
  product_category_id: Yup.string(),
  name: Yup.string().required("Please enter category name!"),
  active: Yup.boolean().default(false),
});

export default function ModalAddProductForm() {
  const session = getCookie("access_token");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { isLoading: isCategoriesLoading, data: categoriesData } =
    useCategoriesQuery({ session });
  const categories = categoriesData?.data;

  const [addProduct, { isSuccess, error }] = useAddProductMutation();

  const categoryId = useMemo(() => categories?.[0]?.id, [categories]);

  const formik = useFormik({
    initialValues: {
      product_category_id: categoryId,
      name: "",
      active: false,
    },
    validationSchema: schema,
    onSubmit: async ({ product_category_id, name, active }) => {
      await addProduct({
        product_category_id: product_category_id || categoryId,
        name,
        active,
        session,
      });
      formik.resetForm({ values: formik.initialValues });
    },
  });

  const { values, handleChange, handleSubmit, isSubmitting, errors } = formik;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product added successfully");
      onClose();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, onClose]);

  useEffect(() => {
    if (errors) {
      if (!!Object.values(errors)?.length) {
        toast.error(Object.values(errors)[0] as string);
      }
    }
  }, [errors]);

  return (
    <>
      <Button
        onPress={onOpen}
        endContent={<IconPlus size={20} />}
        color="primary"
      >
        Add Product
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pb-0">
                Add a product
              </ModalHeader>

              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Select
                    isRequired
                    label="Category"
                    name="product_category_id"
                    placeholder="Select a category"
                    onChange={handleChange}
                    defaultSelectedKeys={[`${categoryId}`]}
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
                      placeholder="Enter category name"
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
