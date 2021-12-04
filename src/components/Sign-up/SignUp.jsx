import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { Redirect } from "react-router";
import { useContext } from "react";
import { Context } from "../../store/Store";
export const databaseProfile = (name, uid, photoURL) =>
  set(ref(getDatabase(), "users/" + uid), {
    nickname: name,
    photoURL,
  });
export default function SignUp(p) {
  const instruments = [];
  const [image, setImage] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [, dispatch] = useContext(Context);
  const EMAIL = "email";
  const PASSWORD = "password";
  const NAME = "name";
  const auth = getAuth();
  const signup = () => {
    const name = document.getElementById(NAME).value;
    if (name.length > 0)
      createUserWithEmailAndPassword(
        auth,
        document.getElementById(EMAIL).value,
        document.getElementById(PASSWORD).value
      ).then((user) => {
        updateProfile(user.user, {
          displayName: name,
        });
        databaseProfile(name, user.user.uid, user.user.photoURL);
      });
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSignedIn(true);
    }
  });
  if (isSignedIn) return <Redirect to={"/home"} />;
  return (
    <Container style={{ width: "30%" }}>
      <img src="./image/logo u band - new.png" width="200px" />
      <h1>Sign up</h1>
      <br />
      <Form.Label>Name</Form.Label>
      <Form.Control id={NAME} />
      {/*<Form.Label>Instrument</Form.Label>
      <Form.Select
        multiple
        onMouseDown={(e) => {
          e.preventDefault();
          const target = e.target;
          target.selected
            ? (target.selected = false)
            : (target.selected = true);
        }}
        /*onChange={(e) => {
          e.target.options.forEach((o) =>
            o.selected
              ? instruments.push(o.text)
              : (instruments = instruments.filter((i) => i != o.text))
          );
        }}
      >
        <option>Guitar</option>
        <option>Piano</option>
        <option>Trumpet</option>
        <option>Drums</option>
        <option>Clarinet</option>
        <option>Bass Guitar</option>
        <option>Electric Guitar</option>
      </Form.Select>
      <Form.Label>Genre</Form.Label>
      <Form.Select>
        <option>Jazz</option>
        <option>Rock</option>
        <option>Metal</option>
        <option>Pop</option>
        <option>Funk</option>
        <option>Blues</option>
        <option>Eastern</option>
      </Form.Select>
      <Form.Label>Experience</Form.Label>
      <Form.Control type="number" min="0" />
      <Form.Label>City</Form.Label>
      <Form.Control />
      <Form.Label>Photo</Form.Label>
      <br />
      <img src={image} width="250px" />
      <br />
      <input
        type="file"
        onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
      />
      <br />
      <Form.Label>Phone</Form.Label>
      <Form.Control />*/}
      <Form.Label>Email</Form.Label>
      <Form.Control id={EMAIL} />
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" id={PASSWORD} />
      <br />
      <Button variant="primary" onClick={signup}>
        Login
      </Button>
    </Container>
  );
}
