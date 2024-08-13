import { FC, FormHTMLAttributes, PropsWithChildren } from "react";

export const Form: FC<
  PropsWithChildren & FormHTMLAttributes<HTMLFormElement>
> = (props) => {
  return (
    <form className="rounded-md border p-4 relative" {...props}>
      {props.children}
    </form>
  );
};
