import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import ModalDeleteProductVariantForm from "./ModalConfirmationDeleteProductVariant";
import ModalEditProductVariantForm from "./ModalEditProductVariantForm";

export default function ModalDetail({ data }: { data: any }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      <Card shadow="sm" isPressable onPress={onOpen}>
        <CardBody className="overflow-visible p-0">
          <Image
            width="100%"
            alt={data.name}
            className="object-cover"
            src={data.image_location}
          />
        </CardBody>
        <CardFooter className="justify-between text-small">
          <b>{data.name}</b>
          <p className="text-default-500">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(data.price)}
          </p>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pb-0">
                {data.name}
              </ModalHeader>

              <ModalBody className="flex flex-row gap-2 ">
                <Image
                  width="140px"
                  alt={data.name}
                  className="h-[100px] object-cover"
                  src={data.image_location}
                />
                <div className="flex flex-col justify-center gap-2">
                  <p>code: {data.code}</p>
                  <p>quantity: {data.qty}</p>
                  <p>
                    price:
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(data.price)}
                  </p>
                </div>
              </ModalBody>

              <ModalFooter>
                <ModalEditProductVariantForm
                  initialValues={{
                    product_id: data.product_id,
                    name: data.name,
                    qty: data.qty,
                    price: data.price,
                    active: data.active,
                    image_location: data.image_location,
                  }}
                  id={data.id}
                />
                <ModalDeleteProductVariantForm
                  id={data.id}
                  handleCloseParent={onClose}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
