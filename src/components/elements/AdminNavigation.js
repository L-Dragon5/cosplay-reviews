import { Link } from '@chakra-ui/next-js';
import { Flex, Spacer, useColorModeValue, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

const links = [
  {
    label: 'Reviewable People',
    href: '/admin/people',
  },
  {
    label: 'Reviews',
    href: '/admin/reviews/',
  },
];

const NavLink = ({ href, children }) => (
  <Link
    px={2}
    py={1}
    display="flex"
    w="100%"
    h={16}
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    textAlign="center"
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('orange.400', 'orange.700'),
    }}
    href={href}
  >
    {children}
  </Link>
);

const Navigation = () => {
  const { data: session } = useSession();

  return (
    <Flex
      bg={useColorModeValue('orange.300', 'orange.900')}
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack as="nav" spacing={4} h="100%">
        {links.map((link) => (
          <NavLink key={link.label} href={link.href}>
            {link.label}
          </NavLink>
        ))}
        <Spacer />
        <NavLink href="/">Back to Home</NavLink>
      </VStack>
    </Flex>
  );
};

export default Navigation;
