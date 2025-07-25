import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Divider,
  useTheme,
  DataTable,
} from 'react-native-paper';
import { TaxCalculationResult } from '../types';

interface TaxResultsProps {
  result: TaxCalculationResult;
}

const TaxResults: React.FC<TaxResultsProps> = ({ result }) => {
  const theme = useTheme();

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (rate: number): string => {
    return `${rate.toFixed(2)}%`;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Summary Card */}
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Title style={styles.summaryTitle}>Tax Summary</Title>
          <View style={styles.summaryRow}>
            <Paragraph style={styles.summaryLabel}>Gross Income:</Paragraph>
            <Paragraph style={styles.summaryValue}>
              {formatCurrency(result.grossIncome)}
            </Paragraph>
          </View>
          <View style={styles.summaryRow}>
            <Paragraph style={styles.summaryLabel}>Total Tax:</Paragraph>
            <Paragraph style={[styles.summaryValue, styles.taxAmount]}>
              {formatCurrency(result.totalTax)}
            </Paragraph>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.summaryRow}>
            <Title style={styles.netIncomeLabel}>Net Income:</Title>
            <Title style={[styles.netIncomeValue, { color: theme.colors.primary }]}>
              {formatCurrency(result.netIncome)}
            </Title>
          </View>
        </Card.Content>
      </Card>

      {/* Tax Breakdown */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Tax Breakdown</Title>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>
                <Paragraph style={styles.tableLabel}>Federal Income Tax</Paragraph>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Paragraph style={styles.tableValue}>
                  {formatCurrency(result.federalTax)}
                </Paragraph>
              </DataTable.Cell>
            </DataTable.Row>
            
            <DataTable.Row>
              <DataTable.Cell>
                <Paragraph style={styles.tableLabel}>State Income Tax</Paragraph>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Paragraph style={styles.tableValue}>
                  {formatCurrency(result.stateTax)}
                </Paragraph>
              </DataTable.Cell>
            </DataTable.Row>
            
            <DataTable.Row>
              <DataTable.Cell>
                <Paragraph style={styles.tableLabel}>Social Security Tax</Paragraph>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Paragraph style={styles.tableValue}>
                  {formatCurrency(result.socialSecurityTax)}
                </Paragraph>
              </DataTable.Cell>
            </DataTable.Row>
            
            <DataTable.Row>
              <DataTable.Cell>
                <Paragraph style={styles.tableLabel}>Medicare Tax</Paragraph>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Paragraph style={styles.tableValue}>
                  {formatCurrency(result.medicareTax)}
                </Paragraph>
              </DataTable.Cell>
            </DataTable.Row>
            
            <Divider />
            
            <DataTable.Row>
              <DataTable.Cell>
                <Title style={styles.totalLabel}>Total Tax</Title>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Title style={[styles.totalValue, styles.taxAmount]}>
                  {formatCurrency(result.totalTax)}
                </Title>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
      </Card>

      {/* Tax Rates */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Tax Rates</Title>
          <View style={styles.ratesContainer}>
            <View style={styles.rateItem}>
              <Paragraph style={styles.rateLabel}>Effective Tax Rate</Paragraph>
              <Paragraph style={styles.rateValue}>
                {formatPercentage(result.effectiveRate)}
              </Paragraph>
              <Paragraph style={styles.rateDescription}>
                Percentage of total income paid in taxes
              </Paragraph>
            </View>
            
            <Divider style={styles.rateDivider} />
            
            <View style={styles.rateItem}>
              <Paragraph style={styles.rateLabel}>Marginal Tax Rate</Paragraph>
              <Paragraph style={styles.rateValue}>
                {formatPercentage(result.marginalRate)}
              </Paragraph>
              <Paragraph style={styles.rateDescription}>
                Tax rate on your next dollar of income
              </Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Monthly Breakdown */}
      <Card style={[styles.card, styles.lastCard]}>
        <Card.Content>
          <Title style={styles.cardTitle}>Monthly Breakdown</Title>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>
                <Paragraph style={styles.tableLabel}>Monthly Gross Income</Paragraph>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Paragraph style={styles.tableValue}>
                  {formatCurrency(result.grossIncome / 12)}
                </Paragraph>
              </DataTable.Cell>
            </DataTable.Row>
            
            <DataTable.Row>
              <DataTable.Cell>
                <Paragraph style={styles.tableLabel}>Monthly Tax</Paragraph>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Paragraph style={styles.tableValue}>
                  {formatCurrency(result.totalTax / 12)}
                </Paragraph>
              </DataTable.Cell>
            </DataTable.Row>
            
            <DataTable.Row>
              <DataTable.Cell>
                <Title style={styles.totalLabel}>Monthly Net Income</Title>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Title style={[styles.totalValue, { color: theme.colors.primary }]}>
                  {formatCurrency(result.netIncome / 12)}
                </Title>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  summaryCard: {
    marginBottom: 16,
    elevation: 6,
    backgroundColor: '#f8f9fa',
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  lastCard: {
    marginBottom: 32,
  },
  summaryTitle: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  cardTitle: {
    marginBottom: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  taxAmount: {
    color: '#d32f2f',
  },
  divider: {
    marginVertical: 12,
  },
  netIncomeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  netIncomeValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tableLabel: {
    fontSize: 14,
    color: '#666',
  },
  tableValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratesContainer: {
    paddingVertical: 8,
  },
  rateItem: {
    paddingVertical: 12,
  },
  rateDivider: {
    marginVertical: 8,
  },
  rateLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  rateValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 4,
  },
  rateDescription: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default TaxResults;