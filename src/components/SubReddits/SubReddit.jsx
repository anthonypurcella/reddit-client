
export default function SubReddit({name, icon}) {
    return (
      <>
        <div className="sub-reddit">
          <img
            src={icon ? icon : "./assets/avatar_default_6.png"}
            alt="redditor user icon"
          />
          <p>{name}</p>
        </div>
      </>
    );
}