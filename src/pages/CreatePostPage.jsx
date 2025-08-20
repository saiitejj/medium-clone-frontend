import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Form.css'; // We can reuse the same form styling

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { token } = useContext(AuthContext); // Get the token from our global state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = { title, content };
      
      // 1. Create the headers object with the token for authorization
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      // 2. Send the post data AND the config object with the token
      const response = await axios.post(
        'http://localhost:5000/api/posts/create', 
        newPost, 
        config
      );
      
      alert('Post created successfully!');
      
      // 3. Redirect to the new post's page
      navigate(`/post/${response.data.post._id}`);

    } catch (error) {
      console.error('Error creating post:', error.response.data);
      alert('Error: ' + (error.response.data.message || 'Could not create post'));
    }
  };

  return (
    <div className="form-container">
      <h2>Create a New Post</h2>
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
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default CreatePostPage;