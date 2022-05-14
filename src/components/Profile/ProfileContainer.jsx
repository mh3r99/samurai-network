import { Component, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "../../hoc/withRouter";
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from "../../redux/profile-reducer";
import Profile from "./Profile";

const ProfileContainer = (props) => {
  const refreshProfile = () => {
    let userId = props.router?.params?.userId || props.authorizedUserId;

    if (!userId) {
      // props.router.navigate("/login");
    }

    props.getUserProfile(userId);
    props.getStatus(userId);
  };

  useEffect(() => {
    refreshProfile();
  }, [props.router?.params?.userId]);

  return (
    <Profile
      {...props}
      isOwner={!props.router?.params?.userId}
      profile={props.profile}
      status={props.status}
      updateStatus={props.updateStatus}
      savePhoto={props.savePhoto}
      saveProfile={props.saveProfile}
    />
  );
};

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter
)(ProfileContainer);
