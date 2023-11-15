"use client";
import Container from "@/fragments/Container";
import React from "react";
import ModalAddProductForm from "@/fragments/ModalProduct/ModalAddProductForm";
import { Products as ProductTable } from "@/features/Products";
import { Tab, Tabs } from "@nextui-org/react";
import ModalAddProductVariantForm from "@/fragments/ModalProductVariant/ModalAddProductVariantForm";
import { ProductVariants } from "@/features/ProductVariants";

export default function Products() {
  const tabs = [
    {
      id: "products",
      label: "Products",
      content: <ProductTable />,
    },
    {
      id: "variants",
      label: "Variants",
      content: <ProductVariants />,
    },
  ];

  return (
    <Container>
      <div className="mb-6 w-full items-center justify-between text-sm lg:flex">
        <h1 className="text-3xl font-bold">Products</h1>

        <div className="flex gap-2">
          <ModalAddProductForm />
          <ModalAddProductVariantForm />
        </div>
      </div>

      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {item.content}
          </Tab>
        )}
      </Tabs>
    </Container>
  );
}
