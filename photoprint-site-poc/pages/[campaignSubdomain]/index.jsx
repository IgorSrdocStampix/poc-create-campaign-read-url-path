import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import styles from "../../styles/Welcome.module.css";

export default function CampaignSubdomain(props) {
  const router = useRouter();

  return (
    <div>
      {props.data.map((campaign, i) => {
        return campaign.subdomain === router.query.campaignSubdomain ? (
          <div key={campaign.display_name} className={styles.welcome}>
            <div
              className={styles.title}
              style={{ backgroundColor: campaign.theme }}
            >
              ID: {campaign.id}
            </div>
            <div
              className={styles.title}
              style={{ backgroundColor: campaign.theme }}
            >
              Campaign: {campaign.display_name}
            </div>
            <div
              className={styles.title}
              style={{ backgroundColor: campaign.theme }}
            >
              Campaign: {campaign.theme}
            </div>
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const NEXT_PUBLIC_SUPABASE_URL = "https://wlubordwywavnlrybxmf.supabase.co";
  const NEXT_PUBLIC_SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdWJvcmR3eXdhdm5scnlieG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI2ODI3MjcsImV4cCI6MTk4ODI1ODcyN30.R-3A1bZMdNeDPNCDweRbeSn1O-SkJpsBUrwnu6emKZw";

  const supabase = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data } = await supabase.from("site_config").select("*");
  return { props: { data } };
}
