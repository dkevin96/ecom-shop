import React from "react";
import NavTailwind from "../components/nav/NavTailwind";
import AppFooter from "../components/Footer";
import Spinner from "../components/spinner/Spinner";
import { Helmet } from "react-helmet-async";

const LayoutHelmet = ({ children, title, loading }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title || "Home"} | Bolt</title>
        <meta
          name="description"
          content="Store built with React, Redux, Node, Express and Postgres"
        />
        <meta
          name="robots"
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href="https://localhost:3000" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bolt" />
        <meta
          property="og:description"
          content="Store built with React, Redux, Node, Express and Postgres"
        />
        <meta property="og:url" content="https://localhost:3000" />
        <meta property="og:site_name" content="Bolt" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_kevin" />
        <meta name="twitter:creator" content="@_kevin" />
        <meta
          name="twitter:description"
          content="Store built with React, Redux, Node, Express and Postgres"
        />
        <meta name="twitter:title" content=">Bolt" />
        {/* <meta name="twitter:image" content="android-chrome-512x512.png" /> */}
        <style type="text/css">{`
        html,body{
          height: 100%;
        }
    `}</style>
      </Helmet>
      <div className="min-h-screen flex flex-col mt-10">
        {loading ? (
          <>
            <Spinner size={100} loading />
          </>
        ) : (
          <div className="text-gray-700 mt-16 mx-auto px-2 lg:px-56 flex-grow h-full w-full mt-20">
            <main className="h-full">{children}</main>
          </div>
        )}
      </div>
    </>
  );
};

export default LayoutHelmet;
