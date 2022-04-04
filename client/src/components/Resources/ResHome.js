import React from "react";
import "./styles.css";
import VideoEmbed from "./VideoEmbed";

export default function App() {
  return (
    <div className="App">
      <h1>Resources Section</h1>
      <h3>Start your journey in mastering Trending Skills!</h3>
      <h2>Data Structures and Algorithms</h2>
      <div className="card">
        <VideoEmbed embedId="rokGy0huYEA" />
      </div>
    </div>
  );
}
