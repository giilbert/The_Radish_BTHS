import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  ...rest
}) => {
  return (
    <ChakraButton
      variant="outline"
      padding="1rem"
      fontSize="1.25rem"
      borderRadius="0.5rem"
      {...rest}>
      {children}
    </ChakraButton>
  );
};

export default Button;