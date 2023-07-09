import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import ProviderService from "../../services/ProviderService";

// eslint-disable-next-line react/prop-types
const ProviderCreateModal = ({
  show,
  provider,
  handleClose,
  handleCreated,
}) => {
  const sections = [
    "Alimentación",
    "Comercio",
    "Salud",
    "Centros de Entrenamiento",
  ];

  const createProvider = () => {
    if (provider.id == undefined) {
      ProviderService.create(provider)
        .then((response) => {
          handleCreated;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      ProviderService.update(provider.id, provider)
        .then((response) => {
          handleCreated;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Creación de un Proveedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createProvider}>
          <Form.Group className="mb-3">
            <Form.Label>RUC</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su RUC..."
              value={provider.ruc}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Razón Social</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su Razón Social..."
              value={provider.business_name}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Representante</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de su representante..."
              value={provider.representative}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rubro</Form.Label>
            <Form.Select value={provider.representative}>
              {sections.map((s) => {
                return (
                  <option key={s} value={s}>
                    {s}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su dirección..."
              value={provider.address}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={provider.email}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProviderCreateModal;
