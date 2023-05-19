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
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import ModalAccountSettings from '@/components/modules/ModalAccountSettings';

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
  const {
    isOpen: navIsOpen,
    onOpen: navOnOpen,
    onClose: navOnClose,
  } = useDisclosure();
  const {
    isOpen: accountIsOpen,
    onOpen: accountOnOpen,
    onClose: accountOnClose,
  } = useDisclosure();

  return (
    <Box bg={useColorModeValue('purple.300', 'purple.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={navIsOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={navIsOpen ? navOnClose : navOnOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Link href="/" _hover={{ textDecoration: 'none' }}>
            CR
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
          <>
            <Flex alignItems="center">
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                >
                  <Stack direction="row" alignItems="center">
                    <Text color={useColorModeValue('gray.800', 'gray.200')}>
                      {session?.user?.displayName ?? session?.user?.name}
                    </Text>
                    <Avatar
                      size="sm"
                      name={
                        session?.user?.displayName ??
                        session?.user?.name ??
                        null
                      }
                      src={session?.user?.image}
                    />
                  </Stack>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={accountOnOpen}>Account Settings</MenuItem>
                  <MenuItem>Theme Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={signOut}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <ModalAccountSettings
              isOpen={accountIsOpen}
              onClose={accountOnClose}
            />
          </>
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

      {navIsOpen ? (
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
