"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react'
import Profile from '@components/Profile';

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');
  const [userPosts, setUserPosts] = useState([])


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    }
    if(params?.id) fetchPosts();
    else setUserPosts([]);
  }, [params.id])

  return (
    <Profile 
      name={userName}
      desc={`Welcome to ${userName} personalized profile page`}
      data={userPosts}
    />
  )
}

export default UserProfile