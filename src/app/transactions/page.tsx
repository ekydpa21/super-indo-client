"use client";
import ListProductsTransaction from "@/features/ListProductsTransaction";
import ListTransactionForAdmin from "@/features/ListTransactionForAdmin";
import Container from "@/fragments/Container";
import { useTransactionsQuery } from "@/redux/features/transaction/transactionApi";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Transactions() {
  const name = getCookie("name");
  const username = getCookie("username");
  const roleCookie = getCookie("role");
  const [isAdmin, setIsAdmin] = useState(false);
  const { role } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (
      !!name?.length ||
      !!username?.length ||
      !!roleCookie?.length ||
      !!role?.length
    ) {
      if (roleCookie === "administrator" || role === "administrator") {
        setIsAdmin(true);
      }
    } else {
      setIsAdmin(false);
    }
  }, [name, username, roleCookie, role]);

  return (
    <Container>
      {isAdmin ? <ListTransactionForAdmin /> : <ListProductsTransaction />}
    </Container>
  );
}
