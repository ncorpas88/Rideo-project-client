import service from "../service/service.config";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardPost from "../Components/CardPost";

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
      const response = await service.get(`/post`);
      setAllPost(response.data);
    } catch (error) {
      console.log(error);
      navigate("/*");
    }
  };

  if (allPost === null) {
    return (
      <div className="d-flex justify-content-center aling-items-center vh-100">
        <br />
        <div className="lodingpost">
          <p>Loading Post...</p>
          <img src="image/ciclismo-14.gif" alt="ciclista" />
        </div>
      </div>
    );
  }

  return (
    <div className="posts">
      <div className="filter-icons d-flex gap-3 justify-content-center my-3">
        <div className="iconosfiltro">
          <div className="d-flex gap-3 justify-content-center my-3">
            <img
              src="image/all.png"
              alt="Todos"
              width="50"
              height="50"
              style={{ cursor: "pointer" }}
              onClick={() => handleFilterPost({ target: { value: "" } })}
            />

            <img
              src="/image/lt30.png"
              alt="Menos de 30km"
              width="50"
              height="50"
              style={{ cursor: "pointer" }}
              onClick={() => handleFilterPost({ target: { value: "lt30" } })}
            />

            <img
              src="/image/30-50.png"
              alt="3050km"
              width="50"
              height="50"
              style={{ cursor: "pointer" }}
              onClick={() => handleFilterPost({ target: { value: "30-50" } })}
            />

            <img
              src="/image/50-70.png"
              alt="5070km"
              width="50"
              height="50"
              style={{ cursor: "pointer" }}
              onClick={() => handleFilterPost({ target: { value: "50-70" } })}
            />

            <img
              src="/image/gt70.png"
              alt="+70km"
              width="50"
              height="50"
              style={{ cursor: "pointer" }}
              onClick={() => handleFilterPost({ target: { value: "gt70" } })}
            />
          </div>
        </div>
      </div>

      <hr />

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
            return km > 50 && km < 70;
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
