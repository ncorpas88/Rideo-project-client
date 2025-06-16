import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPost from "../Components/CardPost";



function HomePage() {
  const [allPost, setAllPost] = useState([]);
  
  const navigate = useNavigate();
 

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/post`
      );
      setAllPost(response.data);
    } catch (error) {
      console.log(error);
      navigate("/*");
    }
  };

  

  return (
    <div className="posts">
      {allPost.map((eachPost) => {
        return <CardPost key={eachPost._id} eachPost={eachPost} />;
      })}
      
    </div>
  );
}

export default HomePage;
