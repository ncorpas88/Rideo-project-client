import { Routes, Route } from "react-router-dom";
import "./App.css";
//Pages
import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import UserProfilePage from "./Pages/UserProfilePage";
import FormUpdatePostPage from "./Pages/FormUpdatePostPage";
import FormUpdateProfilePage from "./Pages/FormUpdateProfilePage";
import FormCreatePostPage from "./Pages/FormCreatePostPage";
import DetailsPostPage from "./Pages/DetailsPostPage";

//Components
import MyNavbar from "./Components/MyNavbar";
import Footer from "./Components/Footer";
import OnlyPrivate from "./Components/OnlyPrivate";


function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signin" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<ErrorPage />}/>
        <Route path="/userProfile" element={<OnlyPrivate><UserProfilePage /></OnlyPrivate>}/>
        <Route path="/createPost" element={<OnlyPrivate><FormCreatePostPage/></OnlyPrivate>}/>
        <Route path="/details/:postId" element={<DetailsPostPage />} />
        <Route path="/formUpdatePostPage/:postId" element={<FormUpdatePostPage />} />
        <Route path="/updateProfile/:userId" element={<FormUpdateProfilePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
