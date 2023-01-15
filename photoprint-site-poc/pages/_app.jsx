import "../styles/globals.css";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const NEXT_PUBLIC_SUPABASE_URL = "https://wlubordwywavnlrybxmf.supabase.co";
const NEXT_PUBLIC_SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdWJvcmR3eXdhdm5scnlieG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI2ODI3MjcsImV4cCI6MTk4ODI1ODcyN30.R-3A1bZMdNeDPNCDweRbeSn1O-SkJpsBUrwnu6emKZw";


export default function App({ Component, pageProps }) {
  const [supabase] = useState(() =>
    createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
