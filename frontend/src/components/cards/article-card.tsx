import ArticleType from "@/types/article";
import IssueType from "@/types/issue";
import PersonType from "@/types/person";
import TopicType from "@/types/topic";
import { Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import Link from "@components/shared/link";
import Card from "./card";
import CardTag from "./card-tag";

interface CardProps extends FlexProps, ArticleType {
  title: string;
  id: string;
  outerStyles?: FlexProps;
}

const prune = (text: string, n: number = 90) =>
  text[n] == " " || text.length < n
    ? text.slice(0, n)
    : text.slice(0, n).slice(0, text.slice(0, n).lastIndexOf(" "));

const ArticleCard: React.FC<CardProps> = ({
  title,
  content,
  issue,
  authors,
  id,
  outerStyles,
  tags = [],
  ...rest
}) => {
  return (
    <Card
      link=""
      tags={tags}
      outerStyles={{ ...outerStyles, justifyContent: "flex-start" }}
      justifyContent="flex-start"
      {...rest}>
      <Link href={`/articles/${id}`} w="100%">
        <Heading maxW="100%" fontSize="1.5rem" mb="0.5rem">
          {title}
        </Heading>
        <Text
          fontSize="1.1rem"
          wordBreak="break-word"
          textAlign="left"
          w="75%"
          ml="2.5%">
          {prune(content)}...
        </Text>
      </Link>
      <Flex fontSize="0.9rem" w="100%" mt="0.5rem">
        {authors?.map((author, i) => (
          <Link
            key={i}
            href={`/${author.isExec ? "execs" : "people"}/${author.id}`}
            mr="0.2rem">
            {author.name}
          </Link>
        ))}

        <Text fontWeight="bold" mx="0.2rem">
          {" "}
          ∙{" "}
        </Text>
        <Link href={`/issues/${issue.id}`}>{issue.time}</Link>
      </Flex>
    </Card>
  );
};

export default ArticleCard;
