import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  Checkbox,
  Menu,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';
import { TaxInputs, FilingStatus } from '../types';

interface TaxInputFormProps {
  onCalculate: (inputs: TaxInputs) => void;
}

const filingStatusOptions: { label: string; value: FilingStatus }[] = [
  { label: 'Single', value: 'single' },
  { label: 'Married Filing Jointly', value: 'marriedFilingJointly' },
  { label: 'Married Filing Separately', value: 'marriedFilingSeparately' },
  { label: 'Head of Household', value: 'headOfHousehold' },
];

const TaxInputForm: React.FC<TaxInputFormProps> = ({ onCalculate }) => {
  const theme = useTheme();
  const [income, setIncome] = useState('');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [state, setState] = useState('CA');
  const [dependents, setDependents] = useState('0');
  const [age, setAge] = useState('');
  const [blindness, setBlindness] = useState(false);
  const [showFilingMenu, setShowFilingMenu] = useState(false);

  const handleCalculate = () => {
    if (!income || !age) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const annualIncome = parseFloat(income);
    const ageNum = parseInt(age);
    const dependentsNum = parseInt(dependents);

    if (isNaN(annualIncome) || annualIncome < 0) {
      Alert.alert('Error', 'Please enter a valid income amount');
      return;
    }

    if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
      Alert.alert('Error', 'Please enter a valid age');
      return;
    }

    const inputs: TaxInputs = {
      annualIncome,
      filingStatus,
      state,
      dependents: dependentsNum,
      age: ageNum,
      blindness,
    };

    onCalculate(inputs);
  };

  const formatCurrency = (value: string) => {
    const number = value.replace(/[^0-9]/g, '');
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleIncomeChange = (text: string) => {
    const formatted = formatCurrency(text);
    setIncome(formatted);
  };

  return (
    <PaperProvider>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Tax Calculator</Title>
          <Paragraph style={styles.subtitle}>
            Calculate your 2024 federal and state taxes
          </Paragraph>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.inputContainer}>
              <TextInput
                label="Annual Income *"
                value={income}
                onChangeText={handleIncomeChange}
                keyboardType="numeric"
                mode="outlined"
                left={<TextInput.Icon icon="currency-usd" />}
                style={styles.input}
              />

              <Menu
                visible={showFilingMenu}
                onDismiss={() => setShowFilingMenu(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setShowFilingMenu(true)}
                    style={styles.input}
                    contentStyle={styles.menuButton}
                  >
                    {filingStatusOptions.find(opt => opt.value === filingStatus)?.label}
                  </Button>
                }
              >
                {filingStatusOptions.map((option) => (
                  <Menu.Item
                    key={option.value}
                    onPress={() => {
                      setFilingStatus(option.value);
                      setShowFilingMenu(false);
                    }}
                    title={option.label}
                  />
                ))}
              </Menu>

              <TextInput
                label="State"
                value={state}
                onChangeText={setState}
                mode="outlined"
                left={<TextInput.Icon icon="map-marker" />}
                style={styles.input}
              />

              <TextInput
                label="Number of Dependents"
                value={dependents}
                onChangeText={setDependents}
                keyboardType="numeric"
                mode="outlined"
                left={<TextInput.Icon icon="account-group" />}
                style={styles.input}
              />

              <TextInput
                label="Age *"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                mode="outlined"
                left={<TextInput.Icon icon="calendar" />}
                style={styles.input}
              />

              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={blindness ? 'checked' : 'unchecked'}
                  onPress={() => setBlindness(!blindness)}
                />
                <Paragraph style={styles.checkboxLabel}>
                  I am legally blind
                </Paragraph>
              </View>

              <Button
                mode="contained"
                onPress={handleCalculate}
                style={styles.calculateButton}
                contentStyle={styles.buttonContent}
                icon="calculator"
              >
                Calculate Taxes
              </Button>
            </View>
          </ScrollView>
        </Card.Content>
      </Card>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  inputContainer: {
    paddingBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  menuButton: {
    justifyContent: 'flex-start',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxLabel: {
    marginLeft: 8,
    flex: 1,
  },
  calculateButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default TaxInputForm;