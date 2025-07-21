import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import Layout from '@/components/Layout';
import { openSans } from '@/contants';

export default function PercentageCalculator() {
  const { textColor, navBackgroundColor } = useThemeColor();
  const cardBg = useColorModeValue('white', 'gray.700');

  // Percentage of a number
  const [percentageOf, setPercentageOf] = useState({ percentage: '', number: '', result: '' });
  
  // What percentage is X of Y
  const [whatPercentage, setWhatPercentage] = useState({ x: '', y: '', result: '' });
  
  // Percentage increase/decrease
  const [percentageChange, setPercentageChange] = useState({ original: '', new: '', result: '' });

  const calculatePercentageOf = () => {
    const percentage = parseFloat(percentageOf.percentage);
    const number = parseFloat(percentageOf.number);
    
    if (!isNaN(percentage) && !isNaN(number)) {
      const result = (percentage / 100) * number;
      setPercentageOf(prev => ({ ...prev, result: result.toString() }));
    }
  };

  const calculateWhatPercentage = () => {
    const x = parseFloat(whatPercentage.x);
    const y = parseFloat(whatPercentage.y);
    
    if (!isNaN(x) && !isNaN(y) && y !== 0) {
      const result = (x / y) * 100;
      setWhatPercentage(prev => ({ ...prev, result: result.toFixed(2) + '%' }));
    }
  };

  const calculatePercentageChange = () => {
    const original = parseFloat(percentageChange.original);
    const newValue = parseFloat(percentageChange.new);
    
    if (!isNaN(original) && !isNaN(newValue) && original !== 0) {
      const change = ((newValue - original) / original) * 100;
      const changeText = change >= 0 ? `${change.toFixed(2)}% increase` : `${Math.abs(change).toFixed(2)}% decrease`;
      setPercentageChange(prev => ({ ...prev, result: changeText }));
    }
  };

  return (
    <Layout title="Percentage Calculator - Free Online Percentage Calculator">
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading 
              size="xl" 
              className={openSans.className} 
              color={textColor}
              mb={4}
            >
              Percentage Calculator
            </Heading>
            <Text 
              fontSize="lg" 
              className={openSans.className} 
              color={textColor}
            >
              Calculate percentages, percentage changes, and more with our comprehensive percentage calculator.
            </Text>
          </Box>

          <Box bg={cardBg} p={6} borderRadius="lg" border="1px" borderColor="gray.200">
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Percentage of a Number</Tab>
                <Tab>What Percentage?</Tab>
                <Tab>Percentage Change</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack spacing={6}>
                    <Text className={openSans.className} color={textColor} textAlign="center">
                      Calculate what is X% of Y
                    </Text>
                    
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} w="full">
                      <FormControl>
                        <FormLabel color={textColor}>Percentage</FormLabel>
                        <Input
                          type="number"
                          placeholder="25"
                          value={percentageOf.percentage}
                          onChange={(e) => setPercentageOf(prev => ({ ...prev, percentage: e.target.value }))}
                          color={textColor}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel color={textColor}>of Number</FormLabel>
                        <Input
                          type="number"
                          placeholder="200"
                          value={percentageOf.number}
                          onChange={(e) => setPercentageOf(prev => ({ ...prev, number: e.target.value }))}
                          color={textColor}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel color={textColor}>Result</FormLabel>
                        <Input
                          value={percentageOf.result}
                          readOnly
                          bg={navBackgroundColor}
                          color={textColor}
                        />
                      </FormControl>
                    </Grid>
                    
                    <Button colorScheme="blue" onClick={calculatePercentageOf} className={openSans.className}>
                      Calculate
                    </Button>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack spacing={6}>
                    <Text className={openSans.className} color={textColor} textAlign="center">
                      Calculate what percentage X is of Y
                    </Text>
                    
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} w="full">
                      <FormControl>
                        <FormLabel color={textColor}>X (First Number)</FormLabel>
                        <Input
                          type="number"
                          placeholder="50"
                          value={whatPercentage.x}
                          onChange={(e) => setWhatPercentage(prev => ({ ...prev, x: e.target.value }))}
                          color={textColor}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel color={textColor}>Y (Second Number)</FormLabel>
                        <Input
                          type="number"
                          placeholder="200"
                          value={whatPercentage.y}
                          onChange={(e) => setWhatPercentage(prev => ({ ...prev, y: e.target.value }))}
                          color={textColor}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel color={textColor}>Result</FormLabel>
                        <Input
                          value={whatPercentage.result}
                          readOnly
                          bg={navBackgroundColor}
                          color={textColor}
                        />
                      </FormControl>
                    </Grid>
                    
                    <Button colorScheme="green" onClick={calculateWhatPercentage} className={openSans.className}>
                      Calculate
                    </Button>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack spacing={6}>
                    <Text className={openSans.className} color={textColor} textAlign="center">
                      Calculate percentage increase or decrease
                    </Text>
                    
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} w="full">
                      <FormControl>
                        <FormLabel color={textColor}>Original Value</FormLabel>
                        <Input
                          type="number"
                          placeholder="100"
                          value={percentageChange.original}
                          onChange={(e) => setPercentageChange(prev => ({ ...prev, original: e.target.value }))}
                          color={textColor}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel color={textColor}>New Value</FormLabel>
                        <Input
                          type="number"
                          placeholder="120"
                          value={percentageChange.new}
                          onChange={(e) => setPercentageChange(prev => ({ ...prev, new: e.target.value }))}
                          color={textColor}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel color={textColor}>Result</FormLabel>
                        <Input
                          value={percentageChange.result}
                          readOnly
                          bg={navBackgroundColor}
                          color={textColor}
                        />
                      </FormControl>
                    </Grid>
                    
                    <Button colorScheme="purple" onClick={calculatePercentageChange} className={openSans.className}>
                      Calculate
                    </Button>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            <Box bg={navBackgroundColor} p={6} borderRadius="lg">
              <VStack spacing={4} align="start">
                <Heading size="md" className={openSans.className} color={textColor}>
                  Common Percentage Calculations
                </Heading>
                <Text className={openSans.className} color={textColor}>
                  • Tips: 15% of $50 = $7.50
                </Text>
                <Text className={openSans.className} color={textColor}>
                  • Discounts: 25% off $100 = $25 savings
                </Text>
                <Text className={openSans.className} color={textColor}>
                  • Tax: 8.5% of $200 = $17 tax
                </Text>
                <Text className={openSans.className} color={textColor}>
                  • Interest: 5% of $1000 = $50 interest
                </Text>
              </VStack>
            </Box>

            <Box bg={navBackgroundColor} p={6} borderRadius="lg">
              <VStack spacing={4} align="start">
                <Heading size="md" className={openSans.className} color={textColor}>
                  Percentage Formulas
                </Heading>
                <Text className={openSans.className} color={textColor}>
                  • Percentage = (Part / Whole) × 100
                </Text>
                <Text className={openSans.className} color={textColor}>
                  • Part = (Percentage / 100) × Whole
                </Text>
                <Text className={openSans.className} color={textColor}>
                  • Whole = Part / (Percentage / 100)
                </Text>
                <Text className={openSans.className} color={textColor}>
                  • Change% = ((New - Old) / Old) × 100
                </Text>
              </VStack>
            </Box>
          </Grid>
        </VStack>
      </Container>
    </Layout>
  );
}