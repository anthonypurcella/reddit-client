import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postVote } from "../../features/posts/voting/voteSlice";
import { fetchPostInfo } from "../../features/posts/fetchPostInfoSlice";
import { fetchUserInfo } from "../../features/user/fetchUserInfoSlice";
import { postComment } from "../../features/comment/postCommentSlice";

export default function Reply({
  author,
  bodyText,
  ups,
  timePosted,
  repliesObject,
  likes,
  replyId,
  permalink
}) {
  const dispatch = useDispatch();

  const [userImage, setUserImage] = useState("");
  const [replies, setReplies] = useState(repliesObject?.data?.children || []);
  const [showDetails, setShowDetails] = useState(true);
  const [commentLikes, setCommentLikes] = useState(likes);
  const [likesCount, setLikesCount] = useState(ups);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [commentInput, setCommentInput] = useState("");

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

    async function handleUpVote(commentId, commentPermalink) {
      if (!commentId) {
        return;
      }
  
      if (commentLikes !== true) {
        const id = `t1_${commentId}`;
        const voteNum = 1;
        await dispatch(postVote({ id, voteNum }));
        setLikesCount(likesCount + 1);
      }
  
      if (commentLikes === true) {
        const id = `t1_${commentId}`;
        const voteNum = 0;
        await dispatch(postVote({ id, voteNum }));
        setLikesCount(likesCount - 1);
      }
  
      if (commentLikes === false) {
        setLikesCount(likesCount + 2);
      }
  
      const newPostData = await dispatch(fetchPostInfo(commentPermalink));
      console.log(newPostData);
      console.log(
        `Comment ${commentId} likes is now: ${newPostData.payload.postComments[0].data.likes}`
      );
  
      setCommentLikes(newPostData.payload.postComments[0].data.likes);
    }
  
    async function handleDownVote(commentId, commentPermalink) {
      if (!commentId) {
        return;
      }
  
      if (commentLikes !== false) {
        const id = `t1_${commentId}`;
        const voteNum = -1;
        await dispatch(postVote({ id, voteNum }));
        setLikesCount(likesCount - 1);
      }
  
      if (commentLikes === false) {
        const id = `t1_${commentId}`;
        const voteNum = 0;
        await dispatch(postVote({ id, voteNum }));
        setLikesCount(likesCount + 1);
      }
  
      if (commentLikes === true) {
        setLikesCount(likesCount - 2);
      }
  
      const newPostData = await dispatch(fetchPostInfo(commentPermalink));
      console.log(newPostData);
      console.log(
        `Comment ${commentId} likes is now: ${newPostData.payload.postComments[0].data.likes}`
      );
  
      setCommentLikes(newPostData.payload.postComments[0].data.likes);
    }

    async function handleCommentSubmit(e) {
          e.preventDefault();
          const id = `t1_${replyId}`;
          const text = commentInput;
          await dispatch(postComment({ id, text }));
          setCommentInput("");
        }

  return (
    <>
      <div className="full-reply">
        <div className="reply-divider">
          <div className="comment-reply">
            <div className="reply-header" onClick={() => setShowDetails(true)}>
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
            {showDetails ? (
              <div>
                {" "}
                <div
                  className="comment-reply-body"
                  onClick={() => setShowDetails(false)}
                >
                  {bodyText}
                </div>
                <div className="comment-details">
                  <div className="full-comment-voting">
                    <div className="voting-button">
                      {commentLikes === true ? (
                        <button
                          className="up-vote-complete"
                          onClick={() => handleUpVote(replyId, permalink)}
                        >
                          ꜛ
                        </button>
                      ) : (
                        <button
                          className="up-vote"
                          onClick={() => handleUpVote(replyId, permalink)}
                        >
                          ꜛ
                        </button>
                      )}
                    </div>
                    <p className="comment-likes-count">{likesCount}</p>
                    <div className="voting-button">
                      {commentLikes === false ? (
                        <button
                          className="down-vote-complete"
                          onClick={() => handleDownVote(replyId, permalink)}
                        >
                          ꜜ
                        </button>
                      ) : (
                        <button
                          className="down-vote"
                          onClick={() => handleDownVote(replyId, permalink)}
                        >
                          ꜜ
                        </button>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setShowReplyInput(true)}
                    className="reply-button"
                  >
                    Reply
                  </button>
                </div>
                {showReplyInput ? (
                  <form
                    onSubmit={(e) => handleCommentSubmit(e)}
                    className="reply-input-container"
                  >
                    <textarea
                      placeholder="Join the conversation"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <div className="reply-input-buttons">
                      <button
                        onClick={() => {
                          setShowReplyInput(false), setCommentInput("");
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!commentInput}
                        className="comment-reply-button"
                      >
                        Comment
                      </button>
                    </div>
                  </form>
                ) : (
                  <></>
                )}
                <div className="reply-replies">
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
                          likes={reply.data.likes}
                          id={reply.data.id}
                          permalink={reply.data.permalink}
                        />
                      ))}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
