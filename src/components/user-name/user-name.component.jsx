import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

const UserName = () => {
  const { userName } = useContext(UserContext);

  return (
    <div className="user-name-container">
      {userName ? <h2>Welcome {userName}</h2> : <h2>Register to shop</h2>}
    </div>
  );
};

export default UserName;
