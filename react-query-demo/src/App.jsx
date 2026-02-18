import PostsComponent from "./components/PostsComponent";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
      <PostsComponent />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
