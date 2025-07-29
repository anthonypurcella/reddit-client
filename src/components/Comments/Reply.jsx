
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../../features/user/fetchUserInfoSlice";

export default function Reply({
  author,
  bodyText,
  ups,
  timePosted,
  replies,
}) {
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

  function timeagoShort() {
    const seconds = Math.floor(Date.now() / 1000) - timePosted;

    const intervals = [
      { label: "y", seconds: 31536000 },
      { label: "mo", seconds: 2592000 },
      { label: "d", seconds: 86400 },
      { label: "h", seconds: 3600 },
      { label: "m", seconds: 60 },
      { label: "s", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count}${interval.label}`;
      }
    }

    return "now";
  }

  return (
    <>
      <div className="full-reply">
        <div className="reply-divider">
          <div className="comment-reply">
            <div className="reply-header">
              <div className="user-icon">
                {userImage ? (
                  <img
                    src={userImage}
                    onError={() => setUserImage("/avatar_default_6.png")}
                  />
                ) : (
                  <img src="/avatar_default_6.png" />
                )}
              </div>
              <div className="reply-author">
                <p>
                  {author} • {timeagoShort(timePosted)}
                </p>
              </div>
            </div>
            <div className="comment-reply-body">{bodyText}</div>
            <p>{ups}</p>
          </div>
        </div>
      </div>
    </>
  );
}
