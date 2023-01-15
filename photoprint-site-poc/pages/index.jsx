import styles from "../styles/Home.module.css";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Campaign from "..";

export default function Home() {
  const [data, setData] = useState();
  const supabase = useSupabaseClient();

  useEffect(() => {
    (async () => {
      await supabase
        .from("site_config")
        .select("*")
        .then(({ data }) => setData(data));
    })();
  }, []);

  return (
    <>
      <main className={styles.main}>
        <Campaign data={data} />
      </main>
    </>
  );
}
