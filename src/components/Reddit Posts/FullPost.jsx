import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPostInfo } from "../../features/posts/fetchPostInfoSlice";
import ReactMarkdown from "react-markdown";
import { formatDistanceToNow } from "date-fns";
import Comment from "../Comments/Comment";

export default function FullPost({ currentPermalink }) {
  const dispatch = useDispatch();

  const [postInfo, setPostInfo] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [postLikes, setPostLikes] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [timeAgo, setTimeAgo] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      const result = await dispatch(fetchPostInfo(currentPermalink));
      console.log(result);
      setPostInfo(result.payload.postData);
      setPostComments(result.payload.postComments);
      setTimeAgo(
        formatDistanceToNow(
          new Date(result.payload.postData.created_utc * 1000),
          {
            addSuffix: true,
          }
        )
      );
      setLikesCount(result.payload.postData.ups);
      setPostLikes(result.payload.postDatalikes);
    };

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
                {postInfo.text}
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
              <p className="time-ago">{timeAgo}</p>
            </div>
          </div>
        </div>
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
            />
          ))}
      </div>
    </>
  );
}
