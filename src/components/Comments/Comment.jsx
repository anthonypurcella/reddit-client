import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../../features/user/fetchUserInfoSlice";
import Reply from "./Reply";

export default function Comment({ author, bodyText, ups, timePosted, repliesObject }) {

const [replies, setReplies] = useState(repliesObject?.data?.children || []);
const [showDetails, setShowDetails] = useState(true);

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
      <div className="post-comment">
        <div onClick={() => setShowDetails(!showDetails)}>
          <div className="comment-header">
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
            <div className="comment-author">
              <p>
                {author} • {timeagoShort(timePosted)}
              </p>
            </div>
          </div>
          {showDetails ? (
            <div>
              <div className="post-comment-body">{bodyText}</div>
              <p>{ups}</p>
              <div className="comment-replies">
                {replies.length > 0 &&
                  showDetails &&
                  replies
                    .slice()
                    .sort((a, b) => a.data.created_utc - b.data.created_utc)
                    .map((reply) => (
                      <Reply
                        key={reply.data.id}
                        author={reply.data.author}
                        bodyText={reply.data.body}
                        ups={reply.data.ups}
                        timePosted={reply.data.created_utc}
                        repliesObject={reply.data.replies}
                      />
                    ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

