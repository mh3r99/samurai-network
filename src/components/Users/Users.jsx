import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({
  totalItemsCount,
  pageSize,
  onPageChanged,
  currentPage,
  users,
  followingInProgress,
  unfollow,
  follow,
}) => {
  return (
    <div>
      <Paginator
        currentPage={currentPage}
        totalItemsCount={totalItemsCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      <div>
        {users.map((u) => (
          <User
            key={u.id}
            user={u}
            followingInProgress={followingInProgress}
            unfollow={unfollow}
            follow={follow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
