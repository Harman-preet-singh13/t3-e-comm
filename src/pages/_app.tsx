import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import NavBar from "~/components/Navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NavBar />
      <Component {...pageProps} />
      <p className="text-center my-5">
        {" "}
        <a
          href="https://www.harmanpreetsingh.me/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by{" "}
          <span className="text-blue-500 hover:underline">
            Harmanpreet Singh
          </span>
        </a>
      </p>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
