import { useEffect, useState } from 'react';
import * as Updates from 'expo-updates';
import { ActivityIndicator } from 'react-native';

export const useCheckUpdates = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!__DEV__) {
      const checkForUpdates = async () => {
        try {
          // 1. Check if a new update is available
          const update = await Updates.checkForUpdateAsync();

          if (update.isAvailable) {
            // 2. If yes, download it
            await Updates.fetchUpdateAsync();
            // 3. Restart the app to apply the update
            await Updates.reloadAsync();
          } else {
            // 4. If no update is available, mark the app as ready
            setIsReady(true);
          }
        } catch (error) {
          // Handle errors here, e.g., network error
          // For production, you might want to log this to a service
          console.error('Error fetching updates: ', error);
          // In case of error, we still want to show the app
          setIsReady(true);
        }
      };

      checkForUpdates();
    } else {
      // In development mode, mark as ready immediately
      setIsReady(true);
    }
  }, []); // The empty dependency array ensures this runs only once on start

  // While isReady is false, show the loading screen
  if (!isReady) {
    return true;
  }

  return null;
};
