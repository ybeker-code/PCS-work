import React from 'react'
import { useEffect, useState } from "react"
import Post from './post'

export default function Posts() {
  const [posts, setPosts] = useState();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8080/posts');
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const posts = await response.json();
        console.log(posts);
        setPosts(posts);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    posts?.map(p => <Post key={p._id} post={p}></Post>)
  )
}
