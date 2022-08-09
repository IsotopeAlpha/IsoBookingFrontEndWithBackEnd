import "./propertyList.css";
import pic from "../../images/vibe.jpg"
import useFetch from "../../hooks/useFetch";

const PropertyList = () =>{

    const {data, loading} = useFetch("http://localhost:8000/api/hotels/countByType?types=hotel,villa,cabin,resort,apartment");
    
    return(
        <div className="pList">
            {loading?("Loading...."):<><div className="pListItem">
                <img src={pic} alt=""  className="pListImg"/>
                <div className="pListTitles">
                    <h1>Hotels</h1>
                    <h2>{data[0]} hotels</h2>
                </div>
            </div>
            <div className="pListItem">
                <img src={pic} alt=""  className="pListImg"/>
                <div className="pListTitles">
                    <h1>Villas</h1>
                    <h2>{data[1]} villas</h2>
                </div>
            </div>
            <div className="pListItem">
                <img src={pic} alt="" className="pListImg"/>
                <div className="pListTitles">
                    <h1>Cabins</h1>
                    <h2>{data[2]} cabins</h2>
                </div>
            </div>
            <div className="pListItem">
                <img src={pic} alt="" className="pListImg"/>
                <div className="pListTitles">
                    <h1>Resorts</h1>
                    <h2>{data[3]} resorts</h2>
                </div>
            </div>
            <div className="pListItem">
                <img src={pic} alt=""  className="pListImg"/>
                <div className="pListTitles">
                    <h1>Apartments</h1>
                    <h2>{data[4]} apartments</h2>
                </div>
            </div></>}
        </div>
    );
}

export default PropertyList;