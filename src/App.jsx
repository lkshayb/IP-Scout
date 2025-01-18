import { useState, useEffect } from "react";
import * as React from "react";
import "./App.css";
import Map from "react-map-gl/maplibre";

function App() {
  const [ipdet, setIpdet] = useState(null); // Initialize as null to handle loading
  const [customIp, setCustomIp] = useState(""); // State for custom IP address
  const [cIPdet,setcIPdet] = useState(null);
  const [cdata,setcdata] = useState(false)
  useEffect(() => {
    // Fetch user's IP details on load
    fetch("https://api.ipdata.co/?api-key=043f43693125248210d507b5abf343e3d1b7496874d1b3eef2d814ae")
      .then((r) => r.json())
      .then((data) => {
        setIpdet(data);
      })
      .catch((error) => {
        console.error("Error:",error);
      });
  }, []);

  function initsearch() {
    if (!customIp) {
        alert("Invalid IP address");
        return;
     }
    
    fetch('https://api.ipdata.co/'+customIp+'?api-key=043f43693125248210d507b5abf343e3d1b7496874d1b3eef2d814ae')
      .then((r) => r.json())
      .then((data) => {
        setcIPdet(data);
        setcdata(true)
        console.log(cIPdet)
    })
    .catch((error) => {
      console.error("Error:",error);
    });
  }

  return (
    <div>
      <div>
        <h1>Find The Approx Location For An IP Address.</h1>
        <div>
          <input
            type="text"
            placeholder="Enter IP address"
            onChange={(e) => setCustomIp(e.target.value)} // Update state on input
          />
          <button onClick={initsearch}>Enter</button>
        </div>
        <div>
          {cIPdet ? (
              <div>
                <Map
                  initialViewState={{
                    longitude: cIPdet.longitude || 0,
                    latitude: cIPdet.latitude || 0,
                    zoom: 12,
                  }}
                  style={{ width: 900, height: 400,fontSize:0 }}
                  mapStyle="https://api.maptiler.com/maps/streets/style.json?key=SjSnUEMaVUEmC0E8TN03	"
                />
              </div>
          ) : (
            <div>
              Result Here
            </div>
          )}
          <br />
          <hr />
        </div>
      </div>
      <div>
        {ipdet ? (
          <div>
            <div>
              <h2>Your IP address</h2>
              <span>{ipdet.ip}</span>
            </div>
            <div>
              <h2>Your Approx Coordinates</h2>
              <span>{ipdet.longitude}, {ipdet.latitude}</span>
            </div>
            <div>
              <Map
                initialViewState={{
                  longitude: ipdet.longitude || 0,
                  latitude: ipdet.latitude || 0,
                  zoom: 12,
                }}
                style={{ width: 900, height: 400,fontSize:0 }}
                mapStyle="https://api.maptiler.com/maps/streets/style.json?key=SjSnUEMaVUEmC0E8TN03	"
              />
            </div>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
}

export default App;
