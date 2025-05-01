import {Link} from "react-router-dom";


export default function Layout({children}){
    return(
            <>
            <header>
                <nav>
                    <Link to="/"></Link>
                    <Link to="Musikk">Musikk</Link>
                    <Link to="Sport">sport</Link>
                    <Link to="Teater/Show">Teater/show</Link>
                </nav>

            </header>
            </>
    );
}