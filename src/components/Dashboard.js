import { Navigate, useNavigate } from "react-router-dom"
import jwt_decode, { jwtDecode } from "jwt-decode"
import ListUsers from "./ListUsers";
import FormAddUser from "./FormAddUsers";

const Dashboard = () => {
    const udata = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/')
    }

    if(token !== null){
        let decodedToken = jwtDecode(token);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()){
            return <Navigate replace to="/dashboard" />;
        }else{
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/dashboard">React.js and Larevel App</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/dashboard">Home</a>
                                </li>
                                </ul>
                                <ul className="navbar-nav">
                                    <button className="nav-link" onClick={logout}>logout </button>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <h1 className="text-black text-center mt-5">welcome to your profile <span className="text-primary">{udata.name} </span></h1>
        
                    <FormAddUser />
                    <hr />
                    <ListUsers />
                </div>
            )
        }
    }else{
        return <Navigate replace to="/" />;
    }
}

export default Dashboard