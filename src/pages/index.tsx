import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import clientPromise from '../../lib/mongodb';
import utilStyles from '../styles/utils.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useSession, signIn, signOut } from "next-auth/react";

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
    <>
      {/* // <div className="container"> */}
      <Head>
        <title>{APP_NAME}</title>
        <link rel="icon" href="/images/logom3b.png" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossOrigin="anonymous" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossOrigin="anonymous" />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient bg-opacity">
        <div className="container">
          <a className="navbar-brand" href="#!">m3.code portfolio</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#!">Contact</a></li>
            </ul>
          </div> */}
        </div>
      </nav>
      <header className="py-5 bg-image-fluid" style={{
        backgroundImage: `url('https://source.unsplash.com/sdkzmwHHqU0')`,
        backgroundSize: 'cover'

      }}>
        <div className="text-center my-5">
          <img className="img-fluid rounded-circle mb-4" src="/images/logom3b.png" alt="logo" width={144} height={144} />
          <h1 className="text-white fs-3 fw-bolder">m3b - management service</h1>
          <p className="text-white-50 mb-0">A portfolio application</p>
        </div>
      </header>

      {/* <Image
        src={'/images/logom3b.png'}
        alt='logo'
        width={144}
        height={144}
        priority
        style={{ marginTop: '2rem' }}
      /> */}
      <section className="py-5">
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <h2 className='blue'>Welcome to m3.beer management system!</h2>
              <p className="lead py-2">This app is a personal project currently part of my portfolio. It's an example of CRUD app tailored for the beer beverage industry.</p>
              <p className=''>It is coded using the NextJS Meta framework connected to a MongoDB Database. It's still under progress, as many features could be added.</p>
              <p className="mb-2">Using this platform, you'll be able to:</p>
              <ul>
                <li>Create and manage your products</li>
                <li>Check and manage your inventory</li>
                <li>Create and manage your clients</li>
              </ul>
              <p className="mb-2">Potential features:</p>
              <ul>
                <li>Recipe management</li>
                <li>Delivery management</li>
                <li>Admin and Company access</li>
                <li>Orders and Invoices management</li>
                <li>Personalized shopping page for clients</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* <h1 className={utilStyles.heading2Xl}>{APP_NAME}</h1>


      <section className={utilStyles.headingMd}>
        <p className={utilStyles.headingLg}>Welcome to m3.beer management system!</p>
        <p>This app is a personal project currently part of my portfolio. It's a CRUD app using the NextJS Meta framework connected to a MongoDB Database. It's still under progress, as many features could be added.</p>
        <p>Using this platform, you'll be able to:</p>
        <ul>
          <li>Create and manage your products</li>
          <li>Check and manage your inventory</li>
          <li>Create and manage your recipes</li>
        </ul>
        <p>Potential features:</p>
        <ul>
          <li>Client base management</li>
          <li>Delivery management</li>
          <li>Admin and Company access</li>
          <li>Orders and Invoices management</li>
          <li>Personalized shopping page for clients</li>
        </ul>
      </section> */}
      {/* <!-- Content section--> */}
      <section className="py-4 bg-dark text-light text-center bg-gradient" /* style={{ "--bs-bg-opacity": .8 }} */>
        <div className="container my-4">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="accessButton mb-4">
                {/* TODO: change redirection to a signIn function with admin credentials */}
                {/* <Link className='btn btn-lg btn-outline-light' href={'/dashboard/beers'}>Access your Dashboard</Link> */}
                <button className='btn btn-lg btn-outline-light' onClick={
                  // () => signIn()
                  async () => {
                    await signIn('credentials', {
                      // userInfo.email/passwor,d from a state variable
                      email: 'admin@m3b-ms.ca',
                      password: '1111',
                      callbackUrl: '/dashboard/beers'
                    });
                  }
                }>Access Dashboard as Admin</button>
                <div className="accessButton mt-4">

                  <button className='btn btn-lg btn-outline-light' onClick={
                    // () => signIn()
                    () =>
                      signIn('Credentials', {
                        callbackUrl: '/dashboard/beers'
                      }
                      )
                  }>Login</button>
                </div>
              </div>
              {/* <div>
                <button onClick={() =>
                  signIn('Credentials', {
                    callbackUrl: '/dashboard/beers'
                  }
                  )}
                >Login test</button>
              </div> */}
              {/* <p className="lead">The background images used in this template are sourced from Unsplash and are open
                source and free to use.</p> */}
              {isConnected ? (
                <p className="mb-0">You are connected to MongoDB</p>
              ) : (
                <p className="mb-0">You are NOT connected to MongoDB. Please contact me for troubleshooting.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* 
      {isConnected ? (
        <h2 className="description">You are connected to MongoDB</h2>
      ) : (
        <h2 className="description">
          You are NOT connected to MongoDB. Please contact me for troubleshooting.
        </h2>
      )} */}

      {/* TODO: add login process */}
      {/* <div className="accessButton">
        <Link className='btn btn-lg btn-outline-dark' href={'/dashboard/beers'}>Access your Dashboard</Link>
      </div> */}

      <footer className="py-4 bg-lkght">
        <div className="container">
          <div className='text-center'>

            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{' '}
              <img src="/vercel.svg" alt="Vercel Logo" className="logo" width={80} />
            </a>
          </div>
        </div>
      </footer>
      {/* // </div> */}
    </>
  );
}
