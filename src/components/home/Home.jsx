import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Posts from "../Posts/Posts";

export default function Home(p) {
  return (
    <div style={{ width: "100%" }}>
      <img src="./image/logo u band - new.png" width="200px" />
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '50%' }}>
          <Link className="btn btn-dark" to="/posts">
            New Posts
          </Link>
          <div style={{ height: '65vh', overflowY: 'auto', marginTop: 10 }}>
            <Posts showButtons={false} />
          </div>
        </div>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Link className="btn btn-dark" to="/about">
            About Us
          </Link>
          <div style={{width: '60%', marginTop: 10, borderRadius: 10, padding: 10, color: "white", backgroundColor: '#303030d1'}}>
            <div>
              Welcome to Uband!
            </div>
            <div>
              The site was opened after much thought, to understand the needs of the people. We realized that there was no website that brings all the musicians together. This way you can search, play or create a band like you always dreamed of!
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
