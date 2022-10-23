import { ArticardType } from "@/types/article";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticProps, NextPage } from "next";

const Articles: NextPage<{ articles: ArticardType[] }> = ({ articles }) => {
  return (
    <Layout pageIndex={0} alignItems="center">
      <Heading>Allticles!</Heading>
      <Text mb="3rem">All the articles!!</Text>
      <MasonryLayout>
        {articles.map((article, i) => (
          <Articard {...article} key={i} styles={{ mb: "2rem" }} />
        ))}
      </MasonryLayout>
    </Layout>
  );
};

export default Articles;

export const getStaticProps: GetStaticProps = async (context) => {
  const sample = {
    title: "Article",
    content: "We are the radish we do writing we write things weewoo",

    id: "slay",
    authors: [
      {
        name: "Dommy",
        id: "slay",
      },
    ],
    issue: {
      time: "June 2022",
      id: "slay",
    },
    topics: [
      {
        name: "slay",
        id: "slay",
      },
    ],
  };

  const articles = new Array(20).fill(sample);

  return {
    props: { articles },
  };
};