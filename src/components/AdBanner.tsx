import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

interface AdBannerProps {
  adUnitId?: string;
  size?: BannerAdSize;
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  adUnitId = TestIds.BANNER, 
  size = BannerAdSize.FULL_BANNER 
}) => {
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
  },
});

export default AdBanner;