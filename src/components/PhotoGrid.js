import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { motion } from "framer-motion";
import { ReactComponent as DeleteIcon } from "../assets/deleteIcon.svg";
import { deleteObject, ref } from "firebase/storage";

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

  const handleDelete = async (id, imageName) => {
    const docRef = doc(db, "images", id);
    const imageRef = ref(storage, `images/${imageName}`);
    await deleteDoc(docRef);
    await deleteObject(imageRef);
  };

  return (
    <div className="photo-grid">
      {images.length === 0 ? (
        <p>No images in the database 😳</p>
      ) : (
        images.map((image) => (
          <motion.div className="photo" key={image.id} layout>
            <button onClick={() => handleDelete(image.id, image.imageName)}>
              <DeleteIcon />
            </button>
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
