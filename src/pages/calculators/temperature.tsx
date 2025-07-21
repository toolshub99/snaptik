import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Select,
  Badge,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import Layout from '@/components/Layout';
import { openSans } from '@/contants';

const quickConversions = [
  { celsius: 0, fahrenheit: 32, kelvin: 273.15, description: 'Freezing point of water' },
  { celsius: 100, fahrenheit: 212, kelvin: 373.15, description: 'Boiling point of water' },
  { celsius: 37, fahrenheit: 98.6, kelvin: 310.15, description: 'Normal body temperature' },
  { celsius: 20, fahrenheit: 68, kelvin: 293.15, description: 'Room temperature' },
  { celsius: -40, fahrenheit: -40, kelvin: 233.15, description: 'Same in °C and °F' },
];

export default function TemperatureConverter() {
  const { textColor, navBackgroundColor } = useThemeColor();
  const cardBg = useColorModeValue('white', 'gray.700');

  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('celsius');
  const [results, setResults] = useState({
    celsius: '',
    fahrenheit: '',
    kelvin: '',
  });

  const convertTemperature = (value: number, fromUnit: string) => {
    let celsius: number;
    
    // Convert to celsius first
    switch (fromUnit) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    // Convert to all units
    const fahrenheit = (celsius * 9/5) + 32;
    const kelvin = celsius + 273.15;

    setResults({
      celsius: celsius.toFixed(2),
      fahrenheit: fahrenheit.toFixed(2),
      kelvin: kelvin.toFixed(2),
    });
  };

  const clearConverter = () => {
    setInputValue('');
    setResults({
      celsius: '',
      fahrenheit: '',
      kelvin: '',
    });
  };

  useEffect(() => {
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      convertTemperature(value, inputUnit);
    } else {
      setResults({
        celsius: '',
        fahrenheit: '',
        kelvin: '',
      });
    }
  }, [inputValue, inputUnit]);

  const setQuickValue = (temp: typeof quickConversions[0]) => {
    setInputValue(temp.celsius.toString());
    setInputUnit('celsius');
  };

  return (
    <Layout title="Temperature Converter - Celsius, Fahrenheit, Kelvin">
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading 
              size="xl" 
              className={openSans.className} 
              color={textColor}
              mb={4}
            >
              Temperature Converter
            </Heading>
            <Text 
              fontSize="lg" 
              className={openSans.className} 
              color={textColor}
            >
              Convert temperatures between Celsius, Fahrenheit, and Kelvin instantly.
            </Text>
          </Box>

          <Box bg={cardBg} p={6} borderRadius="lg" border="1px" borderColor="gray.200" maxW="600px" mx="auto">
            <VStack spacing={6}>
              <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={4} w="full">
                <FormControl>
                  <FormLabel color={textColor}>Temperature Value</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter temperature"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    color={textColor}
                    size="lg"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel color={textColor}>Unit</FormLabel>
                  <Select 
                    value={inputUnit} 
                    onChange={(e) => setInputUnit(e.target.value)}
                    color={textColor}
                    size="lg"
                  >
                    <option value="celsius">Celsius (°C)</option>
                    <option value="fahrenheit">Fahrenheit (°F)</option>
                    <option value="kelvin">Kelvin (K)</option>
                  </Select>
                </FormControl>
              </Grid>

              <Button variant="outline" onClick={clearConverter} className={openSans.className}>
                Clear
              </Button>

              {(results.celsius || results.fahrenheit || results.kelvin) && (
                <Grid templateColumns="repeat(3, 1fr)" gap={4} w="full">
                  <Box 
                    bg={navBackgroundColor} 
                    p={4} 
                    borderRadius="lg" 
                    textAlign="center"
                    border={inputUnit === 'celsius' ? '2px solid' : '1px solid'}
                    borderColor={inputUnit === 'celsius' ? 'blue.400' : 'gray.200'}
                  >
                    <Text className={openSans.className} color={textColor} fontSize="sm" mb={2}>
                      Celsius
                    </Text>
                    <Text className={openSans.className} color={textColor} fontSize="xl" fontWeight="bold">
                      {results.celsius}°C
                    </Text>
                  </Box>

                  <Box 
                    bg={navBackgroundColor} 
                    p={4} 
                    borderRadius="lg" 
                    textAlign="center"
                    border={inputUnit === 'fahrenheit' ? '2px solid' : '1px solid'}
                    borderColor={inputUnit === 'fahrenheit' ? 'blue.400' : 'gray.200'}
                  >
                    <Text className={openSans.className} color={textColor} fontSize="sm" mb={2}>
                      Fahrenheit
                    </Text>
                    <Text className={openSans.className} color={textColor} fontSize="xl" fontWeight="bold">
                      {results.fahrenheit}°F
                    </Text>
                  </Box>

                  <Box 
                    bg={navBackgroundColor} 
                    p={4} 
                    borderRadius="lg" 
                    textAlign="center"
                    border={inputUnit === 'kelvin' ? '2px solid' : '1px solid'}
                    borderColor={inputUnit === 'kelvin' ? 'blue.400' : 'gray.200'}
                  >
                    <Text className={openSans.className} color={textColor} fontSize="sm" mb={2}>
                      Kelvin
                    </Text>
                    <Text className={openSans.className} color={textColor} fontSize="xl" fontWeight="bold">
                      {results.kelvin} K
                    </Text>
                  </Box>
                </Grid>
              )}
            </VStack>
          </Box>

          <Box bg={navBackgroundColor} p={6} borderRadius="lg">
            <VStack spacing={4}>
              <Heading size="md" className={openSans.className} color={textColor}>
                Quick Reference Temperatures
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4} w="full">
                {quickConversions.map((temp, index) => (
                  <Box
                    key={index}
                    bg={cardBg}
                    p={4}
                    borderRadius="lg"
                    border="1px"
                    borderColor="gray.200"
                    cursor="pointer"
                    onClick={() => setQuickValue(temp)}
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                    transition="all 0.2s"
                  >
                    <VStack spacing={2}>
                      <Text className={openSans.className} color={textColor} fontSize="sm" fontWeight="bold">
                        {temp.description}
                      </Text>
                      <HStack spacing={2} flexWrap="wrap" justify="center">
                        <Badge colorScheme="blue">{temp.celsius}°C</Badge>
                        <Badge colorScheme="red">{temp.fahrenheit}°F</Badge>
                        <Badge colorScheme="purple">{temp.kelvin} K</Badge>
                      </HStack>
                    </VStack>
                  </Box>
                ))}
              </Grid>
              <Text className={openSans.className} color={textColor} fontSize="sm" textAlign="center">
                Click on any card to quickly convert that temperature
              </Text>
            </VStack>
          </Box>

          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
            <Box bg={navBackgroundColor} p={6} borderRadius="lg">
              <VStack spacing={4} align="start">
                <Heading size="md" className={openSans.className} color={textColor}>
                  Conversion Formulas
                </Heading>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  <strong>Celsius to Fahrenheit:</strong> °F = (°C × 9/5) + 32
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  <strong>Fahrenheit to Celsius:</strong> °C = (°F - 32) × 5/9
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  <strong>Celsius to Kelvin:</strong> K = °C + 273.15
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  <strong>Kelvin to Celsius:</strong> °C = K - 273.15
                </Text>
              </VStack>
            </Box>

            <Box bg={navBackgroundColor} p={6} borderRadius="lg">
              <VStack spacing={4} align="start">
                <Heading size="md" className={openSans.className} color={textColor}>
                  Temperature Facts
                </Heading>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • Absolute zero is -273.15°C or -459.67°F or 0 K
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • The Kelvin scale starts at absolute zero
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • -40°C equals -40°F (the only point where they match)
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • Water freezes at 0°C, 32°F, or 273.15 K
                </Text>
              </VStack>
            </Box>
          </Grid>
        </VStack>
      </Container>
    </Layout>
  );
}