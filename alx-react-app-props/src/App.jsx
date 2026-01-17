import ProfilePage from "./ProfilePage";
import UserContext from "./UserContext"

function App() {
  const userData = {
    name: "Ibn Yushawu",
    email: "iyushawu@gmail.com"
  };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage/>
    </UserContext.Provider>
  );
}

export default App;

