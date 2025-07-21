import { LANGUAGES } from '@/contants';
import { useThemeColor } from '@/hooks/useThemeColor';
import useTrans from '@/hooks/useTrans';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  List,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useTheme,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Open_Sans } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { MdDarkMode, MdLanguage, MdLightMode, MdExpandMore } from 'react-icons/md';

type Props = {};

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: '400',
});

const calculatorMenuItems = [
  { title: 'Basic Calculator', href: '/calculators/basic' },
  { title: 'Percentage Calculator', href: '/calculators/percentage' },
  { title: 'BMI Calculator', href: '/calculators/bmi' },
  { title: 'Unit Converter', href: '/calculators/unit-converter' },
  { title: 'Temperature Converter', href: '/calculators/temperature' },
  { title: 'Loan Calculator', href: '/calculators/loan' },
  { title: 'Time Calculator', href: '/calculators/time' },
  { title: 'Fuel Calculator', href: '/calculators/fuel' },
];

const NavBar = (props: Props) => {
  const theme = useTheme();
  const { navBackgroundColor, isDarkMode, textColor, toggleDarkMode } = useThemeColor();
  const router = useRouter();
  const trans = useTrans();

  return (
    <VStack w="100%" backgroundColor={navBackgroundColor}>
      <HStack bg={navBackgroundColor} justifyContent="space-between" w="100%">
        <Link href="/">
          <Box px="16px" display="flex" w="100%" py="10px">
            <Heading
              className={openSans.className}
              fontSize={{
                lg: '3xl',
                base: 'xl',
              }}
              fontWeight="bold"
              color="primary.main"
              _hover={{
                color: textColor,
                cursor: 'pointer',
              }}
            >
              Calculator
            </Heading>
            <Heading
              className={openSans.className}
              fontSize={{
                lg: '3xl',
                base: 'xl',
              }}
              fontWeight="bold"
              color={textColor}
            >
              Tools
            </Heading>
          </Box>
        </Link>
        <Box display="flex" flex={1} justifyContent="flex-end">
          <HStack
            display={{
              base: 'none',
              lg: 'flex',
            }}
          >
            <Menu>
              <MenuButton as={Button} rightIcon={<MdExpandMore />} variant="ghost" color={textColor}>
                <Text className={openSans.className} fontSize="sm" fontWeight="600">
                  Calculators
                </Text>
              </MenuButton>
              <MenuList bg={navBackgroundColor} borderColor="gray.200">
                {calculatorMenuItems.map((item, index) => (
                  <Link key={index} href={item.href}>
                    <MenuItem 
                      bg={navBackgroundColor}
                      _hover={{ bg: isDarkMode ? 'gray.600' : 'gray.100' }}
                      color={textColor}
                    >
                      <Text className={openSans.className} fontSize="sm">
                        {item.title}
                      </Text>
                    </MenuItem>
                  </Link>
                ))}
              </MenuList>
            </Menu>
            <Box w="20px" />
            <Link href="/contact" locale={router.locale}>
              <Text className={openSans.className} fontSize="sm" color={textColor} fontWeight="600">
                Contact
              </Text>
            </Link>
            <Box w="20px" />
            <Link href="/terms-of-service" locale={router.locale}>
              <Text className={openSans.className} fontSize="sm" color={textColor} fontWeight="600">
                Terms
              </Text>
            </Link>
            <Box w="20px" />
            <Link href="/privacy-policy" locale={router.locale}>
              <Text className={openSans.className} fontSize="sm" color={textColor} fontWeight="600">
                Privacy
              </Text>
            </Link>
          </HStack>
          <Box w="8%" />
          <IconButton
            icon={
              !isDarkMode ? (
                <MdDarkMode color={theme.colors.primary.dark} size="30px" />
              ) : (
                <MdLightMode color={theme.colors.primary.light} size="30px" />
              )
            }
            aria-label={'dark-mode'}
            onClick={toggleDarkMode}
            variant="unstyled"
          />
          <Box w="16px" />
          <Popover>
            <PopoverTrigger>
              <Button variant="unstyled">
                <MdLanguage size="30px" color={textColor} />
              </Button>
            </PopoverTrigger>
            <PopoverContent bg={navBackgroundColor} w="100%">
              <PopoverBody padding="0px">
                <List>
                  {LANGUAGES.map((item) => (
                    <ListItem
                      key={item.alias}
                      _hover={{
                        bg: isDarkMode ? 'background.main' : 'background.dark2',
                      }}
                    >
                      <Link locale={item.alias} href={''}>
                        <Text
                          fontSize="md"
                          fontWeight="600"
                          color={textColor}
                          py="8px"
                          px="12px"
                          _hover={{
                            color: !isDarkMode ? 'primary.light' : 'primary.dark',
                          }}
                        >
                          {item.name}
                        </Text>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Box w="16px" />
        </Box>
      </HStack>
      <HStack
        display={{
          base: 'flex',
          lg: 'none',
        }}
        pb="12px"
        flexWrap="wrap"
        justifyContent="center"
      >
        <Menu>
          <MenuButton as={Button} rightIcon={<MdExpandMore />} variant="ghost" color={textColor} size="sm">
            <Text className={openSans.className} fontSize="sm" fontWeight="600">
              Calculators
            </Text>
          </MenuButton>
          <MenuList bg={navBackgroundColor} borderColor="gray.200">
            {calculatorMenuItems.slice(0, 4).map((item, index) => (
              <Link key={index} href={item.href}>
                <MenuItem 
                  bg={navBackgroundColor}
                  _hover={{ bg: isDarkMode ? 'gray.600' : 'gray.100' }}
                  color={textColor}
                >
                  <Text className={openSans.className} fontSize="sm">
                    {item.title}
                  </Text>
                </MenuItem>
              </Link>
            ))}
          </MenuList>
        </Menu>
        <Box w="20px" />
        <Link href="/contact" locale={router.locale}>
          <Text className={openSans.className} fontSize="sm" color={textColor} fontWeight="600">
            Contact
          </Text>
        </Link>
        <Box w="20px" />
        <Link href="/privacy-policy" locale={router.locale}>
          <Text className={openSans.className} fontSize="sm" color={textColor} fontWeight="600">
            Privacy
          </Text>
        </Link>
      </HStack>
    </VStack>
  );
};

export default NavBar;
