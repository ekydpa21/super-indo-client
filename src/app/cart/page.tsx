"use client";
import Container from "@/fragments/Container";
import { useEffect, useMemo } from "react";
import { getCookie } from "cookies-next";
import {
  useAddQuantityMutation,
  useCartsQuery,
  useCheckoutMutation,
  useDeleteCartMutation,
  useReduceQuantityMutation,
} from "@/redux/features/cart/cartApi";
import { Button, Image } from "@nextui-org/react";
import {
  IconMinus,
  IconPlus,
  IconShoppingCartCheck,
  IconShoppingCartCopy,
  IconTrash,
} from "@tabler/icons-react";
import toast from "react-hot-toast";

export default function Cart() {
  const session = getCookie("access_token");
  const { isLoading, data } = useCartsQuery({ session });
  const carts = data?.data;
  const [
    addQuantity,
    {
      isSuccess: addQuantityIsSuccess,
      error: addQuantityError,
      data: addQuantityData,
    },
  ] = useAddQuantityMutation();
  const [
    reduceQuantity,
    {
      isSuccess: reduceQuantityIsSuccess,
      error: reduceQuantityError,
      data: reduceQuantityData,
    },
  ] = useReduceQuantityMutation();

  const [
    deleteCart,
    {
      isSuccess: deleteCartIsSuccess,
      error: deleteCartError,
      data: deleteCartData,
    },
  ] = useDeleteCartMutation();

  const [
    checkout,
    { isSuccess: checkoutIsSuccess, error: checkoutError, data: checkoutData },
  ] = useCheckoutMutation();

  useEffect(() => {
    if (addQuantityIsSuccess) {
      toast.success(addQuantityData?.message);
    }
    if (addQuantityError) {
      if ("data" in addQuantityError) {
        const errorData = addQuantityError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [addQuantityIsSuccess, addQuantityError, addQuantityData]);

  useEffect(() => {
    if (reduceQuantityIsSuccess) {
      toast.success(reduceQuantityData?.message);
    }
    if (reduceQuantityError) {
      if ("data" in reduceQuantityError) {
        const errorData = reduceQuantityError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [reduceQuantityIsSuccess, reduceQuantityError, reduceQuantityData]);

  useEffect(() => {
    if (deleteCartIsSuccess) {
      toast.success(deleteCartData?.message);
    }
    if (deleteCartError) {
      if ("data" in deleteCartError) {
        const errorData = deleteCartError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [deleteCartIsSuccess, deleteCartError, deleteCartData]);

  useEffect(() => {
    if (checkoutIsSuccess) {
      toast.success(checkoutData?.message);
    }
    if (checkoutError) {
      if ("data" in checkoutError) {
        const errorData = checkoutError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [checkoutIsSuccess, checkoutError, checkoutData]);

  const totalTransaction = useMemo(() => {
    const total = carts?.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator +
        currentValue?.quantity * currentValue?.ProductVariant?.price,
      0,
    );

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(total || 0);
  }, [carts]);

  return (
    <Container withSideMenu={false}>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 ">
        <div className="flex gap-8">
          <div className="w-[65%]">
            {!!carts?.length ? (
              <>
                {carts?.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item?.ProductVariant?.image_url}
                        alt="Product Image"
                        width="140px"
                      />
                      <p className="text-xl font-bold">
                        {item?.ProductVariant?.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                        isIconOnly
                        radius="full"
                        size="sm"
                        onPress={() => {
                          reduceQuantity({ id: item?.id, session });
                        }}
                      >
                        <IconMinus />
                      </Button>
                      <p className="text-2xl font-bold">{item?.quantity}</p>
                      <Button
                        isIconOnly
                        radius="full"
                        size="sm"
                        onPress={() => {
                          addQuantity({ id: item?.id, session });
                        }}
                      >
                        <IconPlus />
                      </Button>
                    </div>

                    <div>
                      <p className="text-xl font-semibold">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(item?.quantity * item?.ProductVariant?.price)}
                      </p>
                    </div>

                    <Button
                      isIconOnly
                      color="danger"
                      onPress={() => {
                        deleteCart({ id: item?.id, session });
                      }}
                    >
                      <IconTrash />
                    </Button>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-center text-2xl font-semibold">
                This cart is empty
              </p>
            )}
          </div>
          <div className="flex h-max w-[35%] flex-col justify-between gap-10 rounded-lg border p-4 shadow-md">
            <div className="flex justify-between">
              <p className="text-2xl font-semibold">Total</p>
              <p className="text-2xl font-bold">{totalTransaction}</p>
            </div>

            <Button
              endContent={<IconShoppingCartCheck />}
              color="primary"
              onPress={() =>
                checkout({
                  data: {},
                  session,
                })
              }
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
