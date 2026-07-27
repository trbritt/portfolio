import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { getBlogPosts, type BlogPost } from "@/lib/blogPosts";

// Dynamically import the Portfolio component with SSR disabled
// This allows us to use browser-only features like window
const PortfolioDynamic = dynamic(() => import("@/components/Portfolio"), {
  ssr: false,
});

type HomeProps = {
  posts: BlogPost[];
};

const Home: NextPage<HomeProps> = ({ posts }) => {
  return <PortfolioDynamic posts={posts} />;
};

// Post metadata is read from blog/src/content/blog at build time, so the
// Notes tab needs no runtime fetch of blogs.tbritt.xyz.
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return { props: { posts: getBlogPosts() } };
};

export default Home;
