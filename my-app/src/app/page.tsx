import NavBar from "~/components/navBar"
import MainSearch from "~/components/mainSearch"
import React from "react";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("./map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Map />
      <NavBar />
      <MainSearch />
    </div>
  );
}
