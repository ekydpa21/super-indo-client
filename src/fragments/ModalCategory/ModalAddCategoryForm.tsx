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
} from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getCookie } from "cookies-next";
import { useAddCategoryMutation } from "@/redux/features/category/categoryApi";
import toast from "react-hot-toast";

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter category name!"),
  active: Yup.boolean().default(false),
});

export default function ModalAddCategoryForm() {
  const session = getCookie("access_token");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [addCategory, { isSuccess, error }] = useAddCategoryMutation();

  const formik = useFormik({
    initialValues: { name: "", active: false },
    validationSchema: schema,
    onSubmit: async ({ name, active }) => {
      await addCategory({ name, active, session });
      formik.resetForm({ values: formik.initialValues });
    },
  });

  const { values, handleChange, handleSubmit, isSubmitting } = formik;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category added successfully");
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
      <Button
        onPress={onOpen}
        endContent={<IconPlus size={20} />}
        color="primary"
      >
        Add Category
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pb-0">
                Add a category
              </ModalHeader>

              <ModalBody>
                <form>
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
                      Set this category active
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
