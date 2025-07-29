import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../../features/user/fetchUserInfoSlice";

export default function Comment({ author, bodyText, ups }) {
  const dispatch = useDispatch();

  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await dispatch(fetchUserInfo(author));

      if (userInfo.payload.snoovatar_img) {
        setUserImage(userInfo.payload.snoovatar_img);
      }

      if (!userInfo.payload.snoovatar_img && userInfo.payload.icon_img) {
        setUserImage(userInfo.payload.icon_img);
      }
    };
    fetchUser();
  }, [author]);

  return (
    <div className="post-comment">
      <div className="comment-header">
        {" "}
        <div className="user-icon">
          {" "}
          {userImage ? (
            <img src={userImage} />
          ) : (
            <img src="/avatar_default_14_545452-4021259790.png" />
          )}
        </div>
        <div className="comment-author">
          <h5>{author}</h5>
        </div>
      </div>
      <div className="post-comment-body">{bodyText}</div>
      <p>{ups}</p>
    </div>
  );
}