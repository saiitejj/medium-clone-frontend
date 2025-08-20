// import {useState,useEffect} from 'react';
// import axios from 'axios'
// import { Link } from 'react-router-dom';
// import './HomePage.css'


// function HomePage(){
//     const [posts,setPosts]=useState([]);
//     const[loading,setLoading]=useState(true)
//     const[error,setError]=useState(null)
//     useEffect(()=>{
//         const fetchPosts=async()=>{
//             try{
//                 const response=await axios.get('http://localhost:5000/api/posts');
//                 setPosts(response.data)
//             }catch(err){
//                 setError('Failed to fetch posts.');
//                 console.error(err)
//             }finally{
//                 setLoading(false)
//             }
//         }
//         fetchPosts();
//     },[])
//     if (loading)return <div className='loading-message'>Loading posts....</div>
//     if(error) return <div className='error-message'>{error}</div>


//     return (
//         <div className='home-container'>
//             <h1>Latest Posts</h1>
//             <div className='posts-list'>
//                 {posts.map(post =>(
//                     <div key={post._id} className='post-card'>
//                         <h2>
//                             <Link to={'/post/${post._id}'}>{post.title}</Link>
//                         </h2>
//                         <p className='post-meta'>
//                             by {post.author?post.author.name:'Unknown Author'} on {new Date(post.createdAt).toLocaleDateString()}
//                         </p>
//                         <p className='post-except'>{post.content.substring(0,150)}...</p>

//                     </div>

//                 ))}
//             </div>
//         </div>
//     )
// }
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
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
        const response=await axios.get(`http://localhost:5000/api/posts`)
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
          <div key={post._id} className='post-card'>
            <h2>
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h2>
            <p className='post-meta'>
              by {post.author ? post.author.name:'Unkown Author'} on {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className='post-excerpt'>{post.content.substring(0,150)}...</p>
          </div>

        ))}
      </div>
    </div>
  )
}
export default Homepage