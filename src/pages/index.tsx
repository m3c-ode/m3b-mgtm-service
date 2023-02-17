import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import clientPromise from '../../lib/mongodb';
import utilStyles from '../styles/utils.module.css';
import Image from 'next/image';
import Link from 'next/link';

const APP_NAME = 'm3b - management system';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};


// Landing page. Short introduction and login page
export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container">
      <Head>
        <title>{APP_NAME}</title>
        <link rel="icon" href="/images/logom3b.png" />
      </Head>

      <Image
        src={'/../public/images/logom3b.png'}
        alt='logo'
        width={144}
        height={144}
        priority
      />
      <h1 className={utilStyles.heading2Xl}>{APP_NAME}</h1>


      <section className={utilStyles.headingMd}>
        <p className={utilStyles.headingLg}>Welcome to m3.beer management system!</p>
        <p>This app is a personal project currently part of my portfolio. It's a CRUD app using the NextJS Meta framework. It's still under progress, as many features could be added.</p>
        <p>Using this platform, you'll be able to:</p>
        <ul>
          <li>Create and manage your products</li>
          <li>Check and manage your inventory</li>
          <li>Create and manage your recipes</li>
        </ul>
        <p>Potential features:
          <ul>
            <li>Client base management</li>
            <li>Delivery management</li>
            <li>Admin and Company access</li>
            <li>Orders and Invoices management</li>
            <li>Personalized shopping page for clients</li>
          </ul>
        </p>
      </section>

      {isConnected ? (
        <h2 className="description">You are connected to MongoDB</h2>
      ) : (
        <h2 className="description">
          You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
          for instructions.
        </h2>
      )}

      {/* TODO: add login process */}
      <div className="accessButton">
        <Link href={'/dashboard'}>Access your Dashboard</Link>
      </div>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>
    </div>
  );
}
