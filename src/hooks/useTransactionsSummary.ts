import { useState, useEffect } from "react";
import { ExtractTransaction } from "../interfaces";
import { fetchExtract } from "../services/apiService";

export const useTransactionsSummary = () => {
  const [extract, setExtract] = useState<ExtractTransaction | null>(null);

  useEffect(() => {
    const loadExtract = async () => {
      try {
        const data = await fetchExtract();
        setExtract(data);
      } catch (error) {
        console.error("Failed to load transactions", error);
      }
    };

    loadExtract();
  }, []);

  return extract;
};
