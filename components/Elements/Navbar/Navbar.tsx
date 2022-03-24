import {
  Box,
  Flex,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Container,
  Center,
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

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={"orange.400"}>
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
            <Text color="gray.900" fontWeight={500} fontSize="xl">
              Satisfactory Info
            </Text>
            <Flex
              as={"nav"}
              display={{ base: "none", md: "flex" }}
              color="gray.900"
              fontWeight={500}
              fontSize="lg"
            >
              {NAV_LINKS.map((link) => (
                <NextLink key={link.name} href={link.href} passHref>
                  <Link
                    px={6}
                    h={16}
                    m={0}
                    _hover={{
                      bg: "gray.700",
                      color: "white",
                    }}
                    _focus={{
                      boxShadow: "none",
                    }}
                  >
                    <Center h="64px">{link.name}</Center>
                  </Link>
                </NextLink>
              ))}
            </Flex>
          </Flex>
          <IconButton
            size="md"
            bg={useColorModeValue("orange.400", "orange.900")}
            _hover={{
              textDecoration: "none",
              bg: "gray.700",
              color: "white",
            }}
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
              color="gray.900"
              fontWeight={500}
              fontSize="lg"
              border="none"
            >
              {NAV_LINKS.map((link) => (
                <NextLink key={link.name} href={link.href} passHref>
                  <Link
                    rounded={"sm"}
                    py={2}
                    px={4}
                    onClick={isOpen ? onClose : () => {}}
                    _hover={{
                      bg: "gray.700",
                      color: "white",
                    }}
                    _focus={{
                      boxShadow: "none",
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
};

export default Navbar;
