import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

interface NavLink {
  name: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Posts", href: "/posts" },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      <Container
        maxW={[
          "container.md",
          "container.lg",
          "container.lg",
          "container.lg",
          "container.xl",
        ]}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems={"center"} justifyContent={"space-between"} w="100%">
            <Text color={linkHoverColor} fontWeight={500} fontSize="xl">
              Satisfactory Info
            </Text>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
              color={linkColor}
              fontWeight={500}
              fontSize="lg"
            >
              {NAV_LINKS.map((link) => (
                <NextLink key={link.name} href={link.href} passHref>
                  <Link
                    rounded={"sm"}
                    px={4}
                    outline="0"
                    _hover={{
                      textDecoration: "none",
                      color: linkHoverColor,
                    }}
                  >
                    {link.name}
                  </Link>
                </NextLink>
              ))}
            </HStack>
          </Flex>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack
              as={"nav"}
              spacing={4}
              color={linkColor}
              fontWeight={500}
              fontSize="lg"
              border="none"
            >
              {NAV_LINKS.map((link) => (
                <NextLink key={link.name} href={link.href} passHref>
                  <Link
                    rounded={"sm"}
                    px={2}
                    onClick={isOpen ? onClose : () => {}}
                    _hover={{
                      textDecoration: "none",
                      color: linkHoverColor,
                    }}
                  >
                    {link.name}
                  </Link>
                </NextLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}
