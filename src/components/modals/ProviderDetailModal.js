import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const ProviderDetailModal = ({ show, provider, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Información detallada del proveedor</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProviderDetailModal;
