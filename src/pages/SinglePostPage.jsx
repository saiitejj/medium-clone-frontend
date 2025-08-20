import {useState,useEffect} from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios'

function SinglePostPage() {
  const [post,setPost]=useState(null)
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)

  const {id}=useParams();
  useEffect(()=>{
    const fetchPost=async()=>{
      try{
        const response=await axios.get(`http://localhost:5000/api/posts/${id}`)
        setPost(response.data)
      }catch(err){
        setError('Failed to fetch post. ')
        console.error(err)
      }finally{
        setLoading(false)
      }
    }
    fetchPost();
  },[id])

  if (loading) return <div className='loading-message'>Loading Post...</div>
  if (error) return <div className='error-message'>{error}</div>
  if (!post) return <div className='loading-message'>Post not found</div>

  return(
    <div className='single-post-container'>
      <h1>{post.title}</h1>
      <p className='post-meta'>
        By {post.author ? post.author.name: 'Unknown Author'} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className='post-content'>
        {post.content}
      </div>
      <Link to='/' className='back-link'>← Back to all posts </Link>

    </div>
  )




}
export default SinglePostPage;