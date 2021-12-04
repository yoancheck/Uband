import { getAuth } from "@firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../../config/config";
import Post from "./post";


export function LikedPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        const db = getFirestore(app);
        const query = await getDocs(collection(db, "posts"));
        const newPosts = [];
        query.forEach((doc) => {
            newPosts.push({ ...doc.data(), id: doc.id });
        });
        if (getAuth().currentUser) {
            setPosts(newPosts.sort((a, b) => b.date - a.date).filter(post => post.likes.includes(getAuth().currentUser.uid)));
        }
    }, []);

    if (!getAuth().currentUser) {
        return <h4 style={{marginTop: 15}}>
            No Posts Available! Login to continue
        </h4>
    }
    
    return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1>Posts I liked</h1>

        {posts.map(post =>
            <Post data={post} key={post.id}
                remove={() => setPosts(prev => { const newPosts = [...prev]; setPosts(newPosts.filter(p => p.id !== post.id)) })}
                showButtons={true} />)}
                
    </div>
}