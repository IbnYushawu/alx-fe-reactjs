import React, { useContext } from "react";
import UserContext from "./UserContext";
import UserDetails from "../UserDetails";

function UserProfile() {
  const userData = useContext(UserContext);

  return (
    <div>
      <h2>User Profile</h2>
      <UserDetails user={user} />
    </div>
  );
}

export default UserProfile;
