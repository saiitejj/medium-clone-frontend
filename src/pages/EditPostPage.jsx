import { useState,useEffect,useContext } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import './Form.css'

function EditPostPage(){
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const [loading,setLoading]=useState(true)
    const {id}=useParams();
    const {token}=useContext(AuthContext)
    const navigate=useNavigate()


    useEffect(()=>{
        const fetchPost=async()=>{
            try{
                const response=await axios.get(`http://localhost:5000/api/posts/${id}`)
                setTitle(response.data.title)
                setContent(response.data.content)
            }catch(error){
                console.error('Failed to fetch post for editing:',error)
                alert("Could not load post for editing.")
            }finally{
                setLoading(false)
            }
        }
        fetchPost();
    },[id])

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = { title, content };
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      // The URL now includes the post's 'id' to specify which post to update
      await axios.put(
        `http://localhost:5000/api/posts/${id}`, 
        updatedPost, 
        config
      );
      
      alert('Post updated successfully!');
      
      // Redirect back to the post's page to see the changes
      navigate(`/post/${id}`);

    } catch (error) {
      console.error('Error updating post:', error.response.data);
      alert('Error: ' + (error.response.data.message || 'Could not update post'));
    }
  };

  if (loading) return <div className="loading-message">Loading editor...</div>;

  return (
    <div className="form-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="10"
          ></textarea>
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPostPage;