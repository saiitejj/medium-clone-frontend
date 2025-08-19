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

// export default HomePage;
import { Link } from 'react-router-dom';
import './HomePage.css'; // The styles will work with this new code

// For now, let's create a "fake" array of posts right here in the file.
const fakePosts = [
  { _id: '1', title: 'My First Fake Post', content: 'This is the content for post 1.' },
  { _id: '2', title: 'Another Fake Post', content: 'This is the content for post 2.' }
];

function HomePage() {
  return (
    <div className="home-container">
      <h1>Latest Posts</h1>
      <div className="posts-list">
        {/* We will map over our fake data here */}
        {fakePosts.map(post => (
          <div key={post._id} className="post-card">
            <h2>
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h2>
            <p className="post-excerpt">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;