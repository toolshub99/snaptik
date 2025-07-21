import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { useThemeColor } from '@/hooks/useThemeColor';
import Layout from '@/components/Layout';
import { openSans } from '@/contants';
import Link from 'next/link';
import { FaCalculator, FaPercent, FaRulerCombined, FaWeight, FaDollarSign, FaClock, FaThermometerHalf, FaGasStation } from 'react-icons/fa';

const calculatorTools = [
  {
    title: 'Basic Calculator',
    description: 'Perform basic arithmetic operations like addition, subtraction, multiplication, and division.',
    icon: FaCalculator,
    href: '/calculators/basic',
    color: 'blue.500',
  },
  {
    title: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increase/decrease, and percentage of a number.',
    icon: FaPercent,
    href: '/calculators/percentage',
    color: 'green.500',
  },
  {
    title: 'Unit Converter',
    description: 'Convert between different units of measurement including length, weight, volume, and more.',
    icon: FaRulerCombined,
    href: '/calculators/unit-converter',
    color: 'purple.500',
  },
  {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and understand your health status.',
    icon: FaWeight,
    href: '/calculators/bmi',
    color: 'orange.500',
  },
  {
    title: 'Loan Calculator',
    description: 'Calculate loan payments, interest rates, and amortization schedules.',
    icon: FaDollarSign,
    href: '/calculators/loan',
    color: 'teal.500',
  },
  {
    title: 'Time Calculator',
    description: 'Calculate time differences, add/subtract time, and convert time zones.',
    icon: FaClock,
    href: '/calculators/time',
    color: 'red.500',
  },
  {
    title: 'Temperature Converter',
    description: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin.',
    icon: FaThermometerHalf,
    href: '/calculators/temperature',
    color: 'cyan.500',
  },
  {
    title: 'Fuel Calculator',
    description: 'Calculate fuel consumption, trip costs, and fuel efficiency.',
    icon: FaGasStation,
    href: '/calculators/fuel',
    color: 'yellow.500',
  },
];

export default function Home() {
  const { textColor, navBackgroundColor } = useThemeColor();
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardHover = useColorModeValue('gray.50', 'gray.600');

  return (
    <Layout title="Calculator Tools - Free Online Calculators">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" py={8}>
            <Heading 
              size="2xl" 
              className={openSans.className} 
              color={textColor}
              mb={4}
            >
              Free Online Calculator Tools
            </Heading>
            <Text 
              fontSize="xl" 
              className={openSans.className} 
              color={textColor}
              maxW="2xl"
              mx="auto"
            >
              Access a comprehensive collection of free online calculators for everyday calculations, 
              unit conversions, financial planning, and more. No downloads required!
            </Text>
          </Box>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
            {calculatorTools.map((tool, index) => (
              <GridItem key={index}>
                <Link href={tool.href} style={{ textDecoration: 'none' }}>
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="lg"
                    border="1px"
                    borderColor="gray.200"
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      bg: cardHover,
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    height="100%"
                  >
                    <VStack align="start" spacing={4} height="100%">
                      <HStack>
                        <Icon as={tool.icon} color={tool.color} boxSize={8} />
                        <Heading 
                          size="md" 
                          className={openSans.className} 
                          color={textColor}
                        >
                          {tool.title}
                        </Heading>
                      </HStack>
                      <Text 
                        className={openSans.className} 
                        color={textColor}
                        fontSize="sm"
                        flex={1}
                      >
                        {tool.description}
                      </Text>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        width="full"
                        className={openSans.className}
                      >
                        Use Calculator
                      </Button>
                    </VStack>
                  </Box>
                </Link>
              </GridItem>
            ))}
          </Grid>

          <Box bg={navBackgroundColor} p={8} borderRadius="lg" mt={8}>
            <VStack spacing={4} textAlign="center">
              <Heading 
                size="lg" 
                className={openSans.className} 
                color={textColor}
              >
                Why Use Our Calculator Tools?
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} w="full">
                <VStack>
                  <Text fontWeight="bold" className={openSans.className} color={textColor}>
                    🚀 Fast & Accurate
                  </Text>
                  <Text fontSize="sm" className={openSans.className} color={textColor}>
                    Get instant results with precise calculations
                  </Text>
                </VStack>
                <VStack>
                  <Text fontWeight="bold" className={openSans.className} color={textColor}>
                    📱 Mobile Friendly
                  </Text>
                  <Text fontSize="sm" className={openSans.className} color={textColor}>
                    Works perfectly on all devices and screen sizes
                  </Text>
                </VStack>
                <VStack>
                  <Text fontWeight="bold" className={openSans.className} color={textColor}>
                    🔒 No Registration
                  </Text>
                  <Text fontSize="sm" className={openSans.className} color={textColor}>
                    Use all tools for free without signing up
                  </Text>
                </VStack>
              </Grid>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
}
