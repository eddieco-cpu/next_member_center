"use client";

import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

const getCheckoutOptionsSyntax = gql`
  query checkoutOptions($subdomain: String!) {
    site(subdomain: $subdomain) {
      checkoutOptions {
        customForm {
          id
          name
          fields {
            id
            label
            fieldType
            required
            options {
              label
              value
            }
          }
        }
      }
    }
  }
`;
const divStyle = {
  outline: "1px solid #ccc",
  display: "inline-block",
  padding: "10px",
  margin: "10px",
};

export default function GraphQLsTest() {
  const [getCheckoutOptions] = useLazyQuery(getCheckoutOptionsSyntax, {
    onCompleted: ({ site }) => {
      console.log("site ===>", site);
    },
    onError: (err) => {
      console.log("err ===>", err);
    },
  });
  useEffect(() => {
    getCheckoutOptions({
      variables: { subdomain: "udnhealth" },
    });

    // console.log("GraphQLsTest.js gql ==> \n", gql);
    // console.log("GraphQLsTest.js useLazyQuery ==> \n", useLazyQuery);
  }, []);

  return (
    <div style={divStyle}>
      <b>GraphQLsTest</b>
      <br />
      <br />
      <button>Test</button>
    </div>
  );
}
