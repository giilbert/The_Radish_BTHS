import { Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import ExecStamp from "@components/shared/exec-stamp";
import Card from "./card";

interface PersonCardProps extends FlexProps {
  isExec?: boolean;
  name: string;
  title: string;
  description: string;
  id: string;
  image?: string;
}

const PersonCard: React.FC<PersonCardProps> = ({
  isExec = false,
  name,
  title,
  description,
  id,
  image = "",
  ...rest
}) => {
  return (
    <Card
      link={`/${isExec ? "execs" : "authors"}/${id}`}
      pb="0.6rem"
      image={image}
      w={{ base: "94vw", sm: "70vw", md: "40vw", lg: "25vw" }}
      {...rest}>
      <Flex justifyContent="space-between" w="100%" alignItems="center">
        <Flex flexDir="column">
          <Heading w="100%" fontSize="1.5rem" mb="0.5rem">
            {name}
          </Heading>
          <Text fontWeight="bold" fontStyle="italic" w="100%" mt="-0.2rem">
            {title}
          </Text>
        </Flex>
        {isExec && <ExecStamp id={id} size={60} />}
      </Flex>

      <Text w="100%" textAlign="center" mt="1rem" fontWeight="medium">
        {description}
      </Text>
    </Card>
  );
};

export default PersonCard;