import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";

export default function DashboardPage() {
    const supabase = useSupabaseClient();
    const user = useUser();
    const [data, setData] = useState<any>([]);
    const [selected, setSelected] = useState<any>(null);
    const [isNew, setIsNew] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        await supabase
            .from("campaign")
            .select(
                `
                    *,
                    site_config:site_config_id (*)
                `
            )
            .then(({ data }) => setData(data));
    };

    const createNewCampaign = async ({
        title,
        theme,
        subdomain,
        max_per_user,
        credits,
    }: any) => {
        const { data }: any = await supabase
            .from("site_config")
            .insert({
                display_name: title,
                theme,
                subdomain,
            })
            .select("*");
        await supabase.from("campaign").insert({
            user_id: user?.id,
            site_config_id: data[0]?.id,
            title,
            max_per_user,
            credits,
        });
        fetchData();
    };

    return (
        <div className="dashboard-page">
            <div className="campaign-container">
                {data
                    ?.sort((a: any, b: any) => (a.id > b.id ? 1 : -1))
                    .map((campaign: any, index: number) => {
                        return (
                            <div
                                className={
                                    "campaign-card " +
                                    campaign.site_config?.theme +
                                    (selected?.id === campaign.id
                                        ? " selected"
                                        : "")
                                }
                                key={`cc-${index}`}
                                onClick={() => {
                                    setIsNew(false);
                                    setSelected(campaign);
                                }}
                            >
                                <h1>{campaign?.title}</h1>
                            </div>
                        );
                    })}
                <div
                    className="create-new-card"
                    onClick={() => {
                        setIsNew(true);
                        setSelected({});
                    }}
                >
                    +
                </div>
            </div>
            <div className="edit-container">
                {!selected ? (
                    <h1>Select a campaign</h1>
                ) : (
                    <Formik
                        initialValues={{
                            title: selected?.title || "",
                            theme: selected?.site_config?.theme || "",
                            subdomain: selected?.site_config?.subdomain || "",
                            max_per_user: selected?.max_per_user || 0,
                            credits: selected?.credits || 0,
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => createNewCampaign(values)}
                    >
                        <Form>
                            <label htmlFor="title">Title</label>
                            <Field
                                id="title"
                                name="title"
                                placeholder={"Title"}
                            />
                            <label htmlFor="theme">Theme</label>
                            <Field
                                id="theme"
                                name="theme"
                                placeholder={"Theme"}
                            />
                            <label htmlFor="subdomain">Subdomain</label>
                            <Field
                                id="subdomain"
                                name="subdomain"
                                placeholder={"Subdomain"}
                            />
                            <label htmlFor="max_per_user">
                                Credits per user
                            </label>
                            <Field
                                id="max_per_user"
                                name="max_per_user"
                                placeholder={"Credits per user"}
                            />
                            <label htmlFor="credits">Credits</label>
                            <Field
                                id="credits"
                                name="credits"
                                placeholder={"Credits"}
                            />
                            {isNew && <button type="submit">Save new</button>}
                        </Form>
                    </Formik>
                )}
            </div>
        </div>
    );
}
