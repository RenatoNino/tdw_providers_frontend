import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import ProviderService from "../../services/ProviderService";

// eslint-disable-next-line react/prop-types
const ProviderCreateModal = ({
  show,
  currentProvider,
  handleClose,
  handleCreated,
}) => {
  const [provider, setProvider] = useState({
    ruc: "",
    business_name: "",
    representative: "",
    sector: "",
    address: "",
    email: "",
    image: null,
  });
  const [error, setError] = useState("");
  let file = null;
  // const [file, setFile] = useState(null);

  const sections = [
    "Alimentación",
    "Comercio",
    "Salud",
    "Centros de Entrenamiento",
  ];

  useEffect(() => {
    if (currentProvider.id) {
      setProvider(currentProvider); // Si existe un id, actualizar los campos con los valores del proveedor actual
    } else {
      clearForm(); // Si no hay id, limpiar los campos
    }
  }, [currentProvider]);

  const clearForm = () => {
    setProvider({
      ruc: "",
      business_name: "",
      representative: "",
      sector: "",
      address: "",
      email: "",
      image: null,
    });
  };

  const handleChange = (e) => {
    // window.alert(e);
    const { name, value } = e.target;
    setProvider((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const filess = e.target.files[0];
    file = filess;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    console.log("PROVIDER");
    console.log(provider);

    const formData = new FormData();
    formData.append("ruc", provider.ruc);
    formData.append("business_name", provider.business_name);
    formData.append("representative", provider.representative);
    formData.append("sector", provider.sector);
    formData.append("address", provider.address);
    formData.append("email", provider.email);
    if (file) {
      formData.append("image", file, file.name);
    }

    console.log(formData.get("image"));
    // console.log(formData);

    if (!provider.id) {
      ProviderService.create(formData, {
        "Content-Type": "multipart/form-data",
      })
        .then((response) => {
          handleCreated();
          clearForm();
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            setError(errorMessage);
          } else {
            setError("Error de conexión con el servidor");
          }
        });
    } else {
      ProviderService.update(provider.id, formData, {
        "Content-Type": "multipart/form-data",
      })
        .then((response) => {
          handleCreated();
          clearForm();
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            setError(errorMessage);
          } else {
            setError("Error de conexión con el servidor");
          }
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {provider.id
            ? "Actualización de un Proveedor"
            : "Creación de un Proveedor"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>} {""}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>RUC</Form.Label>
            <Form.Control
              type="text"
              name="ruc"
              placeholder="Ingrese su RUC..."
              value={provider.ruc}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Razón Social</Form.Label>
            <Form.Control
              type="text"
              name="business_name"
              placeholder="Ingrese su Razón Social..."
              value={provider.business_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Representante</Form.Label>
            <Form.Control
              name="representative"
              type="text"
              placeholder="Ingrese el nombre de su representante..."
              value={provider.representative}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rubro</Form.Label>
            <Form.Select
              name="sector"
              value={provider.sector}
              onChange={handleChange}
            >
              <option>Seleccione una opción...</option>
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
              name="address"
              type="text"
              placeholder="Ingrese su dirección..."
              value={provider.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={provider.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              // value={file}
              onChange={handleImageChange}
            />
            {/* <div className="input-group">
              <input
                type="text"
                className="form-control"
                name="image"
                placeholder="Ingrese el nombre de la imagen..."
                onChange={handleChange}
                onBlur={handleChange}
              />
              <button className="outline-secondary">
                Seleccionar
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: 0,
                    width: 0,
                    height: 0,
                  }}
                />
              </button>
            </div> */}
          </Form.Group>
          <Button variant="primary" type="submit">
            {provider.id ? "Actualizar" : "Crear"}
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
