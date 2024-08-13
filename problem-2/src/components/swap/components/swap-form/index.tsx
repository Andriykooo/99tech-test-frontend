import { FC, FormEvent, useState } from "react";
import { Form } from "../../../ui/form";
import { Autocomplete } from "../../../ui/autocomplete";
import { Button } from "../../../ui/button";
import { GetRateInputs, Price } from "../../../../api/prices/types";
import { SwapIcon } from "../../../ui/icons/swap.icon";
import { Spinner } from "../../../ui/spinner/indes";
import { pricesApi } from "../../../../api/prices/api";
import { _debounce } from "../../../../helpers/debounce";

type Option = Price & {
  id: string;
  image: string;
};

type SwapFormProps = {
  options: Option[];
};

enum CurrencySelectType {
  FROM = "from",
  TO = "to",
}

const debounce = _debounce();

export const SwapForm: FC<SwapFormProps> = ({ options }) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useState({
    [CurrencySelectType.FROM]: options[0],
    [CurrencySelectType.TO]: options[1],
  });

  const fetchRate = async ({
    fromCurrencyPrice,
    toCurrencyPrice,
    amount,
  }: GetRateInputs) => {
    setLoading(true);

    const rate = await pricesApi.getRate({
      fromCurrencyPrice,
      toCurrencyPrice,
      amount,
    });

    setRate(rate ? rate.toString() : "");
    setLoading(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setAmount("");
      setRate("");
      setLoading(false);
    }, 300);
  };

  const handleSwap = () => {
    setCurrency({
      [CurrencySelectType.FROM]: currency[CurrencySelectType.TO],
      [CurrencySelectType.TO]: currency[CurrencySelectType.FROM],
    });

    fetchRate({
      fromCurrencyPrice: currency[CurrencySelectType.TO].price,
      toCurrencyPrice: currency[CurrencySelectType.FROM].price,
      amount: Number(amount),
    });
  };

  const handleChange = (value: string) => {
    setAmount(value);

    debounce(() =>
      fetchRate({
        fromCurrencyPrice: currency[CurrencySelectType.FROM].price,
        toCurrencyPrice: currency[CurrencySelectType.TO].price,
        amount: Number(value),
      })
    );
  };

  const handleSelect = (option: Option, selectType: CurrencySelectType) => {
    const updatedCurrency = {
      ...currency,
      [selectType]: option,
    };

    setCurrency(updatedCurrency);

    fetchRate({
      fromCurrencyPrice: updatedCurrency[CurrencySelectType.FROM].price,
      toCurrencyPrice: updatedCurrency[CurrencySelectType.TO].price,
      amount: Number(amount),
    });
  };

  const renderOption = (option: Option) => {
    return (
      <div className="flex gap-1 items-center">
        <img
          src={option.image}
          alt={option.currency}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        {option.currency}
      </div>
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Autocomplete<Option>
        label="Amount to send"
        options={options}
        value={amount}
        selectedOption={currency[CurrencySelectType.FROM]}
        onChange={handleChange}
        onSelect={(option) => handleSelect(option, CurrencySelectType.FROM)}
        renderOption={renderOption}
        className="mb-4"
      />

      <SwapIcon
        onClick={handleSwap}
        className="cursor-pointer p-1 absolute right-4 -mt-1 hover:bg-gray-200 rounded-sm"
        height={24}
        width={24}
      />

      <Autocomplete<Option>
        label="Amount to receive"
        options={options}
        value={rate}
        disabled
        selectedOption={currency[CurrencySelectType.TO]}
        onSelect={(option) => handleSelect(option, CurrencySelectType.TO)}
        renderOption={renderOption}
        className="mb-4"
      />
      <Button disabled={Number(amount) === 0} type="submit">
        {loading ? <Spinner /> : "Confirm"}
      </Button>
    </Form>
  );
};
