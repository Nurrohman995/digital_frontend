import { useState } from "react"
import { useDispatch } from "react-redux"
import { saveUser } from "../features/userSlice"

const FormAddUser = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const handleChange = (e) => {
        const val = e.target.value
        setData({...data, [e.target.name] : val})
    }

    const onSubmit = (result) => {
        var data = {
            "name" : result.name,
            "email" : result.email,
            "password" : result.password,
        }
        dispatch(saveUser(data))
        setData([])
    }

    return (
        <div className="m-5">
            <div className="row">
                <div className="col-md-12">
                    <h4>Add User</h4>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        onSubmit(data)
                    }}>
                        <div className="row">
                            <div className="mb-3 col">
                                <label htmlFor="inputName" className="form-label">Name</label>
                                <input type="text" onChange={handleChange} name="name" className="form-control" id="inputName" placeholder="Name" required />
                            </div>
                            <div className="mb-3 col">
                                <label htmlFor="inputEmail" className="form-label">
                                    Email
                                </label>
                                <input type="email" onChange={handleChange} name="email" className="form-control" id="inputEmail" placeholder="Email" required />
                            </div>
                            <div className="mb-3 col">
                                <label htmlFor="inputPassword" className="form-label">
                                    Password
                                </label>
                                <input type="password" onChange={handleChange} name="password" className="form-control" id="inputPassword" placeholder="Password" required />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormAddUser