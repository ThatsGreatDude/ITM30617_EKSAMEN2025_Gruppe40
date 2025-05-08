import {Link, Outlet} from "react-router-dom";
import './Layout.css';


export default function Layout({children}){
    return(
            <>
            <header>
                <nav>
                    <Link to="/" className="logo">BillettLyst</Link>
                    <Link to="/category/musikk">Musikk</Link>
                    <Link to="/category/sport">Sport</Link>
                    <Link to="/category/Teater-Show">Teater/Show</Link>
                    <Link to="/dashboard">Logg inn</Link>
                </nav>

            </header>
            <main><Outlet /></main>
            </>
    );
}