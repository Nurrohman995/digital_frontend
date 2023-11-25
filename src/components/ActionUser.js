import { removeListener } from "@reduxjs/toolkit"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteUser, updateUsers } from "../features/userSlice"

const ActionUser = (props) => {
    const [data, setData] = useState(props.data)
    const dispatch = useDispatch()
    
    const handleChange = (e) => {
        const val = e.target.value
        setData({...data, [e.target.name] : val})
    }

    const handleSubmit = (res) => {
        const result = {
            'user_id' : res.id,
            'name' : res.name,
            'email' : res.email
        }
        dispatch(updateUsers(result))
    }

    const onDeleteClicked = (id) => {
        dispatch(deleteUser({ id: id }));
    }

    return (
        <td colSpan={5}>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(data)
            }}>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <input type="hidden" onChange={handleChange} name="id" value={data.id} />
                            <div className="col">
                                <input type="text" value={data.name} onChange={handleChange} name="name" className="form-control" placeholder="Edit Name" />
                            </div>
                            <div className="col">
                                <input type="email" value={data.email} className="form-control" onChange={handleChange} name="email" placeholder="Edit Email"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 text-center">
                        <div className="btn-group">
                            <button type="submit" className="btn btn-warning">
                                <i className="bi bi-pencil"></i>
                            </button>
                            <button onClick={(e) => {
                                e.preventDefault()
                                onDeleteClicked(data.id)
                            }} type="button" className="btn btn-danger">
                                <i className="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </td>
    )
}

export default ActionUser