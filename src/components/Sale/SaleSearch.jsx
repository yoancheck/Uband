import { useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";

export default function SaleSearch({ updateFilters }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [city, setCity] = useState(undefined);
  const [instrument, setInstrument] = useState(null);
  const [highPrice, setHighPrice] = useState();
  const [lowPrice, setLowPrice] = useState();

  const update = () => {
    setIsModalOpen(false);
    updateFilters({
      instrument: instrument,
      city: city,
      highPrice: highPrice,
      lowPrice: lowPrice,
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <Button onClick={() => setIsModalOpen(true)} style={{ margin: 10 }}>
        Search
      </Button>
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header>
          <Modal.Title>Search A Sale</Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form.Label>Instrument</Form.Label>
          <Form.Control onChange={(e) => setInstrument(e.target.value)} />
          <Form.Label>City:</Form.Label>
          <Form.Control onChange={(e) => setCity(e.target.value)} />
          <Form.Label>Price</Form.Label>
          <Row>
            <Col>
            <Form.Label>From</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setLowPrice(e.target.value)}
              />
            </Col>
            <Col>
            <Form.Label>To</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setHighPrice(e.target.value)}
              />
            </Col>
          </Row>
          <br />
          <Button onClick={update}>Search</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
