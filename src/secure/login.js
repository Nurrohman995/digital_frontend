import { useEffect, useState } from "react"
import Navbar from "../Navbar"
import { Navigate, useNavigate } from "react-router-dom"
import axios from 'axios';
import modal from "../utility/modal";
import sweetalert2 from 'sweetalert2'
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [data, setData] = useState([])
    const token = localStorage.getItem('token')
    // const udata = localStorage.getItem('token')
    // console.log(token)
    const navigate = useNavigate()
    useEffect(() => {
        // if(token !== null){
            // if (decodedToken.exp * 1000 > currentDate.getTime()){
            //     <Navigate to="/dashboard" />
            // }
        // }
    }, [])

    const handleChange = (e) => {
        const val = e.target.value
        setData({...data, [e.target.name] : val})
    }

    const handleSubmit = (d) => {
        const secureData = {
            'email' : d.email,
            'password' : d.password
        }
        axios.post(modal.login, secureData).then((res) => {
            console.log(res.data)
            if(!res.data.status){
                Swal.fire({
                    title : 'Info',
                    text: res.data.error,
                    icon : 'info',
                })
            }else{
                localStorage.setItem('token', res.data.access_token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                navigate('/dashboard')
            }
        })
    }

    if(token !== null){
        let decodedToken = jwtDecode(token);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 > currentDate.getTime()){
            return <Navigate replace to="/dashboard" />;
        }
    }else{
        return (
            <div className='App'>
                <Navbar />
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit(data)
                        }}>
                            <h3>Sign In</h3>
                            <div className="mb-3">
                                <label>Email address</label>
                                <input type="email" required className="form-control" placeholder="Enter email" onChange={handleChange} name="email" />
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type="password" required
                                    className="form-control"
                                    placeholder="Enter password"
                                    onChange={handleChange}
                                    name="password"
                                />
                            </div>
                            <div className="mb-3">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"id="customCheck1"/>
                                    <label className="custom-control-label" htmlFor="customCheck1">
                                    Remember me
                                    </label>
                                </div>
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary"> Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login