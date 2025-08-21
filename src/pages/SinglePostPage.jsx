import {useState,useEffect,useContext} from 'react';
import { useParams,Link ,useNavigate} from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import './SinglePostPage.css'

function SinglePostPage() {
  const [post,setPost]=useState(null)
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)
  const {id}=useParams();
  const navigate=useNavigate();

  const {user,token}=useContext(AuthContext)

  useEffect(()=>{
    const fetchPost=async()=>{
      try{
        const response=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/posts/${id}`)
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

  const handleDelete=async ()=>{
    if(window.confirm('Are you sure you want to delete this post?')){
      try{
        const config={
          headers:{'Authorization':`Bearer ${token}`}
        }
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/posts/${id}`,config)
        alert('Post deleted succesfully!')
        navigate('/')
      }catch(err){
        alert('Error deleting post.')
        console.error(err)
      }
    }
  }

  if (loading) return <div className='loading-message'>Loading Post...</div>
  if (error) return <div className='error-message'>{error}</div>
  if (!post) return <div className='loading-message'>Post not found</div>


  
  
  
  const isAuthor=user&& post.author && user._id===post.author._id
  return(
    <div className='single-post-container'>
      {isAuthor && (
        <div className='post-actions'>
          <Link to={`/post/${post._id}/edit`} className='edit-button'>Edit Post</Link>
          <button onClick={handleDelete} className='delete-button'>Delete Post</button>
        </div>
      )}
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