import type { NextPage } from "next";
import dynamic from "next/dynamic";

// Dynamically import the Portfolio component with SSR disabled
// This allows us to use browser-only features like window
const PortfolioDynamic = dynamic(() => import("@/components/Portfolio"), {
  ssr: false,
});

const Home: NextPage = () => {
  return <PortfolioDynamic />;
};

export default Home;
