import {Link} from 'react-router-dom';
import './Header.css'

function Header(){
    return (
        <header className="header">
            <Link to="/" className="logo">Medium Clone</Link>
            <nav className='main-nav'>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/create">Create Post</Link>
            </nav>
        </header>
    )
}
export default Header;