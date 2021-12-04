import { useState, useContext } from "react";
import { getAuth } from "@firebase/auth";
import { Context } from "../../store/Store";
import { Button, Form, Modal } from "react-bootstrap";

export function UploadPost({ uploadPost }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstruments, setSelectedIntruments] = useState([]);
  const [genre, setGenre] = useState("");
  const [state] = useContext(Context);

  const upload = () => {
    const post = {
      title: document.getElementById("title").value,
      text: document.getElementById("text").value,
      userId: getAuth().currentUser.uid,
      date: Date.now(),
      instruments: selectedInstruments,
      genre: genre,
      experience: document.getElementById("experience").value,
      city: document.getElementById("city").value,
      phone: document.getElementById("phone").value,
      likes: [],
      comments: [],
    };
    setIsModalOpen(false);
    uploadPost(post);
  };

  return (
    <div>
      {state.auth ? (
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedIntruments([]);
          }}
          style={{ margin: 10 }}
        >
          Upload a Post
        </Button>
      ) : (
        ""
      )}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header>
          <Modal.Title>Upload A Post</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form.Label>Title</Form.Label>
          <Form.Control id={"title"} />
          <Form.Label>Text</Form.Label>
          <Form.Control id={"text"} />
          <Form.Label>Instrument</Form.Label>
          <Form.Select
            multiple
            onMouseDown={(e) => {
              e.preventDefault();
              const target = e.target;
              if (target.selected) {
                const newInstruments = [...selectedInstruments];
                setSelectedIntruments(
                  newInstruments.filter((name) => name !== target.innerHTML)
                );
              } else {
                setSelectedIntruments((prev) => [...prev, target.innerHTML]);
              }

              target.selected
                ? (target.selected = false)
                : (target.selected = true);
            }}
          >
            <option>Guitar</option>
            <option>Piano</option>
            <option>Trumpet</option>
            <option>Drums</option>
            <option>Clarinet</option>
            <option>Bass Guitar</option>
            <option>Electric Guitar</option>
            <option>Other</option>
          </Form.Select>
          <Form.Label>Genre</Form.Label>
          <Form.Select onChange={(e) => setGenre(e.target.value)}>
            <option>Jazz</option>
            <option>Rock</option>
            <option>Metal</option>
            <option>Pop</option>
            <option>Funk</option>
            <option>Blues</option>
            <option>Eastern</option>
            <option>Other</option>
          </Form.Select>
          <Form.Label>Experience</Form.Label>
          <Form.Control type="number" min="0" id="experience" />
          <Form.Label>City</Form.Label>
          <Form.Control id="city" />
          <Form.Label>Phone</Form.Label>
          <Form.Control id="phone" />
          <br />
          <Button variant="primary" onClick={upload}>
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
