import { useState, useContext } from "react";
import { getAuth } from "@firebase/auth";
import { Context } from "../../store/Store";
import { Button, Form, Modal } from "react-bootstrap";

export default function UploadPost({ uploadPost }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state] = useContext(Context);

  const upload = () => {
    const post = {
      userId: getAuth().currentUser.uid,
      date: Date.now(),
      instrument: document.getElementById("instrument").value,
      city: document.getElementById("city").value,
      phone: document.getElementById("phone").value,
      price:document.getElementById("price").value,
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
          <Form.Label>Instrument</Form.Label>
          <Form.Control id="instrument" />
          <Form.Label>City</Form.Label>
          <Form.Control id="city" />
          <Form.Label>Phone</Form.Label>
          <Form.Control type="phone" id="phone" />
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" id="price" />
          <br />
          <Button variant="primary" onClick={upload}>
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
