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

export default function FuelCalculator() {
  const { textColor, navBackgroundColor } = useThemeColor();
  const cardBg = useColorModeValue('white', 'gray.700');

  // Fuel efficiency calculator
  const [distance, setDistance] = useState('');
  const [fuelUsed, setFuelUsed] = useState('');
  const [efficiency, setEfficiency] = useState('');

  // Trip cost calculator
  const [tripDistance, setTripDistance] = useState('');
  const [vehicleEfficiency, setVehicleEfficiency] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [tripCost, setTripCost] = useState('');

  const calculateEfficiency = () => {
    const dist = parseFloat(distance);
    const fuel = parseFloat(fuelUsed);
    
    if (!isNaN(dist) && !isNaN(fuel) && fuel > 0) {
      const mpg = dist / fuel;
      setEfficiency(mpg.toFixed(2) + ' MPG');
    }
  };

  const calculateTripCost = () => {
    const dist = parseFloat(tripDistance);
    const eff = parseFloat(vehicleEfficiency);
    const price = parseFloat(fuelPrice);
    
    if (!isNaN(dist) && !isNaN(eff) && !isNaN(price) && eff > 0) {
      const fuelNeeded = dist / eff;
      const cost = fuelNeeded * price;
      setTripCost('$' + cost.toFixed(2));
    }
  };

  return (
    <Layout title="Fuel Calculator - MPG & Trip Cost Calculator">
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading 
              size="xl" 
              className={openSans.className} 
              color={textColor}
              mb={4}
            >
              Fuel Calculator
            </Heading>
            <Text 
              fontSize="lg" 
              className={openSans.className} 
              color={textColor}
            >
              Calculate fuel efficiency, trip costs, and fuel consumption for your vehicle.
            </Text>
          </Box>

          <Box bg={cardBg} p={6} borderRadius="lg" border="1px" borderColor="gray.200">
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Fuel Efficiency</Tab>
                <Tab>Trip Cost</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack spacing={6}>
                    <Text className={openSans.className} color={textColor} textAlign="center">
                      Calculate your vehicle's fuel efficiency (Miles Per Gallon)
                    </Text>
                    
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} w="full">
                      <FormControl>
                        <FormLabel color={textColor}>Distance (miles)</FormLabel>
                        <Input
                          type="number"
                          placeholder="300"
                          value={distance}
                          onChange={(e) => setDistance(e.target.value)}
                          color={textColor}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel color={textColor}>Fuel Used (gallons)</FormLabel>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="12"
                          value={fuelUsed}
                          onChange={(e) => setFuelUsed(e.target.value)}
                          color={textColor}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel color={textColor}>Efficiency</FormLabel>
                        <Input
                          value={efficiency}
                          readOnly
                          bg={navBackgroundColor}
                          color={textColor}
                          placeholder="Result will appear here"
                        />
                      </FormControl>
                    </Grid>
                    
                    <Button colorScheme="blue" onClick={calculateEfficiency} className={openSans.className}>
                      Calculate Efficiency
                    </Button>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack spacing={6}>
                    <Text className={openSans.className} color={textColor} textAlign="center">
                      Calculate the fuel cost for your trip
                    </Text>
                    
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} w="full">
                      <FormControl>
                        <FormLabel color={textColor}>Trip Distance (miles)</FormLabel>
                        <Input
                          type="number"
                          placeholder="500"
                          value={tripDistance}
                          onChange={(e) => setTripDistance(e.target.value)}
                          color={textColor}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel color={textColor}>Vehicle Efficiency (MPG)</FormLabel>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="25"
                          value={vehicleEfficiency}
                          onChange={(e) => setVehicleEfficiency(e.target.value)}
                          color={textColor}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel color={textColor}>Fuel Price ($/gallon)</FormLabel>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="3.50"
                          value={fuelPrice}
                          onChange={(e) => setFuelPrice(e.target.value)}
                          color={textColor}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel color={textColor}>Trip Cost</FormLabel>
                        <Input
                          value={tripCost}
                          readOnly
                          bg={navBackgroundColor}
                          color={textColor}
                          placeholder="Result will appear here"
                        />
                      </FormControl>
                    </Grid>
                    
                    <Button colorScheme="green" onClick={calculateTripCost} className={openSans.className}>
                      Calculate Trip Cost
                    </Button>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
            <Box bg={navBackgroundColor} p={6} borderRadius="lg">
              <VStack spacing={4} align="start">
                <Heading size="md" className={openSans.className} color={textColor}>
                  Fuel Efficiency Tips
                </Heading>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • Maintain steady speeds to improve fuel efficiency
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • Keep tires properly inflated
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • Remove excess weight from your vehicle
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • Plan routes to minimize stop-and-go traffic
                </Text>
              </VStack>
            </Box>

            <Box bg={navBackgroundColor} p={6} borderRadius="lg">
              <VStack spacing={4} align="start">
                <Heading size="md" className={openSans.className} color={textColor}>
                  Average Fuel Efficiency
                </Heading>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • Compact cars: 25-35 MPG
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • Mid-size cars: 20-30 MPG
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • SUVs: 15-25 MPG
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • Trucks: 12-20 MPG
                </Text>
              </VStack>
            </Box>
          </Grid>
        </VStack>
      </Container>
    </Layout>
  );
}