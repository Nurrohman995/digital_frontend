import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/userSlice";
import ActionUser from "./ActionUser";

const ListUsers = () => {
    const dispatch = useDispatch()
    const {value} = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return (
        <div className="m-5">
            <div className="row">
                <div className="col-md-12">
                    <h4>List users</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Created at</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {value && value.map((val) => {
                            return (
                                <tbody key={val.id}>
                                    <tr>
                                        <td className="text-center">{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.email}</td>
                                        <td>{val.created_at}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-primary"
                                                data-bs-toggle="collapse"
                                                data-bs-target={"#collapse" + val.id}
                                                aria-expanded="false"
                                                aria-controls={"collapse" + val.id}>
                                                <i className="bi bi-chevron-down"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="collapse" id={"collapse" + val.id}>
                                        <ActionUser
                                            data={{ 
                                                id : val.id,
                                                name : val.name,
                                                email : val.email
                                            }}
                                        />
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ListUsers