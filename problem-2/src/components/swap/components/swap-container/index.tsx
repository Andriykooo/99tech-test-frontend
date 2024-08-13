"use client";

import { FC, useEffect, useState } from "react";
import { pricesApi } from "../../../../api/prices/api";
import { Price } from "../../../../api/prices/types";
import { SwapForm } from "../swap-form";

export const SwapContainer: FC = () => {
  const [prices, setPrices] = useState<Price[]>([]);

  useEffect(() => {
    pricesApi.getPrices().then((data) => {
      setPrices(data);
    });
  }, []);

  const options = prices?.map((price) => {
    return {
      id: `${price.currency}-${price.date}`,
      image: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${price.currency}.svg`,
      ...price,
    };
  });

  return options.length > 0 ? <SwapForm options={options} /> : null;
};
