import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardPost from "../Components/CardPost";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

function HomePage() {
  const [allPost, setAllPost] = useState([]);

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const distancekm = searchParams.get("distancekm");
  const search = searchParams.get("search");

  const handleFilterPost = (e) => {
    const newDistance = e.target.value;
    const currentSearch = searchParams.get("search");

    const updatedParams = {};
    if (currentSearch) updatedParams.search = currentSearch;
    if (newDistance) updatedParams.distancekm = newDistance;

    setSearchParams(updatedParams);
  };

  useEffect(() => {
    getData();
  }, [distancekm, search]);

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

  if (allPost === null) {
    return (
      <div className="d-flex justify-content-center aling-items-center vh-100">
        <Spinner animation="grow" variant="dark" />
        <br />
        <p>Loading Post...</p>
      </div>
    );
  }

  return (
    <div className="posts">
      <Form.Select size="lg" onChange={handleFilterPost} username="" _id="">
        <option value="">All Post</option>
        <option value="lt30">Menos de 30 km</option>
        <option value="30-50">Entre 30 Y 50 KM</option>
        <option value="50-70">Entre 50 y 70 km</option>
        <option value="gt70">MÁS DE 70 KM</option>
      </Form.Select>

      {allPost
        .filter((eachPost) => {
          if (search === null) {
            return true;
          } else {
            return eachPost.location
              .toLowerCase()
              .includes(search.toLocaleLowerCase());
          }
        })
        .filter((eachPostKm) => {
          const km = eachPostKm.distancekm;
          if (distancekm === null) {
            return true;
          } else if (distancekm === "lt30") {
            return km < 30;
          } else if (distancekm === "30-50") {
            return km >= 30 && km <= 50;
          } else if (distancekm === "50-70") {
            return km >= 50 && km >= 70;
          } else if (distancekm === "gt70") {
            return km > 70;
          } else {
            return true;
          }
        })
        .map((eachPost) => {
          return <CardPost key={eachPost._id} eachPost={eachPost} />;
        })}
    </div>
  );
}

export default HomePage;
