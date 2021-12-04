import { getAuth } from "@firebase/auth";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../../config/config";
import Sale from "./Sale";
import SaleSearch from "./SaleSearch";
import UploadSale from "./UploadSale";

export default function Sales({ showButtons = true }) {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({});

  const filteredPosts = () => {
    if (!posts) {
      return [];
    }
    return posts.filter((post) => {
      for (const key of Object.keys(filters)) {
        if (Array.isArray(post[key])) {
          if (filters[key] && !post[key].includes(filters[key])) {
            return false;
          }
        } else if (filters[key])
          if (
            key != "highPrice" &&
            key != "lowPrice" &&
            !post[key].includes(filters[key])
          ) {
            return false;
          }
        if (key == "highPrice" || key == "lowPrice")
          if (key == "highPrice") {
            if (post["price"] > filters[key]) return false;
          } else if (post["price"] < filters[key]) return false;
      }
      return true;
    });
  };

  useEffect(async () => {
    const db = getFirestore(app);
    const query = await getDocs(collection(db, "sales"));
    const newPosts = [];
    query.forEach((doc) => {
      newPosts.push({ ...doc.data(), id: doc.id });
    });

    setPosts(newPosts.sort((a, b) => b.date - a.date));
  }, []);

  const uploadPost = async (post) => {
    const db = getFirestore(app);
    if (getAuth().currentUser) {
      const doc = await addDoc(collection(db, "sales"), post);
      setPosts((prev) => [{ ...post, id: doc.id }, ...prev]);
    }
  };

  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <h1>Sales</h1>
      {showButtons && (
        <div>
          <SaleSearch updateFilters={(f) => setFilters(f)} />
          <UploadSale uploadPost={uploadPost} />
        </div>
      )}

      {filteredPosts().map((post) => (
        <Sale
          data={post}
          key={post.id}
          remove={() =>
            setPosts((prev) => {
              const newPosts = [...prev];
              setPosts(newPosts.filter((p) => p.id !== post.id));
            })
          }
          showButtons={showButtons}
        />
      ))}
    </div>
  );
}
