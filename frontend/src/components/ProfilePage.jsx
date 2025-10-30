import { useContext } from "react";
import { OpinionsContext } from "../store/opinions-context";
import './profilePageStyling.css';
import { Opinion } from "./Opinion";
import { UserContext } from "../store/userContext";

export default function ProfilePage() {
    const { userOpinions } = useContext(OpinionsContext);
    const { user } = useContext(UserContext);
    
    return (
        <div className="profile-page-container">
            <h2 className="profile-title">Welcome, {user.fullname}</h2>

            <div className="profile-stats-container">
                <div className="stat-card">
                    <span className="stat-value">{userOpinions?userOpinions.length : 0}</span>
                    <span className="stat-label">Total Opinions</span>
                </div>
            </div>

            <div id="opinions">
                <h2>User Opinions</h2>
                {userOpinions ? <ul>
                    {userOpinions.map((o) => (
                        <li key={o._id}>
                            <Opinion opinion={o} showProfileView={true}/>
                        </li>
                    ))}
                </ul> : <p>You haven't posted any opinions yet!</p>
                }
            </div>
        </div>

    );
}