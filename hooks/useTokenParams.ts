import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_TOKEN_KEY = "userAuthToken";
const LOCAL_STORAGE_DATE_KEY = "firstDownloadDate";

export const useTokenParams = (): {
  token: string | null;
  firstDownloadDate: string | null;
  isFirstDownload: boolean;
  isLoading: boolean;
} => {
  const [token, setToken] = useState<string | null>(null);
  const [firstDownloadDate, setFirstDownloadDate] = useState<string | null>(null);
  const [isFirstDownload, setIsFirstDownload] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const storageToken = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        const storageDate = await AsyncStorage.getItem(LOCAL_STORAGE_DATE_KEY);

        if (storageDate) {
          setFirstDownloadDate(storageDate);
        } else {
          const downloadDate = dayjs().format("DD/MM/YYYY");
          await AsyncStorage.setItem(LOCAL_STORAGE_DATE_KEY, downloadDate);
          setFirstDownloadDate(downloadDate);
        }

        if (storageToken) {
          setToken(storageToken);
          setIsFirstDownload(false);
        } else {
          setIsFirstDownload(true);
          const newToken = uuidv4();
          await AsyncStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, newToken);
          setToken(newToken);
        }
      } catch (error) {
        console.error("Error accessing AsyncStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getToken();
  }, []);

  return { token, firstDownloadDate, isFirstDownload, isLoading };
};
