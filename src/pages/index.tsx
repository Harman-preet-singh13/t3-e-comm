import Head from "next/head";
import Homepage from "~/components/Homepage";


export default function Home() {

  return (
    <>
      <Head>
        <title>T3-Ecomm</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="https://create.t3.gg/images/t3-light.svg" />
      </Head>
      <Homepage />
    </>
  );
}

