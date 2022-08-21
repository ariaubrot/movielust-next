import React from "react";
import Footer from "./UI/Footer";
import Header from "./UI/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header isOnline />
      <main className="layout__main">{children}</main>
      <Footer />
    </>
  );
}
