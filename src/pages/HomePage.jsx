import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import PostCard from '../components/PostCard';
import './Homepage.css';

function Homepage(){
  const [posts,setPosts]=useState([]);
  //New state for loading and erros
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)
  
  //useEffect to fetch the data
  useEffect(()=>{
    const fetchPosts=async()=>{
      try{
        const response=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/posts`)
        setPosts(response.data)
      }catch(err){
        setError('Failded to fetch posts')
        console.error(err)
      }finally{
        setLoading(false);

      }
    
    }
    fetchPosts();
  },[])

  if (loading) return <div className='loading-message'>Loading posts...</div>
  if (error) return <div className='error-message'>{error}</div>
  return (
    <div className='home-container'>
      <h1>Latest Posts</h1>
      <div className='posts-list'>
        {posts.map(post=>(
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}
export default Homepage