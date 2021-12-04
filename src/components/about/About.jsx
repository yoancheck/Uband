import React from "react";
import { Container } from "react-bootstrap";
export default function About(p) {
  return (
    <Container style={{justifyContent:"center", display:"flex"}}>
      <div
        style={{
          width: "60%",
          marginTop: 10,
          borderRadius: 10,
          padding: 10,
          color: "white",
          backgroundColor: "#303030d1",
        }}
      >
        <h1>About</h1>
        <h5>
          Welcome to Uband! The site was opened after much thought, to
          understand the needs of the people. We realized that there was no
          website that brings all the musicians together. This way you can
          search, play or create a band like you always dreamed of! The site has
          an innovative and smart search engine, in order to give you the most
          accurate and fast information. In addition, you can contact the
          players on the site by clicking on the WhatsApp icon. The site is
          updated from time to time, in order to give you the latest
          information!
        </h5>
      </div>
    </Container>
  );
}
