import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import Layout from '@/components/Layout';
import { openSans } from '@/contants';

export default function BasicCalculator() {
  const { textColor, navBackgroundColor } = useThemeColor();
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const cardBg = useColorModeValue('white', 'gray.700');
  const buttonBg = useColorModeValue('gray.100', 'gray.600');
  const operatorBg = useColorModeValue('blue.500', 'blue.400');

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <Layout title="Basic Calculator - Free Online Calculator">
      <Container maxW="container.md" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading 
              size="xl" 
              className={openSans.className} 
              color={textColor}
              mb={4}
            >
              Basic Calculator
            </Heading>
            <Text 
              fontSize="lg" 
              className={openSans.className} 
              color={textColor}
            >
              Perform basic arithmetic operations with this easy-to-use calculator.
            </Text>
          </Box>

          <Box bg={cardBg} p={6} borderRadius="lg" border="1px" borderColor="gray.200" maxW="400px" mx="auto">
            <VStack spacing={4}>
              <Input
                value={display}
                readOnly
                fontSize="2xl"
                textAlign="right"
                bg={navBackgroundColor}
                border="none"
                h="60px"
                color={textColor}
              />

              <Grid templateColumns="repeat(4, 1fr)" gap={2} w="full">
                <GridItem colSpan={2}>
                  <Button
                    onClick={clear}
                    bg={buttonBg}
                    _hover={{ bg: 'gray.200' }}
                    h="50px"
                    w="full"
                    color={textColor}
                  >
                    Clear
                  </Button>
                </GridItem>
                <Button
                  onClick={() => performOperation('/')}
                  bg={operatorBg}
                  color="white"
                  _hover={{ bg: 'blue.600' }}
                  h="50px"
                >
                  ÷
                </Button>
                <Button
                  onClick={() => performOperation('*')}
                  bg={operatorBg}
                  color="white"
                  _hover={{ bg: 'blue.600' }}
                  h="50px"
                >
                  ×
                </Button>

                {['7', '8', '9'].map((digit) => (
                  <Button
                    key={digit}
                    onClick={() => inputDigit(digit)}
                    bg={buttonBg}
                    _hover={{ bg: 'gray.200' }}
                    h="50px"
                    color={textColor}
                  >
                    {digit}
                  </Button>
                ))}
                <Button
                  onClick={() => performOperation('-')}
                  bg={operatorBg}
                  color="white"
                  _hover={{ bg: 'blue.600' }}
                  h="50px"
                >
                  −
                </Button>

                {['4', '5', '6'].map((digit) => (
                  <Button
                    key={digit}
                    onClick={() => inputDigit(digit)}
                    bg={buttonBg}
                    _hover={{ bg: 'gray.200' }}
                    h="50px"
                    color={textColor}
                  >
                    {digit}
                  </Button>
                ))}
                <Button
                  onClick={() => performOperation('+')}
                  bg={operatorBg}
                  color="white"
                  _hover={{ bg: 'blue.600' }}
                  h="50px"
                >
                  +
                </Button>

                {['1', '2', '3'].map((digit) => (
                  <Button
                    key={digit}
                    onClick={() => inputDigit(digit)}
                    bg={buttonBg}
                    _hover={{ bg: 'gray.200' }}
                    h="50px"
                    color={textColor}
                  >
                    {digit}
                  </Button>
                ))}
                <GridItem rowSpan={2}>
                  <Button
                    onClick={handleEquals}
                    bg="green.500"
                    color="white"
                    _hover={{ bg: 'green.600' }}
                    h="106px"
                    w="full"
                  >
                    =
                  </Button>
                </GridItem>

                <GridItem colSpan={2}>
                  <Button
                    onClick={() => inputDigit('0')}
                    bg={buttonBg}
                    _hover={{ bg: 'gray.200' }}
                    h="50px"
                    w="full"
                    color={textColor}
                  >
                    0
                  </Button>
                </GridItem>
                <Button
                  onClick={inputDecimal}
                  bg={buttonBg}
                  _hover={{ bg: 'gray.200' }}
                  h="50px"
                  color={textColor}
                >
                  .
                </Button>
              </Grid>
            </VStack>
          </Box>

          <Box bg={navBackgroundColor} p={6} borderRadius="lg">
            <VStack spacing={4} align="start">
              <Heading size="md" className={openSans.className} color={textColor}>
                How to Use
              </Heading>
              <Text className={openSans.className} color={textColor}>
                1. Click number buttons to input digits
              </Text>
              <Text className={openSans.className} color={textColor}>
                2. Click operation buttons (+, −, ×, ÷) to perform calculations
              </Text>
              <Text className={openSans.className} color={textColor}>
                3. Click = to get the result
              </Text>
              <Text className={openSans.className} color={textColor}>
                4. Click Clear to reset the calculator
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
}