import React, { useState } from "react";
import { ReactComponent as UploadIcon } from "../assets/uploadIcon.svg";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebaseConfig";

function Header() {
  const [progress, setProgress] = useState(0);
  const types = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    let selected = e.target.files[0];
    const storageRef = ref(storage, `/images/${selected.name}`);

    if (selected && types.includes(selected.type)) {
      const uploadImage = uploadBytesResumable(storageRef, selected);

      uploadImage.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(uploadProgress);
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then((url) => {
            const collecktionRef = collection(db, "images");
            addDoc(collecktionRef, {
              imageName: selected.name,
              imageUrl: url,
              createdAt: Timestamp.now().toDate(),
            })
              .then(() => {
                // add toastify later (success)
                setProgress(0);
              })
              .catch((err) => {
                // add toastify later (error)
              });
          });
        }
      );
    }
  };

  return (
    <header>
      <div className="header-brand">photoshare</div>
      <form className="header-form">
        <input
          type="file"
          id="upload"
          accept="image/*"
          onChange={handleChange}
        />
        <label htmlFor="upload">
          <UploadIcon />
          <span>Upload</span>
        </label>
      </form>
    </header>
  );
}

export default Header;
