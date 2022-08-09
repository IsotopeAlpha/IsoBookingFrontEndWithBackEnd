import "./featured.css";
import pic from "../../images/vibe.jpg";
import useFetch from "../../hooks/useFetch";

const Featured = () =>{

    const {data, loading} = useFetch("http://localhost:8000/api/hotels/countByCity?cities=Accra,Madrid,London");
    
    return(
        <div className="featured">
            {loading?("Loading Please Wait..."):(<><div className="featuredItem">
                <img src={pic} alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>Accra</h1>
                    <h2>{data[0]} properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src={pic} alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>Madrid</h1>
                    <h2>{data[1]} properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src={pic} alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>London</h1>
                    <h2>{data[2]} properties</h2>
                </div>
            </div></>)}
        </div>
    );
}

export default Featured;