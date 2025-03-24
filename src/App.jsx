import { useState, useEffect } from "react";
import * as React from "react";
import "./App.css";
import Map from "react-map-gl/maplibre";

function App() {
  const [ipdet, setIpdet] = useState(null); 
  const [customIp, setCustomIp] = useState(""); 
  const [cIPdet, setcIPdet] = useState(null);
  const [cdata, setcdata] = useState(false);
  useEffect(() => {
    fetch(
      "https://api.ipdata.co/?api-key=043f43693125248210d507b5abf343e3d1b7496874d1b3eef2d814ae"
    )
      .then((r) => r.json())
      .then((data) => {
        setIpdet(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function initsearch() {
    if (!customIp) {
      alert("Invalid IP address");
      return;
    }

    fetch(
      "https://api.ipdata.co/" +
        customIp +
        "?api-key=043f43693125248210d507b5abf343e3d1b7496874d1b3eef2d814ae"
    )
      .then((r) => r.json())
      .then((data) => {
        setcIPdet(data);
        setcdata(true);
        console.log(cIPdet);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="main">
      <div>
        <div className="header">
          <h1 style={{ textShadow: "5px 5px 2px white" }}>
            Locate Any IP address
          </h1>
        </div>
        <hr
          style={{
            height: 2,
            borderWidth: 0,
            color: "black",
            backgroundColor: "black",
            margin: 0,
            padding: 0,
          }}
        />
        <div className="cipbar">
          <input
            type="text"
            placeholder="Enter IP address"
            onChange={(e) => setCustomIp(e.target.value)} 
          />
          <button onClick={initsearch}>Enter</button>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{marginTop:50}}>
              {cIPdet ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    className="mainbox"
                    style={{
                      display: "flex",
                      backgroundColor: "green",
                      padding: 20,
                      paddingBottom: 25,
                      justifyContent: "space-evenly",
                      width: "80vw",
                      borderRadius: 10,
                      boxShadow: "5px 5px 8px black",
                      alignItems: "center",
                      marginBottom: 60,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 15,
                      }}
                    >
                      <div>
                        <h1>Approx Coordinates</h1>
                        <span
                          style={{ color: "white", fontSize: 23, marginTop: 0 }}
                        >
                          {cIPdet.longitude}, {cIPdet.latitude}
                        </span>
                      </div>
                      <div>
                        <h1>Region</h1>
                        <span
                          style={{ color: "white", fontSize: 23, marginTop: 0 }}
                        >
                          {cIPdet.region} , {cIPdet.country_name} ,{" "}
                          {cIPdet.continent_name}
                        </span>
                      </div>
                      <div>
                        <h1>TimeZone</h1>
                        <span style={{ color: "white", fontSize: 23, marginTop: 0 }}>
                          {cIPdet.time_zone.name } , { cIPdet.time_zone.abbr}
                        </span>
                      </div>
                      <div>
                        <h1>Telephone Code</h1>
                        <span
                          style={{ color: "white", fontSize: 23, marginTop: 0 ,background:"#ff80ff",paddingRight:50,borderRadius:25,border:"3px solid black" }}
                        >
                          <img style={{marginRight:50,marginLeft:50}} src={cIPdet.flag}/>
                          +{cIPdet.calling_code}
                        </span>
                      </div>

                    </div>
                    <div className="defmap">
                      <Map
                        initialViewState={{
                          longitude: cIPdet.longitude || 0,
                          latitude: cIPdet.latitude || 0,
                          zoom: 11,
                        }}
                        style={{ height: 400 }}
                        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=SjSnUEMaVUEmC0E8TN03	"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <span>Enter an IP Address to get Started</span>
              )}
            </div>
          </div>
          <br />
        </div>
      </div>
      <div>
        {ipdet ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="mainbox"
              style={{
                display: "flex",
                backgroundColor: "green",
                padding: 20,
                paddingBottom: 25,
                justifyContent: "space-evenly",
                width: "80vw",
                borderRadius: 10,
                boxShadow: "5px 5px 8px black",
                alignItems: "center",
                marginBottom: 60,
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 15 }}
              >
                <div>
                  <h1>Your IP address</h1>
                  <span style={{ color: "white", fontSize: 23, marginTop: 0 }}>
                    {ipdet.ip}
                  </span>
                </div>
                <div>
                  <h1>
                    Your Approx Coordinates
                  </h1>
                  <span style={{ color: "white", fontSize: 23, marginTop: 0 }}>
                    {ipdet.longitude}, {ipdet.latitude}
                  </span>
                </div>
                <div>
                  <h1>Region</h1>
                  <span style={{ color: "white", fontSize: 23, marginTop: 0 }}>
                    {ipdet.region} , {ipdet.country_name} ,{" "}
                    {ipdet.continent_name}
                  </span>
                </div>
                <div>
                  <h1>TimeZone</h1>
                  <span style={{ color: "white", fontSize: 23, marginTop: 0 }}>
                    {ipdet.time_zone.name } , { ipdet.time_zone.abbr}
                  </span>
                </div>
                <div>
                    <h1>Telephone Code</h1>
                    <span style={{ color: "white", fontSize: 23, marginTop: 0 ,background:"#ff80ff",paddingRight:50,borderRadius:25,border:"3px solid black"}}>
                      <img style={{marginRight:50,marginLeft:50}} src={ipdet.flag}/>
                      +{ipdet.calling_code}
                    </span>
                </div>
              </div>
              <div className="defmap">
                <Map
                  initialViewState={{
                    longitude: ipdet.longitude || 0,
                    latitude: ipdet.latitude || 0,
                    zoom: 11,
                  }}
                  style={{ height: 400 }}
                  mapStyle="https://api.maptiler.com/maps/streets/style.json?key=SjSnUEMaVUEmC0E8TN03	"
                />
              </div>
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
