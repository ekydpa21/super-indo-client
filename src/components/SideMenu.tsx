import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function SideMenu({
  isLoading,
  listMenus,
}: {
  isLoading: boolean;
  listMenus: any[];
}) {
  return (
    <aside className="sticky top-20 h-[calc(100vh-80px)] w-60 bg-slate-300/50 p-4 backdrop-blur-sm">
      {isLoading ? (
        <div className="h-10 animate-pulse rounded bg-white/10 px-3 py-2 text-left">
          <h1>loading...</h1>
        </div>
      ) : (
        <div className="flex flex-col gap-2 overflow-hidden">
          {listMenus?.map((menu: any, index: number) => (
            <Link href={menu.url} key={index}>
              <button className="flex h-10 w-full items-center justify-start border-b border-[#a1a1aa] px-3 hover:scale-105 hover:bg-slate-300/60">
                {menu.name}
              </button>
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
}
