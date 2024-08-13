const sum_to_n_a = (n) => (n * (n + 1)) / 2;

const sum_to_n_b = (n) => (n <= 1 ? n : n + sum_to_n_b(n - 1));

const sum_to_n_c = (n) => {
  let sum = 0;
  let i = 1;

  while (i <= n) {
    sum += i;
    i++;
  }

  return sum;
};
