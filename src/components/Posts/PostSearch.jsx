import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export function PostSearch({ updateFilters }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [city, setCity] = useState(undefined);
    const [selectedInstruments, setSelectedIntruments] = useState([]);
    const [genre, setGenre] = useState(null);
    const [experience, setExperience] = useState(null);


    const update = () => {
        setIsModalOpen(false);
        updateFilters({ city, experience, instruments: selectedInstruments, genre });
    }

    return <div style={{ width: '100%' }}>
        
        <Button onClick={() => setIsModalOpen(true)} style={{ margin: 10 }}>
            Search
        </Button>
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
            <Modal.Header>
                <Modal.Title>Search A Post</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
            }}>

                <Form.Label>City:</Form.Label>
                <Form.Control onChange={e => setCity(e.target.value)}>
                </Form.Control>
                <Form.Label>Experience:</Form.Label>
                <Form.Control type="number" min="0" onChange={e => setExperience(e.target.value)}>
                </Form.Control>
                <Form.Label>Instrument</Form.Label>
                <Form.Select
                    multiple
                    onMouseDown={(e) => {
                        e.preventDefault();
                        const target = e.target;
                        if (target.selected) {
                            const newInstruments = [...selectedInstruments];
                            setSelectedIntruments(newInstruments.filter(name => name !== target.innerHTML));
                        }
                        else {
                            setSelectedIntruments(prev => [...prev, target.innerHTML]);
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
                </Form.Select>
                <Form.Label>Genre</Form.Label>
                <Form.Select onChange={e => setGenre(e.target.value)}>
                    <option>Jaaz</option>
                    <option>Rock</option>
                    <option>Metal</option>
                    <option>Pop</option>
                    <option>Funk</option>
                    <option>Blues</option>
                    <option>Eastern</option>
                </Form.Select>
                <br/>
                <Button onClick={update}>Search</Button>
            </Modal.Body>
        </Modal>
    </div>
}