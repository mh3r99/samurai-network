import { connect } from "react-redux";
import {
  follow,
  unfollow,
  setCurrentPage,
  requestUsers,
} from "../../redux/users-reducer";
import { useEffect } from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
  getUsers,
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
} from "../../redux/users-selectors";

const UsersContainer = (props) => {
  useEffect(() => {
    const { currentPage, pageSize, requestUsers } = props;
    requestUsers(currentPage, pageSize);
  }, []);

  const onPageChanged = (pageNumber) => {
    const { pageSize, requestUsers } = props;
    requestUsers(pageNumber, pageSize);
  };

  return (
    <>
      {props.isFetching ? <Preloader /> : null}
      <Users
        users={props.users}
        totalItemsCount={props.totalItemsCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={onPageChanged}
        follow={props.follow}
        unfollow={props.unfollow}
        followingInProgress={props.followingInProgress}
      />
    </>
  );
};

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalItemsCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    requestUsers,
  })
)(UsersContainer);
