import { IUser } from "../types/IUser";

function UserCard(props: IUser) {
  return (
    <div className="userCard">
      <div className="userEmail">
        <a className="userEmailLink" href={`mailto:${props.email}`}>
          {props.email}
        </a>
      </div>
      <div className="userNumber">
        <a className="userNumberLink" href={`tel:${props.number}`}>
          {props.number}
        </a>
      </div>
    </div>
  );
}

export default UserCard;
