import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import ProviderService from "../../services/ProviderService";

// eslint-disable-next-line react/prop-types
const ProviderDeleteModal = ({
  show,
  provider,
  handleClose,
  handleDeleted,
}) => {
  const removeProvider = () => {
    ProviderService.remove(provider.id)
      .then((response) => {
        console.log(response.data);
        handleDeleted();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-warning">
          Eliminación de un proveedor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Esta acción es irreversible, ¿Está seguro de realizar la eliminación
          del proveedor con RUC: {provider.ruc}?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="warning" onClick={removeProvider}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProviderDeleteModal;
