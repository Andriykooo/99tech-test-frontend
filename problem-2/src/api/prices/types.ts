export type Price = {
  currency: string;
  date: Date;
  price: number;
};

export type GetRateInputs = {
  fromCurrencyPrice: number;
  toCurrencyPrice: number;
  amount: number;
};
