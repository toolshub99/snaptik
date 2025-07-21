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
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import Layout from '@/components/Layout';
import { openSans } from '@/contants';

export default function BMICalculator() {
  const { textColor, navBackgroundColor } = useThemeColor();
  const cardBg = useColorModeValue('white', 'gray.700');

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { text: 'Underweight', color: 'blue' };
    if (bmiValue < 25) return { text: 'Normal weight', color: 'green' };
    if (bmiValue < 30) return { text: 'Overweight', color: 'yellow' };
    return { text: 'Obese', color: 'red' };
  };

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!isNaN(weightNum) && !isNaN(heightNum) && heightNum > 0) {
      let bmiValue: number;
      
      if (unit === 'metric') {
        // Weight in kg, height in cm
        const heightInMeters = heightNum / 100;
        bmiValue = weightNum / (heightInMeters * heightInMeters);
      } else {
        // Weight in lbs, height in inches
        bmiValue = (weightNum / (heightNum * heightNum)) * 703;
      }

      setBmi(parseFloat(bmiValue.toFixed(1)));
      setCategory(getBMICategory(bmiValue).text);
    }
  };

  const clearCalculator = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <Layout title="BMI Calculator - Body Mass Index Calculator">
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading 
              size="xl" 
              className={openSans.className} 
              color={textColor}
              mb={4}
            >
              BMI Calculator
            </Heading>
            <Text 
              fontSize="lg" 
              className={openSans.className} 
              color={textColor}
            >
              Calculate your Body Mass Index (BMI) and understand your health status.
            </Text>
          </Box>

          <Box bg={cardBg} p={6} borderRadius="lg" border="1px" borderColor="gray.200" maxW="600px" mx="auto">
            <VStack spacing={6}>
              <FormControl>
                <FormLabel color={textColor}>Unit System</FormLabel>
                <Select 
                  value={unit} 
                  onChange={(e) => setUnit(e.target.value)}
                  color={textColor}
                >
                  <option value="metric">Metric (kg, cm)</option>
                  <option value="imperial">Imperial (lbs, inches)</option>
                </Select>
              </FormControl>

              <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} w="full">
                <FormControl>
                  <FormLabel color={textColor}>
                    Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
                  </FormLabel>
                  <Input
                    type="number"
                    placeholder={unit === 'metric' ? '70' : '154'}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    color={textColor}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel color={textColor}>
                    Height {unit === 'metric' ? '(cm)' : '(inches)'}
                  </FormLabel>
                  <Input
                    type="number"
                    placeholder={unit === 'metric' ? '175' : '69'}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    color={textColor}
                  />
                </FormControl>
              </Grid>

              <HStack spacing={4}>
                <Button colorScheme="blue" onClick={calculateBMI} className={openSans.className}>
                  Calculate BMI
                </Button>
                <Button variant="outline" onClick={clearCalculator} className={openSans.className}>
                  Clear
                </Button>
              </HStack>

              {bmi && (
                <Box 
                  bg={navBackgroundColor} 
                  p={6} 
                  borderRadius="lg" 
                  w="full" 
                  textAlign="center"
                  border="2px"
                  borderColor={getBMICategory(bmi).color + '.200'}
                >
                  <VStack spacing={4}>
                    <Text className={openSans.className} color={textColor} fontSize="lg">
                      Your BMI is
                    </Text>
                    <Heading size="2xl" color={textColor}>
                      {bmi}
                    </Heading>
                    <Badge 
                      colorScheme={getBMICategory(bmi).color} 
                      fontSize="lg" 
                      px={4} 
                      py={2} 
                      borderRadius="full"
                    >
                      {category}
                    </Badge>
                  </VStack>
                </Box>
              )}
            </VStack>
          </Box>

          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
            <Box bg={navBackgroundColor} p={6} borderRadius="lg">
              <VStack spacing={4} align="start">
                <Heading size="md" className={openSans.className} color={textColor}>
                  BMI Categories
                </Heading>
                <HStack>
                  <Badge colorScheme="blue">Underweight</Badge>
                  <Text className={openSans.className} color={textColor}>BMI less than 18.5</Text>
                </HStack>
                <HStack>
                  <Badge colorScheme="green">Normal weight</Badge>
                  <Text className={openSans.className} color={textColor}>BMI 18.5 - 24.9</Text>
                </HStack>
                <HStack>
                  <Badge colorScheme="yellow">Overweight</Badge>
                  <Text className={openSans.className} color={textColor}>BMI 25 - 29.9</Text>
                </HStack>
                <HStack>
                  <Badge colorScheme="red">Obese</Badge>
                  <Text className={openSans.className} color={textColor}>BMI 30 or greater</Text>
                </HStack>
              </VStack>
            </Box>

            <Box bg={navBackgroundColor} p={6} borderRadius="lg">
              <VStack spacing={4} align="start">
                <Heading size="md" className={openSans.className} color={textColor}>
                  About BMI
                </Heading>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  Body Mass Index (BMI) is a measure of body fat based on height and weight. 
                  While BMI is a useful indicator for most people, it doesn't directly measure 
                  body fat percentage and may not be accurate for athletes with high muscle mass.
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  <strong>Formula:</strong> BMI = weight (kg) / [height (m)]²
                </Text>
              </VStack>
            </Box>
          </Grid>

          <Alert status="info" borderRadius="lg">
            <AlertIcon />
            <Box>
              <Text className={openSans.className}>
                <strong>Disclaimer:</strong> BMI is a screening tool and not a diagnostic measure. 
                For health advice and interpretation of your BMI results, please consult with a healthcare provider.
              </Text>
            </Box>
          </Alert>
        </VStack>
      </Container>
    </Layout>
  );
}