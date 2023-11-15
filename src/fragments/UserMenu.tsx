import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";

export default function UserMenu() {
  const router = useRouter();
  // const session = getCookie("access_token");
  // console.log(session);

  const handleLogout = () => {
    deleteCookie("access_token");
    deleteCookie("name");
    deleteCookie("username");
    deleteCookie("role");
    router.push("/login");
    // router.refresh();
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">zoey@example.com</p>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onPress={() => handleLogout()}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
