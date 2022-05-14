import s from "./users.module.css";
import userPhoto from "../../assets/images/user-img.jpg";
import { NavLink } from "react-router-dom";

const User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={`/profile/${user.id}`}>
            <img
              className={s.userPhoto}
              src={user.photos.small !== null ? user.photos.small : userPhoto}
            />
          </NavLink>
        </div>
        <div>
          <button
            disabled={followingInProgress.some((id) => id === user.id)}
            onClick={() => {
              if (user.followed) {
                unfollow(user.id);
              } else {
                follow(user.id);
              }
            }}
          >
            {user.followed ? "Unfollow" : "Follow"}
          </button>
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{"user.location.country"}</div>
          <div>{"user.location.city"}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
