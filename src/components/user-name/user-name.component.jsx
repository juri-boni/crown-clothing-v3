import { useContext } from "react";
import { useSelector } from "react-redux";
import { UserContext } from "../../contexts/user.context";
import { selectUserName } from "../../app/user/user.selector";

const UserName = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className="user-name-container">
      {userName ? <h2>Welcome {userName}</h2> : <h2>Register to shop</h2>}
    </div>
  );
};

export default UserName;
