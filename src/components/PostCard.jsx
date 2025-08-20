import { Link } from "react-router-dom";
import './PostCard.css';

function PostCard({post}){
    return (
        <div className="post-card">
            <h2>
                <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h2>
            <p className="post-meta">
                by {post.author?post.author.name:'Unknown Author'} on {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="post-excerpt">{post.content.substring(0,150)}...</p>
        </div>
    )
}

export default PostCard