# Tax Calculator USA 🧮💰

A modern React Native mobile application for calculating USA federal and state taxes for the 2024 tax year. Features real-time tax calculations with accurate tax brackets, standard deductions, and includes Google AdMob integration for monetization.

## Features ✨

- **Accurate 2024 Tax Calculations**
  - Federal income tax with all 7 tax brackets
  - Social Security and Medicare taxes (FICA)
  - State income tax (simplified calculation)
  - Standard deductions with age/blindness adjustments

- **Beautiful Modern UI**
  - Material Design components with React Native Paper
  - Responsive design for all screen sizes
  - Intuitive input forms with validation
  - Professional results display with charts and breakdowns

- **AdMob Integration**
  - Banner ads for monetization
  - Test ads for development
  - COPPA-compliant configuration

- **Comprehensive Tax Features**
  - Multiple filing statuses support
  - Dependent calculations
  - Effective vs. marginal tax rate display
  - Monthly breakdown calculations
  - Age 65+ and blindness deduction adjustments

## Screenshots 📱

*Screenshots will be available after running the app*

## Requirements 📋

- Node.js (v16 or higher)
- React Native development environment
- Android SDK (for Android development)
- Xcode (for iOS development, macOS only)

## Installation 🚀

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tax-calculator-usa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Android Setup**
   ```bash
   # For Android development
   npx react-native run-android
   ```

4. **iOS Setup** (macOS only)
   ```bash
   # Install iOS dependencies
   cd ios && pod install && cd ..
   
   # Run on iOS
   npx react-native run-ios
   ```

## AdMob Setup 🔧

### For Production Use:

1. **Create a Google AdMob Account**
   - Go to [Google AdMob](https://www.google.com/admob/)
   - Create an account and add your app

2. **Get Your AdMob App ID**
   - In AdMob console, create an app
   - Get your App ID (format: ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy)

3. **Update Configuration**
   
   **Android:**
   - Replace the AdMob App ID in `android/app/src/main/AndroidManifest.xml`:
   ```xml
   <meta-data
       android:name="com.google.android.gms.ads.APPLICATION_ID"
       android:value="YOUR_ADMOB_APP_ID"/>
   ```
   
   - Replace `android/app/google-services.json` with your own from Firebase Console

4. **Create Ad Units**
   - In AdMob console, create banner ad units
   - Replace test ad unit IDs in `src/components/AdBanner.tsx`

### For Development:
The app is configured with test ad unit IDs by default, so ads will show during development without any additional setup.

## Project Structure 📁

```
src/
├── components/          # Reusable UI components
│   ├── AdBanner.tsx    # AdMob banner component
│   ├── TaxInputForm.tsx # Tax calculation input form
│   └── TaxResults.tsx  # Results display component
├── types/              # TypeScript type definitions
│   └── index.ts        # Tax calculation interfaces
├── utils/              # Utility functions
│   └── taxCalculator.ts # Tax calculation logic
└── App.tsx             # Main app component
```

## Tax Calculation Details 📊

### 2024 Federal Tax Brackets

**Single Filers:**
- 10%: $0 - $11,600
- 12%: $11,600 - $47,150
- 22%: $47,150 - $100,525
- 24%: $100,525 - $191,625
- 32%: $191,625 - $243,725
- 35%: $243,725 - $609,350
- 37%: $609,350+

**Married Filing Jointly:**
- 10%: $0 - $23,200
- 12%: $23,200 - $94,300
- 22%: $94,300 - $201,050
- 24%: $201,050 - $383,250
- 32%: $383,250 - $487,450
- 35%: $487,450 - $731,200
- 37%: $731,200+

### 2024 Standard Deductions
- Single: $14,600
- Married Filing Jointly: $29,200
- Married Filing Separately: $14,600
- Head of Household: $21,900

### Additional Deductions
- Age 65+: Additional $1,950 (single) or $1,550 (married)
- Blindness: Additional $1,950 (single) or $1,550 (married)

### Payroll Taxes
- Social Security: 6.2% on wages up to $160,200
- Medicare: 1.45% on all wages
- Additional Medicare: 0.9% on wages over $200,000 (single) or $250,000 (married filing jointly)

## Development 🛠️

### Running the Development Server
```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios
```

### Building for Production

**Android:**
```bash
# Generate signed APK
cd android
./gradlew assembleRelease
```

**iOS:**
```bash
# Build for App Store
npx react-native run-ios --configuration Release
```

## Customization 🎨

### Changing Colors
Edit the theme in `src/App.tsx`:
```typescript
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976d2',  // Your primary color
    accent: '#2196f3',   // Your accent color
  },
};
```

### Adding State-Specific Tax Calculations
The current implementation uses a simplified 5% state tax rate. To add specific state tax brackets:

1. Create state-specific tax bracket data in `src/utils/taxCalculator.ts`
2. Update the `calculateTax` function to use state-specific calculations
3. Add state selection with specific tax rates

### Customizing Ad Placement
Edit `src/App.tsx` to change ad placement:
- Add more ad banners
- Implement interstitial ads
- Add rewarded video ads

## Testing 🧪

```bash
# Run tests
npm test

# Run linting
npm run lint
```

## Deployment 📦

### Google Play Store (Android)
1. Generate a signed APK or AAB
2. Create a Google Play Developer account
3. Upload your app following Google's guidelines
4. Ensure AdMob compliance

### Apple App Store (iOS)
1. Build for production
2. Create an Apple Developer account
3. Use Xcode to upload to App Store Connect
4. Follow Apple's review guidelines

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Legal & Compliance ⚖️

### Tax Calculation Disclaimer
This app provides estimates for educational purposes only. Users should consult with tax professionals for official tax advice. Tax laws may change, and this calculator may not reflect all deductions, credits, or special circumstances.

### Privacy & AdMob
- The app is configured to be COPPA-compliant
- No personal data is collected or stored
- AdMob ads are served according to Google's privacy policies

## License 📄

MIT License - see [LICENSE](LICENSE) file for details.

## Support 🆘

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review tax calculation logic in `src/utils/taxCalculator.ts`

## Acknowledgments 🙏

- Built with React Native and TypeScript
- UI components by React Native Paper
- Ad integration by Google AdMob
- Tax bracket data from IRS 2024 publications

---

**Note:** This is a demonstration app. For production use, ensure all AdMob configurations are properly set up with your own AdMob account and ad unit IDs.
