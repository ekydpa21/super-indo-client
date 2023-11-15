"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UserMenu from "@/fragments/UserMenu";
import { IconShoppingCart, IconTrolley } from "@tabler/icons-react";
import { Button, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useMenuQuery } from "@/redux/features/menu/menuApi";

export default function Header() {
  const session = getCookie("access_token");
  const { data } = useMenuQuery({ session });
  const listMenu = data?.data;

  const [showAvatar, setShowAvatar] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const name = getCookie("name");
  const username = getCookie("username");
  const role = getCookie("role");

  useEffect(() => {
    if (
      !!session?.length ||
      !!name?.length ||
      !!username?.length ||
      !!role?.length
    ) {
      if (role === "customer") {
        setShowCart(true);
      }
      setShowAvatar(true);
    } else {
      setShowAvatar(false);
      setShowCart(false);
    }
  }, [session, name, username, role]);

  return (
    <header className="sticky top-0 z-50 h-[80px] bg-slate-300/30 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between p-12 xl:mx-auto xl:p-0">
        <Link href={listMenu?.[0]?.url || ""}>
          <Image
            className="relative"
            src="/logo.svg"
            alt="Lion Super Indo Logo"
            width={60}
            height={60}
            priority
          />
        </Link>

        <div className="flex gap-4">
          {showCart ? (
            <Tooltip content="cart">
              <Button as={Link} href="/cart" isIconOnly variant="light">
                <IconShoppingCart />
              </Button>
            </Tooltip>
          ) : null}

          {showAvatar ? <UserMenu /> : null}
        </div>
      </div>
    </header>
  );
}
