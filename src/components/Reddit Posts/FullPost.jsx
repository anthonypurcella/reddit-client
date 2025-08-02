import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postVote } from "../../features/posts/voting/voteSlice";
import { fetchPostInfo } from "../../features/posts/fetchPostInfoSlice";
import ReactMarkdown from "react-markdown";
import { timeAgo } from "../../util/timeFormatting";
import Comment from "../Comments/Comment";
import { postComment } from "../../features/comment/postCommentSlice";

export default function FullPost({ currentPermalink }) {
  const dispatch = useDispatch();

  const [postInfo, setPostInfo] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [postLikes, setPostLikes] = useState();
  const [likesCount, setLikesCount] = useState();
  const [commentInput, setCommentInput] = useState('');
  const [timePosted, setTimePosted] = useState(0);

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

  async function handleSubmit(e) {
    e.preventDefault();
    const id = `t3_${postInfo.id}`;
    const text = commentInput;
    await dispatch(postComment({id, text}));
    setCommentInput('');
  }

useEffect(() => {
  if (postInfo && postInfo.length > 0) {
  return;
  }
    const fetchPost = async () => {
      const result = await dispatch(fetchPostInfo(currentPermalink));
      console.log(result);
      setPostInfo(result.payload.postData);
      setPostComments(result.payload.postComments);
      setTimePosted(result.payload.postData.created_utc)
    }
    fetchPost();
  }, [currentPermalink]);

  return (
    <>
      <div className="post">
        <div className="post-header">
          <p>r/{postInfo.subreddit}</p>
        </div>
        <div className="post-without-sub">
          <div className="post-body">
            <div className="post-name">
              <h3>{postInfo.title}</h3>
            </div>
            <div className="post-main">
              <img
                src={postInfo.preview?.images?.[0]?.source?.url?.replace(
                  /&amp;/g,
                  "&"
                )}
                className="post-image"
              />
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
                          maxWidth: "80%",
                          background: "#f6f8fa",
                          padding: "10px",
                          borderRadius: "6px",
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
                {postInfo.selftext}
              </ReactMarkdown>
            </div>
            <div className="post-details">
              <div className="full-post-voting">
                <div className="voting-button">
                  {postLikes === true ? (
                    <button
                      className="up-vote-complete"
                      onClick={() =>
                        handleUpVote(postInfo.id, postInfo.permalink)
                      }
                    >
                      ꜛ
                    </button>
                  ) : (
                    <button
                      className="up-vote"
                      onClick={() =>
                        handleUpVote(postInfo.id, postInfo.permalink)
                      }
                    >
                      ꜛ
                    </button>
                  )}
                </div>
                <p className="full-likes-count">{likesCount}</p>
                <div className="voting-button">
                  {postLikes === false ? (
                    <button
                      className="down-vote-complete"
                      onClick={() =>
                        handleDownVote(postInfo.id, postInfo.permalink)
                      }
                    >
                      ꜜ
                    </button>
                  ) : (
                    <button
                      className="down-vote"
                      onClick={() =>
                        handleDownVote(postInfo.id, postInfo.permalink)
                      }
                    >
                      ꜜ
                    </button>
                  )}
                </div>
              </div>
              <p className="time-ago">{timeAgo(timePosted)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="comment-input-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <textarea
            placeholder="Join the conversation"
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button type="submit" disabled={!commentInput}>
            Reply
          </button>
        </form>
      </div>
      <div className="post-comments">
        {postComments
          .slice()
          .sort((a, b) => b.data.ups - a.data.ups)
          .map((comment) => (
            <Comment
              key={comment.data.id}
              author={comment.data.author}
              bodyText={comment.data.body}
              ups={comment.data.ups}
              timePosted={comment.data.created_utc}
              repliesObject={comment.data.replies}
              likes={comment.data.likes}
              commentId={comment.data.id}
              permalink={comment.data.permalink}
            />
          ))}
      </div>
    </>
  );
}
