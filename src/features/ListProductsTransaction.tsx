"use client";
import { useProductVariantsQuery } from "@/redux/features/product/productApi";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { useAddCartMutation } from "@/redux/features/cart/cartApi";
import toast from "react-hot-toast";

export default function ListProductsTransaction() {
  const session = getCookie("access_token");

  const { _, data } = useProductVariantsQuery({ session });
  const productVariants = data?.data;
  const [addCart, { isSuccess, error }] = useAddCartMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Item added to cart successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className=" grid-cols-4 gap-4" style={{ display: "grid" }}>
      {productVariants?.map((item: any, index: number) => (
        <Card shadow="sm" key={index}>
          <CardBody className="overflow-visible p-0">
            <Image
              width="100%"
              alt={item.name}
              className="object-cover"
              src={item.image_location}
            />
          </CardBody>
          <CardFooter className="flex-col justify-between gap-2 text-small">
            <div className="flex w-full justify-between">
              <b>{item.name}</b>
              <p className="text-default-500">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(item.price)}
              </p>
            </div>
            <Button
              className="w-full"
              endContent={<IconShoppingCartPlus />}
              onPress={() =>
                addCart({
                  product_variant_id: item.id,
                  session,
                })
              }
            >
              Add to cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
    // <ProductVariants />
  );
}
