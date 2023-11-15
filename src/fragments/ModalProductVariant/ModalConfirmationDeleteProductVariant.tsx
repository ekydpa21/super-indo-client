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
import { getCookie } from "cookies-next";
import { useDeleteProductVariantMutation } from "@/redux/features/product/productApi";
import toast from "react-hot-toast";

export default function ModalDeleteProductVariantForm({
  id,
  handleCloseParent,
}: {
  id: number;
  handleCloseParent: () => void;
}) {
  const session = getCookie("access_token");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [deleteProductVariant, { isSuccess, error, isLoading }] =
    useDeleteProductVariantMutation();

  const handleDeleteProductVariant = async (id: number) => {
    await deleteProductVariant({ id, session });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("ProductVariant deleted successfully");
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
      <Button onPress={onOpen} color="danger">
        Delete
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pb-0">
                Delete a variant
              </ModalHeader>

              <ModalBody>
                Are you sure you want to delete this variant ?
              </ModalBody>

              <ModalFooter>
                <Button color="primary" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="danger"
                  isLoading={isLoading}
                  onPress={async () => {
                    await handleDeleteProductVariant(id);
                    onClose();
                    handleCloseParent();
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
