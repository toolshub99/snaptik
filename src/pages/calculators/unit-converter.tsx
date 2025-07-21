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
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import Layout from '@/components/Layout';
import { openSans } from '@/contants';

const conversionFactors = {
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    inch: 39.3701,
    foot: 3.28084,
    yard: 1.09361,
    mile: 0.000621371,
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    pound: 2.20462,
    ounce: 35.274,
    ton: 0.001,
    stone: 0.157473,
  },
  temperature: {
    celsius: 'base',
    fahrenheit: 'f',
    kelvin: 'k',
  },
  volume: {
    liter: 1,
    milliliter: 1000,
    gallon: 0.264172,
    quart: 1.05669,
    pint: 2.11338,
    cup: 4.22675,
    fluid_ounce: 33.814,
  },
};

export default function UnitConverter() {
  const { textColor, navBackgroundColor } = useThemeColor();
  const cardBg = useColorModeValue('white', 'gray.700');

  const [activeCategory, setActiveCategory] = useState('length');
  const [fromValue, setFromValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [result, setResult] = useState('');

  const convertUnits = () => {
    const value = parseFloat(fromValue);
    if (isNaN(value)) return;

    if (activeCategory === 'temperature') {
      convertTemperature(value);
    } else {
      convertStandardUnits(value);
    }
  };

  const convertTemperature = (value: number) => {
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

    // Convert from celsius to target unit
    let resultValue: number;
    switch (toUnit) {
      case 'celsius':
        resultValue = celsius;
        break;
      case 'fahrenheit':
        resultValue = (celsius * 9/5) + 32;
        break;
      case 'kelvin':
        resultValue = celsius + 273.15;
        break;
      default:
        resultValue = celsius;
    }

    setResult(resultValue.toFixed(2));
  };

  const convertStandardUnits = (value: number) => {
    const factors = conversionFactors[activeCategory as keyof typeof conversionFactors] as Record<string, number>;
    
    // Convert to base unit first
    const baseValue = value / factors[fromUnit];
    // Convert from base unit to target unit
    const resultValue = baseValue * factors[toUnit];
    
    setResult(resultValue.toFixed(6).replace(/\.?0+$/, ''));
  };

  const clearConverter = () => {
    setFromValue('');
    setResult('');
  };

  const getUnitsForCategory = (category: string) => {
    return Object.keys(conversionFactors[category as keyof typeof conversionFactors]);
  };

  const formatUnitName = (unit: string) => {
    return unit.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  useEffect(() => {
    const units = getUnitsForCategory(activeCategory);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setFromValue('');
    setResult('');
  }, [activeCategory]);

  useEffect(() => {
    if (fromValue && !isNaN(parseFloat(fromValue))) {
      convertUnits();
    } else {
      setResult('');
    }
  }, [fromValue, fromUnit, toUnit, activeCategory]);

  return (
    <Layout title="Unit Converter - Free Online Unit Conversion Tool">
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading 
              size="xl" 
              className={openSans.className} 
              color={textColor}
              mb={4}
            >
              Unit Converter
            </Heading>
            <Text 
              fontSize="lg" 
              className={openSans.className} 
              color={textColor}
            >
              Convert between different units of measurement easily and accurately.
            </Text>
          </Box>

          <Box bg={cardBg} p={6} borderRadius="lg" border="1px" borderColor="gray.200">
            <Tabs value={activeCategory} onChange={setActiveCategory} variant="enclosed">
              <TabList>
                <Tab onClick={() => setActiveCategory('length')}>Length</Tab>
                <Tab onClick={() => setActiveCategory('weight')}>Weight</Tab>
                <Tab onClick={() => setActiveCategory('temperature')}>Temperature</Tab>
                <Tab onClick={() => setActiveCategory('volume')}>Volume</Tab>
              </TabList>

              <TabPanels>
                {['length', 'weight', 'temperature', 'volume'].map((category) => (
                  <TabPanel key={category}>
                    <VStack spacing={6}>
                      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} w="full">
                        <VStack spacing={4}>
                          <FormControl>
                            <FormLabel color={textColor}>From</FormLabel>
                            <Select 
                              value={fromUnit} 
                              onChange={(e) => setFromUnit(e.target.value)}
                              color={textColor}
                            >
                              {getUnitsForCategory(category).map((unit) => (
                                <option key={unit} value={unit}>
                                  {formatUnitName(unit)}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                          
                          <FormControl>
                            <FormLabel color={textColor}>Value</FormLabel>
                            <Input
                              type="number"
                              placeholder="Enter value"
                              value={fromValue}
                              onChange={(e) => setFromValue(e.target.value)}
                              color={textColor}
                            />
                          </FormControl>
                        </VStack>

                        <VStack spacing={4}>
                          <FormControl>
                            <FormLabel color={textColor}>To</FormLabel>
                            <Select 
                              value={toUnit} 
                              onChange={(e) => setToUnit(e.target.value)}
                              color={textColor}
                            >
                              {getUnitsForCategory(category).map((unit) => (
                                <option key={unit} value={unit}>
                                  {formatUnitName(unit)}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                          
                          <FormControl>
                            <FormLabel color={textColor}>Result</FormLabel>
                            <Input
                              value={result}
                              readOnly
                              bg={navBackgroundColor}
                              color={textColor}
                              placeholder="Result will appear here"
                            />
                          </FormControl>
                        </VStack>
                      </Grid>

                      <HStack spacing={4}>
                        <Button 
                          colorScheme="blue" 
                          onClick={convertUnits} 
                          className={openSans.className}
                          isDisabled={!fromValue || isNaN(parseFloat(fromValue))}
                        >
                          Convert
                        </Button>
                        <Button variant="outline" onClick={clearConverter} className={openSans.className}>
                          Clear
                        </Button>
                      </HStack>
                    </VStack>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </Box>

          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
            <Box bg={navBackgroundColor} p={6} borderRadius="lg">
              <VStack spacing={4} align="start">
                <Heading size="md" className={openSans.className} color={textColor}>
                  Common Conversions
                </Heading>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  <strong>Length:</strong> 1 meter = 100 cm = 3.28 feet
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  <strong>Weight:</strong> 1 kilogram = 1000 grams = 2.2 pounds
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  <strong>Temperature:</strong> 0°C = 32°F = 273.15 K
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  <strong>Volume:</strong> 1 liter = 1000 ml = 0.26 gallons
                </Text>
              </VStack>
            </Box>

            <Box bg={navBackgroundColor} p={6} borderRadius="lg">
              <VStack spacing={4} align="start">
                <Heading size="md" className={openSans.className} color={textColor}>
                  Quick Tips
                </Heading>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • Select the category tab to switch between different types of measurements
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • The conversion happens automatically as you type
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • All conversions are precise to 6 decimal places
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • Temperature conversions handle Celsius, Fahrenheit, and Kelvin
                </Text>
              </VStack>
            </Box>
          </Grid>
        </VStack>
      </Container>
    </Layout>
  );
}