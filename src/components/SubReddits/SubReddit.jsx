
export default function SubReddit({name, icon}) {
    return (
      <>
        <div className="sub-reddit">
          <img src={icon ? icon : "public/reddit-logo.jpg"} />
          <p>{name}</p>
        </div>
      </>
    );
}