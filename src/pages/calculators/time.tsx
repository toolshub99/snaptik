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

export default function TimeCalculator() {
  const { textColor, navBackgroundColor } = useThemeColor();
  const cardBg = useColorModeValue('white', 'gray.700');

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeDifference, setTimeDifference] = useState('');

  const calculateTimeDifference = () => {
    if (!startTime || !endTime) return;

    const start = new Date(`2024-01-01T${startTime}`);
    const end = new Date(`2024-01-01T${endTime}`);
    
    let diff = end.getTime() - start.getTime();
    
    if (diff < 0) {
      // If end time is next day
      diff += 24 * 60 * 60 * 1000;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    setTimeDifference(`${hours}h ${minutes}m`);
  };

  return (
    <Layout title="Time Calculator - Time Difference & Duration Calculator">
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading 
              size="xl" 
              className={openSans.className} 
              color={textColor}
              mb={4}
            >
              Time Calculator
            </Heading>
            <Text 
              fontSize="lg" 
              className={openSans.className} 
              color={textColor}
            >
              Calculate time differences, durations, and convert between time formats.
            </Text>
          </Box>

          <Box bg={cardBg} p={6} borderRadius="lg" border="1px" borderColor="gray.200">
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Time Difference</Tab>
                <Tab>Time Zones</Tab>
                <Tab>Duration</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack spacing={6}>
                    <Text className={openSans.className} color={textColor} textAlign="center">
                      Calculate the difference between two times
                    </Text>
                    
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} w="full">
                      <FormControl>
                        <FormLabel color={textColor}>Start Time</FormLabel>
                        <Input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          color={textColor}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel color={textColor}>End Time</FormLabel>
                        <Input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          color={textColor}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel color={textColor}>Difference</FormLabel>
                        <Input
                          value={timeDifference}
                          readOnly
                          bg={navBackgroundColor}
                          color={textColor}
                          placeholder="Result will appear here"
                        />
                      </FormControl>
                    </Grid>
                    
                    <Button colorScheme="blue" onClick={calculateTimeDifference} className={openSans.className}>
                      Calculate Difference
                    </Button>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack spacing={6}>
                    <Text className={openSans.className} color={textColor} textAlign="center">
                      Time zone conversion feature coming soon!
                    </Text>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack spacing={6}>
                    <Text className={openSans.className} color={textColor} textAlign="center">
                      Duration calculator feature coming soon!
                    </Text>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          <Box bg={navBackgroundColor} p={6} borderRadius="lg">
            <VStack spacing={4} align="start">
              <Heading size="md" className={openSans.className} color={textColor}>
                Time Conversion Examples
              </Heading>
              <Text className={openSans.className} color={textColor}>
                • 1 hour = 60 minutes = 3,600 seconds
              </Text>
              <Text className={openSans.className} color={textColor}>
                • 1 day = 24 hours = 1,440 minutes
              </Text>
              <Text className={openSans.className} color={textColor}>
                • 1 week = 7 days = 168 hours
              </Text>
              <Text className={openSans.className} color={textColor}>
                • 1 year = 365 days = 8,760 hours
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
}