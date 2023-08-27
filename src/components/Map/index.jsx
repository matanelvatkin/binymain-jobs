import styles from "./style.module.css";
import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";


export default function Map() {
  const google = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_MAPS,
    libraries:["places"]
  });
  if (!google.isLoaded) return <div>Loading...</div>;
  return <MapIn />;
}

function MapIn() {
  const center = useMemo(() => ({ lat: 31.94864, lng: 35.25680 }), []);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    console.log(selected);
  },[selected])
  return (
    <>
      <div className={styles.places_container}>
        <LocationSearchInput setSelected={setSelected} />
      </div>

      <GoogleMap zoom={10} center={center} mapContainerClassName={styles.map}>
        {selected.length>0 && selected.map(mark=><Marker position={mark} />)}
      </GoogleMap>
    </>
  );
}


const LocationSearchInput = ({setSelected}) => {
  const [address,setAddress] = useState('')
  const [stateLatLng,setStateLatLng] = useState()

  const handleSelect = async (address) => {
   const results = await geocodeByAddress(address)
   const latLng = await  getLatLng(results[0])
   setStateLatLng(latLng)
  };
  useEffect(() => {
    if(stateLatLng){
      console.log("Success", stateLatLng)
      setSelected(prev=>[...prev,stateLatLng])
    }
  },[stateLatLng])

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(address)=>setAddress(address)}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: "Search Places ...",
              className: "location-search-input",
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};
