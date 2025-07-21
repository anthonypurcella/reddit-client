export default function Post() {
  return (
    <>
      <div className="post">
        <div className="post-header">
          <img />
          <p>r/subRedditName</p>
        </div>
        <div className="post-without-sub">
          <div className="post-voting">
            <div className="voting-button">
              <button className="up-vote">ꜛ</button>
            </div>
            <p>23</p>
            <div className="voting-button">
              <button className="down-vote">ꜜ</button>
            </div>
          </div>
          <div className="post-body">
            <div className="post-name">
              <h3>This will be the main post description</h3>
            </div>
            <div className="post-main">
              <p>This will be main asset of post. Usually a photo.</p>
            </div>
            <div className="post-details">
              <p>1 hour ago</p>
              <button className="comment-button">Comments</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
