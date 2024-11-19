import React, { useEffect, useState } from 'react'

const Home = () => {

  const [username,setUsername] = useState('');

  useEffect(()=>{
    const fetchUserData=async()=>{
      setUsername(localStorage.getItem('username'));
    }
    fetchUserData();
  },[]);

  return (
    <div>
      <h1>Welcome {username} To The BookMatrix</h1>

    </div>
  )
}

export default Home;
