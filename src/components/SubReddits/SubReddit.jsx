
export default function SubReddit({name, icon}) {
    return (
      <>
        <div className="sub-reddit">
          <img src={icon ? icon : "/reddit-logo.jpg"} alt="redditor user icon" />
          <p>{name}</p>
        </div>
      </>
    );
}