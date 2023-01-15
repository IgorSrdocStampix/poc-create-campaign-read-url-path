import React from "react";
import styles from "./styles/Welcome.module.css";
import Link from "next/link";

const Campaign = ({ data }) => {
  return (
    <div>
      Here's a list of your campaigns
      {data?.map((entry) => {
        return (
          <Link
            key={entry.subdomain}
            className={styles.button}
            href={entry.subdomain ?? ""}
          >
            {entry.subdomain}
          </Link>
        );
      })}
    </div>
  );
};

export default Campaign;
