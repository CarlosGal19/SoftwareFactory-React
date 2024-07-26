import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export function Header() {

    const { logout } = useAuth();

    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <nav className="bg-gray-800 fixed top-0 w-full z-10 shadow-md">
                <div className="flex items-center justify-between px-4 py-3 md:px-8 lg:px-12">
                    <div className="flex items-center">
                        <Link to="/home">
                            <div className="flex items-center border border-gray-600 p-1 rounded-md">
                                <img src="./utma.png" className="w-8" alt="Logotype" />
                            </div>
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button className="text-gray-300 hover:text-white focus:outline-none focus:text-white" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="hidden md:flex md:items-center md:space-x-4" id="navbarsExampleDefault">
                        <ul className="flex space-x-4">
                            <li className="nav-item"><Link to="/profile" className="text-gray-300 hover:text-white">Profile</Link></li>
                            <li className="nav-item"><Link to="/friend-requests" className="text-gray-300 hover:text-white">Friend requests</Link></li>
                            <li className="nav-item"><Link to="/chats" className="text-gray-300 hover:text-white">Chats</Link></li>
                            <li className="nav-item relative">
                                <Link to='/settings' className="text-gray-300 hover:text-white cursor-pointer" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Settings</Link>
                            </li>
                            <li className="nav-item text-gray-300 hover:text-white hover:cursor-pointer" onClick={handleClick}>Sign out</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
