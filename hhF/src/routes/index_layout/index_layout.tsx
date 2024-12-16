
import { Outlet} from 'react-router-dom'
import Header from "../../components/Header/Header.tsx";

export const IndexLayout = () => {
    return(
        <>
            <Header></Header>
            <div className="container">
                <Outlet></Outlet>
            </div>
            <div className="footer"></div>
        </>
    )
}


