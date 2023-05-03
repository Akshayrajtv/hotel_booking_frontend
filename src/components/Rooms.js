import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
function Rooms({ room, fromdate, todate }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="row box">
            <div className="col-md-4">
                <img src={room.imageurls[0]} className="smallimg" />
            </div>
            <div className="col-md-7">
                <b>
                    <h1>{room.name}</h1>
                    <p>Max Count: {room.maxcount}</p>
                    <p>Phone Number: {room.phonenumber}</p>
                    <p>Type: {room.type}</p>
                </b>

                <div style={{ float: "right" }}>
                    <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                        <button className="btn btn-primary m-2">
                            Book now
                        </button>
                    </Link>
                    <button className="btn btn-primary" onClick={handleShow}>
                        View Details
                    </button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {room.imageurls.map((url) => {
                            return (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100 bigimg"
                                        src={url}
                                    />
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                    <p>{room.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Rooms;
