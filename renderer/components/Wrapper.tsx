import React, { FunctionComponent } from "react";
import useFetch from "../common/useFetch";
import Link from "next/link";

interface Nav {
  href: string;
  as?: string;
  label?: string;
  desc?: string;
}

export const Wrapper: FunctionComponent = function({ children }) {
  const [err, navs] = useFetch<Nav[]>("meta/nav", undefined, []);
  return (
    <div>
      <div className="nav">
        {err
          ? `${err.message}`
          : navs.map((nav, idx) => (
              <Link key={idx} href={nav.href} as={nav.as}>
                <a title={nav.desc}>{nav.label || nav.as || nav.href}</a>
              </Link>
            ))}
      </div>
      <div>{children}</div>
      <style jsx>{`
        .nav > a {
          padding: 0.5em;
        }
      `}</style>
    </div>
  );
};
