import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
export default function Contact(p) {
  const [text, setText] = useState("");

  const send = () => {
    const message = `Hi, I'm ${document.getElementById('name').value}, I want to contact you about ${document.getElementById('subject').value}.
        this is my phone: ${document.getElementById('phone').value}. ${text}`;

    window.open(`https://api.whatsapp.com/send?phone=+972542250725&text=${message}`, "_blank")
  }

  return (
    <Container style={{ width: "30%" }}>
      <img src="./image/logo u band - new.png" width="200px" />
      <h1>Contact us</h1>
      <br />
      <Form.Label>Name</Form.Label>
      <Form.Control id="name" />
      <Form.Label>Subject</Form.Label>
      <Form.Control id="subject" />
      <Form.Label>Phone</Form.Label>
      <Form.Control id="phone" />
      <Form.Label>Text</Form.Label>
      <textarea className="form-control" onChange={e => setText(e.target.value)} />
      <br />
      <Button variant="primary" onClick={send}>Send</Button>

    </Container>
  );
}
