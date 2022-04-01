import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion } from "framer-motion";

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
          <motion.div
            className="photo"
            key={image.id}
            layout
            whileHover={{ opacity: 0.8 }}
          >
            <motion.img
              src={image.imageUrl}
              alt={image.imageName}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.div>
        ))
      )}
    </div>
  );
}

export default PhotoGrid;
