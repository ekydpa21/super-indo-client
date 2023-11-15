"use client";
import React, { ReactNode, useEffect } from "react";
import SideMenu from "../components/SideMenu";
import { useMenuQuery } from "@/redux/features/menu/menuApi";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

export default function Container({
  withSideMenu = true,
  children,
}: {
  withSideMenu?: boolean;
  children: ReactNode;
}) {
  const session = getCookie("access_token");
  const { isLoading, data } = useMenuQuery({ session });
  const listMenu = data?.data;

  useEffect(() => {
    if (!session) {
      redirect("/login");
    }
  }, [session]);

  return (
    <main className="mx-auto flex max-w-screen-2xl xl:mx-auto">
      {withSideMenu ? (
        <SideMenu isLoading={isLoading} listMenus={listMenu} />
      ) : null}

      <section className="flex min-h-[calc(100vh-80px)] w-full flex-col gap-6 p-6">
        {children}
      </section>
    </main>
  );
}
