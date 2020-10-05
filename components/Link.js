import React from "react";
import NextLink from "next/link";

export default function Link(props) {
  const { children, ...rest } = props;

  return (
    <NextLink {...rest}>
      <a
        style={{
          color: "white",
          textDecoration: "none",
        }}
      >
        {children}
      </a>
    </NextLink>
  );
}
