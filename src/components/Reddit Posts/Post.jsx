import ReactMarkdown from "react-markdown";
import { formatDistanceToNow } from "date-fns";

export default function Post({subreddit, title, text, image, voteNum, timePosted }) {

  const timeAgo = formatDistanceToNow(new Date(timePosted * 1000), {
    addSuffix: true,
  });

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
      <div className="post">
        <div className="post-header">
          <p>{subreddit}</p>
          <p className="post-time">{timeagoShort(timePosted)}</p>
        </div>
        <div className="post-without-sub">
          <div className="post-voting">
            <div className="voting-button">
              <button className="up-vote">ꜛ</button>
            </div>
            <p>{voteNum}</p>
            <div className="voting-button">
              <button className="down-vote">ꜜ</button>
            </div>
          </div>
          <div className="post-body">
            <div className="post-name">
              <h3>{title}</h3>
            </div>
            <div className="post-main">
              <img src={image} className="post-image" />
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
                {text}
              </ReactMarkdown>
            </div>
            <div className="post-details">
              <p>{timeAgo}</p>
              <button className="comment-button">Comments</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
