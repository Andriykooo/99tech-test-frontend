import { FC } from "react";

export const Spinner: FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full size-5 border-2 border-white border-t-transparent border-solid"></div>
    </div>
  );
};
