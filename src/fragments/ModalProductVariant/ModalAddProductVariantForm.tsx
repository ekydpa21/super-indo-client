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
  Image,
} from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import {
  useAddProductVariantMutation,
  useProductsQuery,
} from "@/redux/features/product/productApi";

const schema = Yup.object().shape({
  product_id: Yup.string(),
  name: Yup.string().required("Please enter variant name!"),
  qty: Yup.string().required("Please quantity"),
  price: Yup.string().required("Please price"),
  active: Yup.boolean().default(false),
  image_location: Yup.string(),
});

export default function ModalAddProductVariantForm() {
  const session = getCookie("access_token");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { data: productData } = useProductsQuery({ session });
  const products = productData?.data;

  const [addProductVariant, { isSuccess, error }] =
    useAddProductVariantMutation();

  const productId = useMemo(() => products?.[0]?.id, [products]);

  const formik = useFormik({
    initialValues: {
      product_id: productId,
      name: "",
      qty: "",
      price: "",
      active: false,
      image_location: "",
    },
    validationSchema: schema,
    onSubmit: async ({
      product_id,
      name,
      qty,
      price,
      image_location,
      active,
    }) => {
      const sentProductId = product_id || productId;
      const chosenProduct = products?.filter(
        (product: any) => product.id === +sentProductId,
      )?.[0];

      await addProductVariant({
        product_id: sentProductId,
        plu: chosenProduct?.plu,
        name,
        qty: +qty,
        price: +price,
        image_url: image_location,
        active,
        session,
      });
      formik.resetForm({ values: formik.initialValues });
    },
  });

  const { values, handleChange, handleSubmit, isSubmitting, errors } = formik;
  const handleDigitsOnlyChange = (e: any) => {
    const inputValue = e.target.value;

    // Only allow digits in the field
    if (/^\d*$/.test(inputValue)) {
      formik.handleChange(e);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("ProductVariant added successfully");
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
        color="success"
      >
        Add Variant
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pb-0">
                Add a Variant
              </ModalHeader>

              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Select
                    isRequired
                    label="Product"
                    name="product_id"
                    placeholder="Select a product"
                    onChange={handleChange}
                    defaultSelectedKeys={[`${productId}`]}
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
                      placeholder="Enter product name"
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
                      Set this productVariant active
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
