import ProfilePage from "./ProfilePage";
import UserContext from "./UserContext"
import UserProfile from "./UserProfile";

function App() {
  const userData = {
    name: "Ibn Yushawu",
    email: "iyushawu@gmail.com"
  };

  return (
    <UserContext.Provider value={userData}>
      <UserProfile />
    </UserContext.Provider>
  );
}

export default App;

