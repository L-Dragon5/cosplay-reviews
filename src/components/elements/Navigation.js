import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const links = [
  {
    label: 'Reviews',
    href: '/reviews/',
  },
];

const NavLink = ({ href, children }) => (
  <Link
    px={2}
    py={1}
    rounded="md"
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('purple.400', 'purple.700'),
    }}
    href={href}
  >
    {children}
  </Link>
);

const Navigation = () => {
  const { data: session, status } = useSession();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue('purple.300', 'purple.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Link href="/" _hover={{ textDecoration: 'none' }}>
            Logo
          </Link>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            {links.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </HStack>
        </HStack>

        <Spacer />

        {session ? (
          <Flex alignItems="center">
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Avatar
                  size="sm"
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Theme Settings</MenuItem>
                <MenuDivider />
                <MenuItem onClick={signOut}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <Button as={NextLink} href="/api/auth/signin" colorScheme="purple">
            Log in
          </Button>
        )}

        <IconButton
          aria-label="Color mode switcher"
          onClick={toggleColorMode}
          colorScheme="purple"
          ml={2}
        >
          {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        </IconButton>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {links.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navigation;
