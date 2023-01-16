import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import DashboardPage from "./dashboard";

const Home = () => {
    const session = useSession();
    const supabase = useSupabaseClient();

    return (
        <>
            {!session ? (
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    theme="dark"
                />
            ) : (
                <DashboardPage />
            )}
        </>
    );
};

export default Home;
