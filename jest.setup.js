import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-google-mobile-ads', () => ({
  BannerAd: 'BannerAd',
  BannerAdSize: {
    FULL_BANNER: 'FULL_BANNER',
  },
  TestIds: {
    BANNER: 'ca-app-pub-3940256099942544/6300978111',
  },
  MaxAdContentRating: {
    PG: 'PG',
  },
  default: () => ({
    initialize: jest.fn(() => Promise.resolve()),
    setRequestConfiguration: jest.fn(() => Promise.resolve()),
  }),
}));