import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import styles from "../styles/Welcome.module.css";

const CDNLink =
  "https://wlubordwywavnlrybxmf.supabase.co/storage/v1/object/public/photos/";

export default function Photo({ subdomain, photoData, getPhotos }) {
  const supabase = useSupabaseClient();

  async function deleteImage(photoName) {
    const { error } = await supabase.storage.from("photos").remove([photoName]);

    if (error) {
      console.log(error);
    } else {
      getPhotos();
    }
  }

  return (
    <div className={styles.photoContainer}>
      <div>{}</div>
      <img
        className={styles.image}
        // src={`${CDNLink}/${subdomain}/${photoData.name}`}
        src={`${CDNLink}/${photoData.name}`}
      />
      <button
        className={styles.button}
        onClick={() => {
          deleteImage(photoData.name);
        }}
      >
        Delete Photo
      </button>
    </div>
  );
}
