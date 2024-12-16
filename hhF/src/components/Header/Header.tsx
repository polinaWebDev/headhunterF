import {authAtom} from "../../atoms/authAtom.ts";
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import style from './style.module.css'


const Header = () => {
    const [isAuth] = useAtom(authAtom); //?


    return (
        <header className={`${style.header}`}>
            <div className="container">
                <nav className={`${style.nav}`}>
                    <Link to='/'>Home</Link>
                    <div className={`${style.cta_bts}`}>
                        {isAuth ? (
                            <>
                                <Link to='/resume/:userId' >
                                    <button id={`${style.resume}`}>Create resume</button>
                                </Link>
                                <Link to='/my-companies' >
                                    <button id={`${style.resume}`}>My companies</button>
                                </Link>
                                <Link to='/profile'>
                                    <button className={`${style.cta_bts}`}>Profile</button>
                                </Link>
                                <Link to='/chats'>
                                    <button className={`${style.cta_bts}`}>Chats</button>
                                </Link>
                                <button onClick={() => {
                                    localStorage.removeItem('token');
                                    window.location.reload();
                                }}>LogOut
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to='/login'>Login</Link>
                                <Link to='/register'>Register</Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;