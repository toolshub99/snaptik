#!/bin/bash

# Build script for Tax Calculator USA Android app

echo "🚀 Building Tax Calculator USA for Android..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf android/app/build

# Clean and install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate the release APK
echo "🔨 Building release APK..."
cd android
./gradlew clean
./gradlew assembleRelease

# Check if build was successful
if [ -f "app/build/outputs/apk/release/app-release.apk" ]; then
    echo "✅ Build successful!"
    echo "📱 APK location: android/app/build/outputs/apk/release/app-release.apk"
    
    # Copy APK to root for easy access
    cp app/build/outputs/apk/release/app-release.apk ../tax-calculator-usa.apk
    echo "📋 APK copied to: tax-calculator-usa.apk"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Build complete!"
echo ""
echo "📋 Next steps:"
echo "1. Test the APK on a device or emulator"
echo "2. Sign the APK for Play Store release"
echo "3. Upload to Google Play Console"