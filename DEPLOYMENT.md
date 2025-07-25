# Deployment Guide - Tax Calculator USA

## Pre-deployment Checklist ✅

### 1. AdMob Configuration
- [ ] Replace test AdMob App ID in `android/app/src/main/AndroidManifest.xml`
- [ ] Replace `android/app/google-services.json` with your Firebase project file
- [ ] Update ad unit IDs in `src/components/AdBanner.tsx`
- [ ] Test ads on device/emulator

### 2. App Configuration
- [ ] Update app icons (replace placeholder paths in `app.json`)
- [ ] Verify package name: `com.taxcalculatorusa`
- [ ] Update version numbers in `package.json` and `android/app/build.gradle`
- [ ] Add app description and metadata

### 3. Legal & Compliance
- [ ] Add privacy policy (required for AdMob)
- [ ] Add terms of service
- [ ] Verify tax calculation disclaimer
- [ ] Ensure COPPA compliance settings

## Android Deployment 🤖

### Debug Build
```bash
# Run on connected device/emulator
npm run android
```

### Release Build
```bash
# Generate unsigned APK
./scripts/build-android.sh

# Or manually:
cd android
./gradlew assembleRelease
```

### Signing for Play Store
1. Generate a keystore:
```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Update `android/gradle.properties`:
```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=****
MYAPP_RELEASE_KEY_PASSWORD=****
```

3. Update `android/app/build.gradle` signing config
4. Build signed APK: `./gradlew assembleRelease`

### Google Play Store Upload
1. Create Google Play Developer account
2. Upload APK/AAB to Play Console
3. Complete store listing:
   - Screenshots (required)
   - App description
   - Privacy policy URL
   - Content rating
4. Submit for review

## iOS Deployment 🍎

### Prerequisites
- macOS with Xcode
- Apple Developer account ($99/year)

### Setup iOS Project
```bash
cd ios
pod install
```

### Development Build
```bash
npm run ios
```

### Release Build
1. Open project in Xcode: `ios/TaxCalculatorUSA.xcworkspace`
2. Configure signing & capabilities
3. Set release scheme
4. Archive and upload to App Store Connect

### App Store Upload
1. Complete App Store Connect listing
2. Add screenshots and metadata
3. Submit for App Store review

## Environment Variables 🔐

Create `.env` files for different environments:

### `.env.development`
```
ADMOB_APP_ID=ca-app-pub-3940256099942544~3347511713
ADMOB_BANNER_ID=ca-app-pub-3940256099942544/6300978111
API_BASE_URL=https://dev-api.example.com
```

### `.env.production`
```
ADMOB_APP_ID=YOUR_PRODUCTION_ADMOB_APP_ID
ADMOB_BANNER_ID=YOUR_PRODUCTION_BANNER_AD_ID
API_BASE_URL=https://api.example.com
```

## Post-deployment Monitoring 📊

### Analytics & Crash Reporting
Consider adding:
- Firebase Analytics
- Crashlytics
- Performance monitoring

### AdMob Optimization
- Monitor ad performance in AdMob console
- A/B test ad placements
- Optimize ad refresh rates
- Track revenue metrics

### App Store Optimization (ASO)
- Monitor app store rankings
- Update keywords and descriptions
- Respond to user reviews
- Regular app updates

## Maintenance Schedule 🗓️

### Quarterly Updates
- [ ] Update tax brackets for new tax year
- [ ] Review and update dependencies
- [ ] Test on latest OS versions
- [ ] Update privacy policy if needed

### Annual Updates
- [ ] Major tax law changes
- [ ] UI/UX improvements
- [ ] Performance optimizations
- [ ] Security updates

## Support & Documentation 📋

### User Support
- Create FAQ section
- Set up support email
- Monitor app store reviews
- Provide tax calculation explanations

### Developer Documentation
- Maintain API documentation
- Document calculation logic
- Keep deployment procedures updated
- Version control best practices

---

## Quick Commands Reference 🚀

```bash
# Development
npm start          # Start Metro bundler
npm run android    # Run Android app
npm run ios        # Run iOS app
npm test          # Run tests
npm run lint      # Run linter

# Production
./scripts/build-android.sh    # Build Android APK
npm run build                 # Build for production

# Maintenance
npm audit                     # Check security vulnerabilities
npm update                    # Update dependencies
npx react-native upgrade     # Upgrade React Native
```