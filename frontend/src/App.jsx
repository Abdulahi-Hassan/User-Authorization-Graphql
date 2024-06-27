import { Route, Routes } from "react-router-dom";
// import UserCreate from "./components/CreateUser";
// import UserUpdate from "./components/UpdateUser";
import User from "./User";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div>
    
      <Routes>
        {/* <Route path="/createuser" element={<UserCreate />} />
        <Route path="/updateuser/:id" element={<UserUpdate />} /> */}
        <Route path="/" element={<User />} />
        <Route
          path="*"
          element={
            <h1
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              Not found
            </h1>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}
export default App;
