import { useState, useEffect } from "react";
import * as React from "react";
import "./App.css";
import Map from "react-map-gl/maplibre";

const ipdata_apikey = import.meta.env.VITE_IPDATA_API_KEY;
const maptiler_apikey = import.meta.env.VITE_MAPTILER_API_KEY;

function App() {
  const [ipdet, setIpdet] = useState(null); 
  const [customIp, setCustomIp] = useState(""); 
  const [cIPdet, setcIPdet] = useState(null);
  const [cdata, setcdata] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.ipdata.co/?api-key=${ipdata_apikey}`
    )
      .then((r) => r.json())
      .then((data) => {
        setIpdet(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, []);

  function initsearch() {
    if (!customIp) {alert("Please enter a valid IP address");return;}
    setIsLoading(true);
    fetch(`https://api.ipdata.co/${customIp}?api-key=${ipdata_apikey}`)
      .then((r) => r.json())
      .then((data) => {
        setcIPdet(data);
        setcdata(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
        alert("Error fetching IP data. Please try again.");
      });
  }

  function SocialButton({link,name,icon}){
    return <a href={link} target="_blank" rel="noopener noreferrer" className="social-button">{icon}{name}</a>
  }

  function InfoCard({title,content }){
    return (
      <div className="info-card">
        <h1>{title}</h1>
        <span>{content}</span>
      </div>
    );
  }

  function IPInfoDisplay({data,title}){
    if (!data) return null;
    return (
      <div className="mainbox">
        <div className="info-grid">
          <InfoCard 
            title="IP Address" 
            content={data.ip} 
          />
          <InfoCard 
            title="Coordinates" 
            content={`${data.longitude}, ${data.latitude}`} 
          />
          <InfoCard 
            title="Region" 
            content={`${data.region}, ${data.country_name}, ${data.continent_name}`} 
          />
          <InfoCard 
            title="TimeZone" 
            content={`${data.time_zone.name}, ${data.time_zone.abbr}`} 
          />
          <InfoCard 
            title="Calling Code" 
            content={
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img 
                  src={data.flag} 
                  alt={`${data.country_name} flag`}
                  style={{ width: '24px', height: '16px' }}
                />
                +{data.calling_code}
              </div>
            } 
          />
        </div>
        <div className="defmap">
          <Map
            initialViewState={{
              longitude: data.longitude || 0,
              latitude: data.latitude || 0,
              zoom: 11,
            }}
            style={{ height: "100%" }}
            
            mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${maptiler_apikey}`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="header">
        <h1>IPScout</h1>
        <div className="buttons">
          <SocialButton 
            link="https://github.com/lkshayb" 
            name="GitHub"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            }
          />
          <SocialButton 
            link="https://www.linkedin.com/in/lakshay-bhatia-22340a246" 
            name="LinkedIn"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.016-2.005-1.22-2.005-1.22 0-1.405.953-1.405 1.94v5.669h-3v-11h2.84v1.58h.04c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.866z"/>
              </svg>
            }
          />
        </div>
      </div>

      <div className="cipbar">
        <input
          type="text"
          placeholder="Enter IP address to locate..."
          value={customIp}
          onChange={(e) => setCustomIp(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && initsearch()}
        />
        <button onClick={initsearch}>Search</button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className="loading-spinner">Loading...</div>
        </div>
      ) : (
        <>
          {cIPdet && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Search Results</h2>
              <IPInfoDisplay data={cIPdet} />
            </div>
          )}
          
          {ipdet && (
            <div>
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Your IP Information</h2>
              <IPInfoDisplay data={ipdet} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
