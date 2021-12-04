import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import PlayerCard from "../player-card/PlayerCard";

const PlayersList = () => {
  const players = [
    {
      name: "yoan",
      location: "florentin",
      distance: "1km",
      image:
        "https://assets.entrepreneur.com/content/3x2/2000/20190502194704-ent19-june-editorsnote.jpeg",
    },
    {
      name: "netanel",
      location: "florentin2",
      distance: "3km",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    },
    {
      name: "yoan",
      location: "ramat aviv",
      distance: "4km",
      image:
        "https://hr.m-s-d.co.il/wp-content/uploads/2014/08/man-in-suit2.jpg",
    },
    {
      name: "anat",
      location: "florentin",
      distance: "8km",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      name: "moshe",
      location: "shenkin",
      distance: "10km",
      image:
        "data:image/jpeg;base64,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",
    },
  ];
  const [profile, setProfile] = useState({
    show: false,
  });
  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      {players.map((player) => (
        <PlayerCard
          name={player.name}
          location={player.location}
          distance={player.distance}
          style={{ marginTop: 10 }}
          image={player.image}
          onClick={() =>
            setProfile({
              show: true,
              name: player.name,
              location: player.location,
              distance: player.distance,
              image: player.image,
            })
          }
        />
      ))}
      <Modal show={profile.show} onHide={() => setProfile({...profile, show: false })}>
        <Modal.Header closeButton>
          <Modal.Title>{profile.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <img src={profile.image} width="250px"/>
        <p>Location: {profile.location}</p>
        <p>Distance: {profile.distance}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PlayersList;