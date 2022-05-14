import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import { maxLength30, required } from "../../../utils/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const MyPosts = (props) => {
  let postsElements = props.posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ));

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

const AddNewPostForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      <Field
        name="newPostText"
        component={Textarea}
        placeholder="Post Message"
        validate={[required, maxLength30]}
      />
    </div>
    <div>
      <button>Add post</button>
    </div>
  </form>
);

const AddNewPostFormRedux = reduxForm({
  form: "ProfileAddNewPostForm",
})(AddNewPostForm);

export default MyPosts;
