import { useState, useEffect } from "react";

interface Project {
  "s.no": number;
  "amt.pledged": number;
  "percentage.funded": number;
}

interface ProcessedProject {
  id: number;
  percentageFunded: number;
  amountPledged: number;
}

export const useFetch = (url: string) => {
  const [data, setData] = useState<ProcessedProject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result: Project[] = await response.json();

        const processedData: ProcessedProject[] = result.map((item) => ({
          id: item["s.no"],
          percentageFunded: item["percentage.funded"],
          amountPledged: item["amt.pledged"],
        }));

        setData(processedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};
