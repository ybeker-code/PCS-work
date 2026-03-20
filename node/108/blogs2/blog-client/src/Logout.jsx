import React from 'react'

export default function Logout(props) {
  const { setUserName, userName } = props;

  async function sendLogout() {
    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        body: JSON.stringify(),
        headers: { 'content-type': 'application/json' },
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('logout failed');
      } else if (response.status === 204) {
        setUserName();
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      logged in as {userName}
      <button onClick={() => { sendLogout() }}>Logout</button>
    </div>
  )
}
