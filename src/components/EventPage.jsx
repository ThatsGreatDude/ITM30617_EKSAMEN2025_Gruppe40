import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const { filler_id } = useParams();
const [filler, setFiller] = useState();

const getFiller = async () => {
  fetch(``) {/* Må huske å legge til den egentlige URLen -malene */}
    .then((response) => response.json())
    .then((data) => setFiller(data.data))
    .catch((error) =>
      console.error("det skjedde en feil under fecth", error)
    );
};

useEffect(() => {
  getFiller();
}, [filler_id]);
return <h1>{filler?.name}</h1>;
}
 
{/* Filler står som foreløpig filler name for hva det egentlig skal kalles - malene*/}