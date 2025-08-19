import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Header.css'

function Header(){
    const {user,logout}=useContext(AuthContext)

    return (
        <header className="header">
            <Link to="/" className="logo">Medium Clone</Link>
            <nav className='main-nav'>
                {user?(
                    <>
                    <Link to='/create'>Create Post</Link>
                    <button onClick={logout} className='logout-button'>Logout</button>
                    </>

                ):(
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </>
                )}
            </nav>
        </header>
    )
}
export default Header;