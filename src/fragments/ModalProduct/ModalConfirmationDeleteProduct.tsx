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
  Tooltip,
} from "@nextui-org/react";
import { IconTrash } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { useDeleteProductMutation } from "@/redux/features/product/productApi";
import toast from "react-hot-toast";

export default function ModalDeleteProductForm({ id }: { id: number }) {
  const session = getCookie("access_token");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [deleteProduct, { isSuccess, error, isLoading }] =
    useDeleteProductMutation();

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct({ id, session });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product deleted successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <>
      <Tooltip color="danger" content="Delete product">
        <Button onPress={onOpen} isIconOnly size="sm" color="danger">
          <IconTrash />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pb-0">
                Delete a product
              </ModalHeader>

              <ModalBody>
                Are you sure you want to delete this product ?
              </ModalBody>

              <ModalFooter>
                <Button color="primary" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="danger"
                  isLoading={isLoading}
                  onPress={() => {
                    handleDeleteProduct(id);
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
