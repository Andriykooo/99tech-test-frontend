const priority = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
} as const;

type Blockchain = keyof typeof priority;

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

const getPriority = (blockchain: Blockchain): number => {
  return priority?.[blockchain] || -99;
};

const WalletPage: React.FC<BoxProps> = (props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances: WalletBalance[] = useMemo(
    () =>
      balances
        .filter(
          (balance: WalletBalance) =>
            getPriority(balance.blockchain) > -99 && balance.amount > 0
        )
        .sort(
          (lhs: WalletBalance, rhs: WalletBalance) =>
            getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
        ),
    [balances]
  );

  return (
    <div {...props}>
      {formattedBalances.map((balance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        const formattedAmount = balance.amount.toFixed();

        return (
          <WalletRow
            className={classes.row}
            key={balance.currency}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={formattedAmount}
          />
        );
      })}
    </div>
  );
};
