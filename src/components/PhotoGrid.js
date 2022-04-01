import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

function PhotoGrid() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imageRef = collection(db, "images");
    const q = query(imageRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const images = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(images);
    });
  }, []);

  return (
    <div className="photo-grid">
      {images.length === 0 ? (
        <p>No images in the database 😳</p>
      ) : (
        images.map((image) => (
          <div className="photo" key={image.id}>
            <img src={image.imageUrl} alt={image.imageName} />
          </div>
        ))
      )}
    </div>
  );
}

export default PhotoGrid;
