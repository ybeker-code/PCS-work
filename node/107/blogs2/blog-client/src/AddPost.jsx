import React from 'react';
import { useNavigate } from 'react-router';

export default function AddPost() {

  const navigate = useNavigate();

  async function processAddPost(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:8080/addPost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Post sent successfully!");
        navigate('/');
      }
    } catch (error) {
      console.error("Error sending post:", error);
    }
  }


  return (
    <form /*action='http://localhost:8080/addPost' method="post"*/ onSubmit={processAddPost}>
      <div>
        <label>name: </label>
        <input type="text" placeholder='name' name='name' />
      </div>
      <label>message: </label>
      <input type="text" name='body' />
      <button>send</button>
    </form>
  )
};
