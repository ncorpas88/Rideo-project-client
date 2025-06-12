
import './App.css'
import HomePage from './Pages/HomePage'
import ErrorPage from './Pages/ErrorPage'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import UserProfilePage from './Pages/UserProfilePage'
import FormUpdatePostPage from './Pages/FormUpdatePostPage'
import FormUpdateProfilePage from './Pages/FormUpdateProfilePage'
import FormCreatePostPage from './Pages/FormCreatePostPage'
import DetailsPostPage from './Pages/DetailsPostPage'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

function App() {


  return (
    <>
      <Navbar />
      <HomePage />
      <ErrorPage />
      <LoginPage />
      <SignupPage />
      <UserProfilePage />
      <FormUpdatePostPage />
      <FormUpdateProfilePage />
      <FormCreatePostPage />
      <DetailsPostPage />
      <Footer />
    </>
  )
}

export default App
