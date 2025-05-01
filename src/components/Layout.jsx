import {Link} from "react-router-dom";


export default function Layout({children}){
    return(
            <>
            <header>
                <nav>
                    <link to="/"></link>
                    <link to="Musikk">Musikk</link>
                    <link to="Sport">sport</link>
                    <link to="Teater/Show">Teater/show</link>
                </nav>

            </header>
            </>
    );
}