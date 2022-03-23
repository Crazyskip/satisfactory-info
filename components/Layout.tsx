import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <>
    <Navbar />
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
      {children}
    </Container>
  </>
);

export default Layout;
