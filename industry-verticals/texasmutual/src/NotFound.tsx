import { JSX } from 'react';
import Head from 'next/head';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => (
  <>
    <Head>
      <title>404: NotFound</title>
    </Head>
    <div className="tm-not-found-shell">
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <p>
        <a href="/">Return to the home page</a>
      </p>
    </div>
  </>
);

export default NotFound;
