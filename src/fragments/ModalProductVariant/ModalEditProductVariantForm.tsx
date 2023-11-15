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
  Image,
} from "@nextui-org/react";
import { IconEdit } from "@tabler/icons-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getCookie } from "cookies-next";
import {
  useEditProductVariantMutation,
  useProductsQuery,
} from "@/redux/features/product/productApi";
import toast from "react-hot-toast";

const schema = Yup.object().shape({
  product_id: Yup.string(),
  name: Yup.string().required("Please enter variant name!"),
  qty: Yup.string().required("Please quantity"),
  price: Yup.string().required("Please price"),
  active: Yup.boolean().default(false),
  image_location: Yup.string(),
});

export default function ModalEditProductVariantForm({
  initialValues,
  id,
}: {
  initialValues: {
    product_id: number;
    name: string;
    qty: string;
    price: string;
    active: boolean;
    image_location: string;
  };
  id: number;
}) {
  const session = getCookie("access_token");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isLoading: isProductsLoading, data: productsData } = useProductsQuery(
    { session },
  );
  const products = productsData?.data;

  const [editProductVariant, { isSuccess, error }] =
    useEditProductVariantMutation();

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async ({
      product_id,
      name,
      qty,
      price,
      image_location,
      active,
    }) => {
      await editProductVariant({
        product_id,
        name,
        qty,
        price,
        active,
        image_location,
        id,
        session,
      });
    },
    onReset: () => {
      formik.resetForm({ values: formik.initialValues });
    },
  });

  const { values, handleChange, handleSubmit, handleReset, isSubmitting } =
    formik;

  const handleDigitsOnlyChange = (e: any) => {
    const inputValue = e.target.value;

    // Only allow digits in the field
    if (/^\d*$/.test(inputValue)) {
      formik.handleChange(e);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("ProductVariant edited successfully");
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
      <Button onPress={onOpen} color="primary">
        Edit
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pb-0">
                Edit variant
              </ModalHeader>

              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Select
                    isRequired
                    label="Product"
                    name="product_id"
                    placeholder="Select a product"
                    onChange={handleChange}
                    defaultSelectedKeys={[`${initialValues?.product_id}`]}
                  >
                    {products?.map((product: any) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </Select>

                  <div className="flex flex-col gap-2">
                    <Input
                      autoFocus
                      label="Name"
                      name="name"
                      placeholder="Enter variant name"
                      variant="bordered"
                      value={values.name}
                      onChange={handleChange}
                    />

                    <Input
                      autoFocus
                      label="Quantity"
                      name="qty"
                      placeholder="Enter quantity"
                      variant="bordered"
                      value={values.qty}
                      onChange={handleDigitsOnlyChange}
                    />

                    <Input
                      autoFocus
                      label="Price"
                      name="price"
                      placeholder="Enter price"
                      variant="bordered"
                      value={values.price}
                      onChange={handleDigitsOnlyChange}
                    />

                    <div className="flex items-start gap-2">
                      <Input
                        autoFocus
                        label="Image url"
                        name="image_location"
                        placeholder="Enter image url"
                        variant="bordered"
                        value={values.image_location}
                        onChange={handleChange}
                        className="w-full"
                      />

                      <div className="w-1/3">
                        <Image
                          src={values.image_location}
                          alt="Preview Image"
                          width="max-content"
                          className="max-w-[33.3%] border object-cover"
                          radius="none"
                        />
                      </div>
                    </div>

                    <Checkbox
                      name="active"
                      isSelected={values.active}
                      onChange={handleChange}
                    >
                      Set this variant active
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
