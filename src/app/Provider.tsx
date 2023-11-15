"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface IProviderProps {
  children: ReactNode;
}

export default function Providers({ children }: IProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
