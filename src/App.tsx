import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme,
  Appbar,
} from 'react-native-paper';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

import TaxInputForm from './components/TaxInputForm';
import TaxResults from './components/TaxResults';
import AdBanner from './components/AdBanner';
import { calculateTax } from './utils/taxCalculator';
import { TaxInputs, TaxCalculationResult } from './types';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976d2',
    accent: '#2196f3',
    background: '#f5f5f5',
    surface: '#ffffff',
  },
};

const App: React.FC = () => {
  const [result, setResult] = useState<TaxCalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize Google Mobile Ads
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('AdMob initialized:', adapterStatuses);
      })
      .catch(error => {
        console.error('AdMob initialization failed:', error);
      });

    // Configure ads settings
    mobileAds()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,
        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,
        // Indicates that you want the ad request to be handled in a manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
        // An array of test device IDs to allow.
        testDeviceIdentifiers: ['EMULATOR'],
      })
      .then(() => {
        console.log('AdMob request configuration updated');
      });
  }, []);

  const handleCalculate = async (inputs: TaxInputs) => {
    setIsLoading(true);
    try {
      // Simulate a brief loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const calculationResult = calculateTax(inputs);
      setResult(calculationResult);
    } catch (error) {
      Alert.alert('Error', 'Failed to calculate taxes. Please try again.');
      console.error('Tax calculation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
        />
        
        <Appbar.Header>
          <Appbar.Content 
            title="Tax Calculator USA" 
            subtitle="2024 Tax Year"
          />
          {result && (
            <Appbar.Action 
              icon="refresh" 
              onPress={handleReset}
            />
          )}
        </Appbar.Header>

        <View style={styles.content}>
          {/* Top Ad Banner */}
          <AdBanner />

          {!result ? (
            <TaxInputForm onCalculate={handleCalculate} />
          ) : (
            <TaxResults result={result} />
          )}

          {/* Bottom Ad Banner */}
          <AdBanner />
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
});

export default App;