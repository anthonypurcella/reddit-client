
export default function SubReddit({name, icon}) {
    return (
      <>
        <div className="sub-reddit">
          <img
            src={icon || "/assets/reddit-logo.jpg"}
            alt="Subreddit Reddit Icon"
          />
          <p>{name}</p>
        </div>
      </>
    );
}

