import {
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import IssueCard from "@components/cards/issue-card";
import Button from "@components/shared/button";
import Link from "@components/shared/link";
import { AiOutlineArrowRight } from "react-icons/ai";

interface ILatestProps {
  issueTime: string;
  description: string;
  cover: string;
}

const Item: React.FC = () => (
  <Articard
    title="Lead Poisoning"
    content="I think you should do it. I think that you should do the thing you have been watiting your whole life to do. Do it! Now! Or else! Grrrrrrrr. ANyway I think I'm just stretching this whole thing out weewoo"
    tags={[
      { name: "Satire", id: "wee", description: "wooo", articles: [] },
      { name: "Satire", id: "wee", description: "wooo", articles: [] },
    ]}
    issue={{
      time: "June 2022",
      id: "abcd",
      cover: "/images/june-2022.webp",
      description: "slay gay",
      articles: [],
    }}
    authors={[
      {
        name: "Dommy",
        title: "writer",
        gradYear: 2024,
        articles: [],
        id: "abcd",
        isExec: false,
      },
    ]}
    id="abcd"
    flex={1}
  />
);

const LatestSection: React.FC<ILatestProps> = ({
  issueTime,
  description,
  cover,
}) => {
  const numArticles = useBreakpointValue({ base: 3, md: 2, xl: 3 });

  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading fontSize="2rem" textAlign="center">
        Latest & Greatest:{" "}
        <span style={{ fontWeight: "normal" }}>
          Our newest issue is ready for consumption!
        </span>
      </Heading>

      <Flex
        gap="1rem"
        mt="2rem"
        flexDir={{ base: "column", md: "row" }}
        alignItems="center">
        <Flex flexDir="column" h="100%">
          {" "}
          <IssueCard
            cover={cover}
            description={description}
            issueTime={issueTime}
            id="abcd"
            outerStyles={{ flex: 1 }}
          />
        </Flex>

        <SimpleGrid
          templateColumns="auto"
          templateRows={`repeat(${numArticles}, auto)`}
          autoFlow="row"
          gap="2rem"
          pl={{ base: "0", md: "1rem" }}
          h="100%">
          {Array(numArticles)
            .fill(0)
            .map((_, i) => (
              <Item key={i} />
            ))}
        </SimpleGrid>
      </Flex>
      <Link as={Button} href="/issues" mt="2.5rem">
        <Text mr="0.5rem">All Issues!</Text> <AiOutlineArrowRight />
      </Link>
    </Flex>
  );
};

export default LatestSection;