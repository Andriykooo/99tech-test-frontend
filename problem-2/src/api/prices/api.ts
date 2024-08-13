import { pricesEndpoitns } from "./endpoints";
import { GetRateInputs, Price } from "./types";

class PricesApi {
  getPrices = async (): Promise<Price[]> => {
    const response = await fetch(pricesEndpoitns.prices);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  };

  getRate = async ({
    fromCurrencyPrice,
    toCurrencyPrice,
    amount,
  }: GetRateInputs): Promise<number> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        const rate = toCurrencyPrice / fromCurrencyPrice;
        resolve(Number(amount) * rate);
      }, 300);
    });
  };
}

export const pricesApi = new PricesApi();
