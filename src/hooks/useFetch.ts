import { useState, useEffect } from "react";

export interface IProject {
  "s.no": number;
  "amt.pledged": number;
  "percentage.funded": number;
}

export interface IProcessedProject {
  id: number;
  percentageFunded: number;
  amountPledged: number;
}

export const useFetch = (url: string) => {
  const [data, setData] = useState<IProcessedProject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result: IProject[] = await response.json();

        const processedData: IProcessedProject[] = result.map((item) => ({
          id: item["s.no"],
          percentageFunded: item["percentage.funded"],
          amountPledged: item["amt.pledged"],
        }));

        setData(processedData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
