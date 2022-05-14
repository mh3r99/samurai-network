import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src="https://pixy.org/src/41/417739.jpg" alt="" />
      {props.message}
      <div>
        <span>like </span>
        {props.likesCount}
      </div>
    </div>
  );
};

export default Post;
