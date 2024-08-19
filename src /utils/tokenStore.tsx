import AsyncStorage from '@react-native-async-storage/async-storage';

const HAS_LAUNCHED = 'hasLaunched';
const TOKEN_KEY = 'token'; // Replace with your actual token key

export const checkLaunchAndToken = async (): Promise<'Onboarding' | 'Home' | 'Authentication'> => {
  try {
    // Check if it's the first launch
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);

    if (hasLaunched === null) {
      // First launch: Set 'hasLaunched' to 'true' and navigate to Onboarding
      await AsyncStorage.setItem(HAS_LAUNCHED, 'true');
      return 'Onboarding'; // Navigate to onboarding screen
    }

    // Check if a token is saved
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token ? 'Home' : 'Authentication'; // Navigate to Home if token exists, otherwise Login
  } catch (error) {
    console.error('Error checking launch status or token', error);
    return 'Authentication'; // Default to Login screen in case of error
  }
};
