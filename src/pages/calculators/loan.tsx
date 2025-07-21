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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import Layout from '@/components/Layout';
import { openSans } from '@/contants';

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule?: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export default function LoanCalculator() {
  const { textColor, navBackgroundColor } = useThemeColor();
  const cardBg = useColorModeValue('white', 'gray.700');

  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [result, setResult] = useState<LoanResult | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const termYears = parseFloat(loanTerm);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(termYears) || principal <= 0 || termYears <= 0) {
      return;
    }

    const monthlyRate = annualRate / 12;
    const numPayments = termYears * 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      // If no interest
      monthlyPayment = principal / numPayments;
    } else {
      // Standard loan formula
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                     (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;

    // Generate payment schedule
    const schedule = [];
    let remainingBalance = principal;

    for (let month = 1; month <= numPayments; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      // Ensure balance doesn't go negative due to rounding
      if (remainingBalance < 0.01) remainingBalance = 0;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance,
      });
    }

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      schedule,
    });
  };

  const clearCalculator = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setResult(null);
    setShowSchedule(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Layout title="Loan Calculator - Monthly Payment & Interest Calculator">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading 
              size="xl" 
              className={openSans.className} 
              color={textColor}
              mb={4}
            >
              Loan Calculator
            </Heading>
            <Text 
              fontSize="lg" 
              className={openSans.className} 
              color={textColor}
            >
              Calculate monthly payments, total interest, and view payment schedules for your loan.
            </Text>
          </Box>

          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={8}>
            <Box bg={cardBg} p={6} borderRadius="lg" border="1px" borderColor="gray.200">
              <VStack spacing={6}>
                <Heading size="md" className={openSans.className} color={textColor}>
                  Loan Details
                </Heading>

                <FormControl>
                  <FormLabel color={textColor}>Loan Amount ($)</FormLabel>
                  <Input
                    type="number"
                    placeholder="250000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    color={textColor}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color={textColor}>Annual Interest Rate (%)</FormLabel>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="3.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    color={textColor}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color={textColor}>Loan Term (Years)</FormLabel>
                  <Input
                    type="number"
                    placeholder="30"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    color={textColor}
                  />
                </FormControl>

                <HStack spacing={4} w="full">
                  <Button 
                    colorScheme="blue" 
                    onClick={calculateLoan} 
                    className={openSans.className}
                    flex={1}
                  >
                    Calculate
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={clearCalculator} 
                    className={openSans.className}
                    flex={1}
                  >
                    Clear
                  </Button>
                </HStack>
              </VStack>
            </Box>

            {result && (
              <Box bg={cardBg} p={6} borderRadius="lg" border="1px" borderColor="gray.200">
                <VStack spacing={6}>
                  <Heading size="md" className={openSans.className} color={textColor}>
                    Loan Summary
                  </Heading>

                  <Grid templateColumns="1fr" gap={4} w="full">
                    <Box bg={navBackgroundColor} p={4} borderRadius="lg" textAlign="center">
                      <Text className={openSans.className} color={textColor} fontSize="sm" mb={1}>
                        Monthly Payment
                      </Text>
                      <Text className={openSans.className} color={textColor} fontSize="2xl" fontWeight="bold">
                        {formatCurrency(result.monthlyPayment)}
                      </Text>
                    </Box>

                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <Box bg={navBackgroundColor} p={4} borderRadius="lg" textAlign="center">
                        <Text className={openSans.className} color={textColor} fontSize="sm" mb={1}>
                          Total Payment
                        </Text>
                        <Text className={openSans.className} color={textColor} fontSize="lg" fontWeight="bold">
                          {formatCurrency(result.totalPayment)}
                        </Text>
                      </Box>

                      <Box bg={navBackgroundColor} p={4} borderRadius="lg" textAlign="center">
                        <Text className={openSans.className} color={textColor} fontSize="sm" mb={1}>
                          Total Interest
                        </Text>
                        <Text className={openSans.className} color={textColor} fontSize="lg" fontWeight="bold">
                          {formatCurrency(result.totalInterest)}
                        </Text>
                      </Box>
                    </Grid>
                  </Grid>

                  <Button 
                    colorScheme="green" 
                    onClick={() => setShowSchedule(!showSchedule)}
                    className={openSans.className}
                    w="full"
                  >
                    {showSchedule ? 'Hide' : 'Show'} Payment Schedule
                  </Button>
                </VStack>
              </Box>
            )}
          </Grid>

          {result && showSchedule && result.schedule && (
            <Box bg={cardBg} p={6} borderRadius="lg" border="1px" borderColor="gray.200">
              <VStack spacing={4}>
                <HStack justify="space-between" w="full">
                  <Heading size="md" className={openSans.className} color={textColor}>
                    Payment Schedule
                  </Heading>
                  <Badge colorScheme="blue" fontSize="sm">
                    {result.schedule.length} payments
                  </Badge>
                </HStack>

                <TableContainer w="full" maxH="400px" overflowY="auto">
                  <Table size="sm" variant="striped">
                    <Thead position="sticky" top={0} bg={navBackgroundColor}>
                      <Tr>
                        <Th color={textColor}>Month</Th>
                        <Th color={textColor}>Payment</Th>
                        <Th color={textColor}>Principal</Th>
                        <Th color={textColor}>Interest</Th>
                        <Th color={textColor}>Balance</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {result.schedule.slice(0, 12).map((payment, index) => (
                        <Tr key={index}>
                          <Td color={textColor}>{payment.month}</Td>
                          <Td color={textColor}>{formatCurrency(payment.payment)}</Td>
                          <Td color={textColor}>{formatCurrency(payment.principal)}</Td>
                          <Td color={textColor}>{formatCurrency(payment.interest)}</Td>
                          <Td color={textColor}>{formatCurrency(payment.balance)}</Td>
                        </Tr>
                      ))}
                      {result.schedule.length > 12 && (
                        <Tr>
                          <Td colSpan={5} textAlign="center" color={textColor} fontSize="sm">
                            ... and {result.schedule.length - 12} more payments
                          </Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </VStack>
            </Box>
          )}

          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
            <Box bg={navBackgroundColor} p={6} borderRadius="lg">
              <VStack spacing={4} align="start">
                <Heading size="md" className={openSans.className} color={textColor}>
                  How Loan Payments Work
                </Heading>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • Early payments go mostly toward interest
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • Later payments go mostly toward principal
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • Total interest depends on loan amount, rate, and term
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  • Shorter terms mean higher payments but less total interest
                </Text>
              </VStack>
            </Box>

            <Box bg={navBackgroundColor} p={6} borderRadius="lg">
              <VStack spacing={4} align="start">
                <Heading size="md" className={openSans.className} color={textColor}>
                  Loan Formula
                </Heading>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  <strong>Monthly Payment Formula:</strong>
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  M = P × [r(1+r)ⁿ] / [(1+r)ⁿ-1]
                </Text>
                <Text className={openSans.className} color={textColor} fontSize="sm">
                  Where: M = Monthly payment, P = Principal, r = Monthly rate, n = Number of payments
                </Text>
              </VStack>
            </Box>
          </Grid>
        </VStack>
      </Container>
    </Layout>
  );
}