import React from "react";
import App from "next/app";

import { Wrapper } from "../components/Wrapper";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Wrapper>
        <Component {...pageProps} />
        <style global jsx>
          {`
            * {
              margin: 0;
              padding: 0;
            }
          `}
        </style>
      </Wrapper>
    );
  }
}
