import React from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import proiverImageDefault from "../../assets/images/provider_default.jpg";

// eslint-disable-next-line react/prop-types
const ProviderDetailModal = ({ show, provider, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Información detallada del proveedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="text-center">
            <img
              src={"http://localhost:3000" + provider.image}
              alt="Imagen Proveedor"
              width="50%"
            ></img>
          </Col>
        </Row>
        <Row>
          <Col className="fw-bold">RUC:</Col>
          <Col>{provider.ruc}</Col>
        </Row>
        <Row>
          <Col className="fw-bold">Razón Social:</Col>
          <Col>{provider.business_name}</Col>
        </Row>
        <Row>
          <Col className="fw-bold">Representante:</Col>
          <Col>{provider.representative}</Col>
        </Row>
        <Row>
          <Col className="fw-bold">Rubro:</Col>
          <Col>{provider.sector}</Col>
        </Row>
        <Row>
          <Col className="fw-bold">Dirección:</Col>
          <Col>{provider.address}</Col>
        </Row>
        <Row>
          <Col className="fw-bold">Correo:</Col>
          <Col>{provider.email}</Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProviderDetailModal;
