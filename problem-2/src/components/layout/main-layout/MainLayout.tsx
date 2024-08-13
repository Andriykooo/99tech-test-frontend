import { FC, PropsWithChildren } from "react";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="min-h-screen max-w-screen-sm w-full mx-auto p-4 md:p-24">
      {children}
    </main>
  );
};
