import { getAuth } from "@firebase/auth";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../../config/config";
import Post from "./post";
import { PostSearch } from "./PostSearch";
import { UploadPost } from "./UploadPost";

export default function Posts({ showButtons = true }) {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({});

  const filteredPosts = () => {
    if (!posts) {
      return [];
    }
    return posts.filter(post => {
      for (const key of Object.keys(filters)) {
        if (Array.isArray(post[key])) {
          if (filters[key] && !post[key].includes(filters[key])) {
          return false;
          }
        }
        else if (filters[key] && filters[key] != post[key]) {
          return false;
        }
      }
      return true;
    });
  }

  useEffect(async () => {
    const db = getFirestore(app);
    const query = await getDocs(collection(db, "posts"));
    const newPosts = [];
    query.forEach((doc) => {
      newPosts.push({...doc.data(), id: doc.id});
    });

    setPosts(newPosts.sort((a,b) => b.date - a.date));
  }, []);

  const uploadPost = async (post) => {
    const db = getFirestore(app);
    if (getAuth().currentUser) {
      const doc = await addDoc(collection(db, "posts"), post);
      setPosts((prev) => [{ ...post, id: doc.id }, ...prev]);
    }
  };

  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <h1>Posts</h1>
      {showButtons &&
        <div>
          <PostSearch updateFilters={(f) => setFilters(f)} />
          <UploadPost uploadPost={uploadPost} />
        </div>
      }

      {filteredPosts().map((post) => (
        <Post data={post} key={post.id} remove={() => setPosts(prev => { const newPosts = [...prev]; setPosts(newPosts.filter(p => p.id !== post.id)) })} showButtons={showButtons} />
      ))}
    </div>
  );
}
