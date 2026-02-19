import { TextField } from "@mui/material";
import { useEffect } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

function GoogleMapLocation({ inputRef, setEventInfo, setDefaultLocationMarker}) {
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const autocomplete = new places.Autocomplete(inputRef.current, {
      fields: ["name", "geometry", "formatted_address"],
    });

    autocomplete.addListener("place_changed", () => {

        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        // // This combine the place name and formatted address 
        const fullAddress = place.name
        ? `${place.name}, ${place.formatted_address}`
        : place.formatted_address;

        // // this show combined address
        inputRef.current.value = fullAddress;

        setDefaultLocationMarker({ lat, lng });

        setEventInfo(prev => ({
            ...prev,
            location: {
            address: fullAddress,
            latitude: lat,
            longitude: lng,
            },
        }));

       setDefaultLocationMarker({ lat, lng });
        });

    }, [places]);

  return (
    <TextField
      placeholder="Search location"
      inputRef={inputRef}
      fullWidth
      sx={{ mt: "10px" }}
    />
  );
}

export default GoogleMapLocation;
