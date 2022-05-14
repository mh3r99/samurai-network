import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userPhoto from "../../../assets/images/user-img.jpg";
import { useState } from "react";
import ProfileDataReduxForm from "./ProfileDataForm";

const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img
          src={profile.photos.large || userPhoto}
          alt="avatar"
          className={s.avatar}
        />
        {isOwner && <input type="file" onChange={onMainPhotoSelected} />}

        {editMode ? (
          <ProfileDataReduxForm
            initialValues={profile}
            onSubmit={onSubmit}
            profile={profile}
          />
        ) : (
          <ProfileData
            profile={profile}
            isOwner={isOwner}
            goToEditMode={() => setEditMode(true)}
          />
        )}

        <ProfileStatus
          isOwner={isOwner}
          status={status}
          updateStatus={updateStatus}
        />
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>Edit profile</button>
        </div>
      )}
      <div>
        <b>FullName</b>: {profile.fullName}
      </div>
      <div>
        <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me</b>: {profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>:
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
