import { useContext } from "react";
import myContext from "../../Context/myContext";
import '../../Style/UserDetail.css';

const UserDetail = () => {
    const context = useContext(myContext);
    const { getAllUser } = context;



    return (
        <div className="user-detail-container">
            <div className="header">
                <h1 className="title">All Users</h1>
            </div>
            <div className="table-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllUser.map((user, index) => (
                            <tr key={user.uid}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.date}</td>
                              
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserDetail;
