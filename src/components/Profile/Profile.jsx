import React from "react";
import SuperMyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = React.memo((props) => {
  return (
    <div>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
      />
      <SuperMyPostsContainer />
    </div>
  );
});

export default Profile;
