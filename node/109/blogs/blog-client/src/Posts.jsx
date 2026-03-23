import React, { useState } from 'react'
import { useEffect } from 'react'
import Post from './Post';
import io from 'socket.io-client';

export default function Posts({ setError }) {
  const [posts, setPosts] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8080/posts');
        if (!response.ok) {
          const msg = await response.text();
          throw new Error(`${response.status} - ${msg ?? response.statusText}`);
        }
        const postData = await response.json();
        console.log(postData);

        setPosts(postData);
      } catch (e) {
        console.error(e);
        setError(e.message);
      }
    })();
  }, []);

  const socketIo = io('http://localhost:8080');
  useEffect(() => {
    //const socketIo = io('http://localhost:8080');
    function addPost(post) {
      console.log(posts);
      setPosts([...posts, post]);
    }
    socketIo.on('post', addPost);

    function addComment(comment, parentId) {
      const tempPosts = posts;
      const parentPostIndex = tempPosts.findIndex(post => post._id === (parentId));
      const tempPost = tempPosts[parentPostIndex];

      const tempComments = tempPost.comments ?? [];
      tempComments.push(comment);
      tempPost.comments = tempComments;
      tempPosts[parentPostIndex] = tempPost;
      setPosts(tempPosts);
      console.log(comment);
    }
    socketIo.on('comment', addComment);

    return () => {
      //socketIo.close();
      socketIo.off('post', addPost);
      socketIo.off('comment', addComment)
    }
  }, [posts, socketIo]);

  return (
    <div>
      {posts?.map(p => <Post key={p._id} post={p} setError={setError} />)}
    </div>
  )
}
