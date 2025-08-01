import ReactMarkdown from "react-markdown";
import { postVote } from "../../features/posts/voting/voteSlice";
import { useDispatch } from "react-redux";
import { fetchPostInfo } from "../../features/posts/fetchPostInfoSlice";
import { useState } from "react";
import { useNavigate } from "react-router";
import { timeAgo } from "../../util/timeFormatting";
import { timeagoShort } from "../../util/timeFormatting";

export default function Post({
  subreddit,
  title,
  text,
  image,
  voteNum,
  timePosted,
  postId,
  likes,
  permalink,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postLikes, setPostLikes] = useState(likes);
  const [likesCount, setLikesCount] = useState(voteNum);

  async function handleUpVote(postId, postPermalink) {
    if (!postId) {
      return;
    }

    if (postLikes !== true) {
      const id = `t3_${postId}`;
      const voteNum = 1;
      await dispatch(postVote({ id, voteNum }));
      setLikesCount(likesCount + 1);
    }

    if (postLikes === true) {
      const id = `t3_${postId}`;
      const voteNum = 0;
      await dispatch(postVote({ id, voteNum }));
      setLikesCount(likesCount - 1);
    }

    if (postLikes === false) {
      setLikesCount(likesCount + 2);
    }

    const newPostData = await dispatch(fetchPostInfo(postPermalink));
    console.log(newPostData);
    console.log(
      `Post ${postId} likes is now: ${newPostData.payload.postData.likes}`
    );

    setPostLikes(newPostData.payload.postData.likes);
  }

  async function handleDownVote(postId, postPermalink) {
    if (!postId) {
      return;
    }

    if (postLikes !== false) {
      const id = `t3_${postId}`;
      const voteNum = -1;
      await dispatch(postVote({ id, voteNum }));
      setLikesCount(likesCount - 1);
    }

    if (postLikes === false) {
      const id = `t3_${postId}`;
      const voteNum = 0;
      await dispatch(postVote({ id, voteNum }));
      setLikesCount(likesCount + 1);
    }

    if (postLikes === true) {
      setLikesCount(likesCount - 2);
    }

    const newPostData = await dispatch(fetchPostInfo(postPermalink));
    console.log(
      `Post ${postId} likes is now: ${newPostData.payload.postData.likes}`
    );

    setPostLikes(newPostData.payload.postData.likes);
  }

  function handlePostSelect(postPermalink) {
    navigate(`/post/${encodeURIComponent(postPermalink)}`);
  }

  return (
    <>
      <div className="post">
        <div className="post-header">
          <p>{subreddit}</p>
          <p className="post-time">{timeagoShort(timePosted)}</p>
        </div>
        <div className="post-without-sub">
          <div className="post-voting">
            <div className="voting-button">
              {postLikes === true ? (
                <button
                  className="up-vote-complete"
                  onClick={() => handleUpVote(postId, permalink)}
                >
                  ꜛ
                </button>
              ) : (
                <button
                  className="up-vote"
                  onClick={() => handleUpVote(postId, permalink)}
                >
                  ꜛ
                </button>
              )}
            </div>
            <p>{likesCount}</p>
            <div className="voting-button">
              {postLikes === false ? (
                <button
                  className="down-vote-complete"
                  onClick={() => handleDownVote(postId, permalink)}
                >
                  ꜜ
                </button>
              ) : (
                <button
                  className="down-vote"
                  onClick={() => handleDownVote(postId, permalink)}
                >
                  ꜜ
                </button>
              )}
            </div>
          </div>
          <div className="post-body-container">
            <div
              className="post-body"
              onClick={(e) => handlePostSelect(permalink)}
            >
              <div className="post-name">
                <h3>{title}</h3>
              </div>
              <div className="post-main">
                {image ? (
                  <img
                    src={image}
                    alt="user uploaded image"
                    className="post-image"
                  />
                ) : (
                  <></>
                )}
                <div className="react-markdown-container">
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        if (inline) {
                          // inline code, render normally
                          return (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        }
                        // multiline code block
                        return (
                          <pre
                            style={{
                              overflowX: "scroll",
                              maxWidth: "100%",
                              background: "#f6f8fa",
                              padding: "10px",
                              borderRadius: "6px",
                              whiteSpace: "pre-wrap", // wrap long lines
                              wordBreak: "break-word", // allow breaking in words
                              overflowWrap: "break-word", // legacy/fallback
                            }}
                          >
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        );
                      },
                    }}
                  >
                    {text}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
            <div className="post-details">
              <p className="time-ago">{timeAgo(timePosted)}</p>
              <button
                onClick={(e) => handlePostSelect(permalink)}
                className="comment-button"
              >
                Comments
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
