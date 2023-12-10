/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function ModalTest() {
  const [show, setShow] = useState(false);
  const [hintCounter, setHintCounter] = useState(0);

  const handleHintClick = () => {
    setHintCounter((hintCounter) => hintCounter + 1);
    setShow(true); // Show the modal when the hint button is clicked
  };

  const handleClose = () => setShow(false);

  const videoId = 'iLVdomgYucQ';

  return (
    <>
      <button className="hintButton" onClick={handleHintClick}>
        Hint ?
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
        {/* Set size to "lg" (large) to make sure the modal can contain the iframe */}
        <Modal.Header closeButton>
          <Modal.Title>Tutorial</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '20px' }}>
          <p>Hint Counter: {hintCounter}</p>
          {/* Embed the YouTube video inside the modal */}
          <iframe
            style={{ width: '100%', height: '400px' }}
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Modal.Body>
        {/* You can add additional elements or styling here */}
        <Modal.Footer />
      </Modal>
    </>
  );
}

export default ModalTest;
