import { FC, PropsWithChildren } from "react";

export const Title: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className="font-bold text-3xl mb-8">{children}</h1>;
};
