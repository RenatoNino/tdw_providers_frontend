import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import ProviderCreateModal from "./modals/ProviderCreateModal";
import ProviderDetailModal from "./modals/ProviderDetailModal";
import ProviderDeleteModal from "./modals/ProviderDeleteModal";
import ProviderService from "../services/ProviderService";

const ProviderList = () => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const handleCloseModalCreate = () => setShowModalCreate(false);
  const handleShowModalCreate = () => setShowModalCreate(true);

  const [showModalView, setShowModalView] = useState(false);
  const handleCloseModalView = () => setShowModalView(false);
  const handleShowModalView = () => setShowModalView(true);

  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleCloseModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = () => setShowModalDelete(true);

  const [currentProvider, setCurrentProvider] = useState({});
  const [searchRuc, setSearchRuc] = useState("");
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    getProviders();
  }, []);

  const onChangeSearchRuc = (e) => {
    const searchRuc = e.target.value;
    setSearchRuc(searchRuc);
  };

  const getProviders = () => {
    ProviderService.getAll()
      .then((response) => {
        setProviders(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openViewProvider = (provider) => {
    setCurrentProvider(provider);
    handleShowModalView();
  };

  const openCreateProvider = (provider) => {
    setCurrentProvider(provider);
    handleShowModalCreate();
  };

  const openDeleteProvider = (provider) => {
    setCurrentProvider(provider);
    handleShowModalDelete();
  };

  const refreshList = () => {
    getProviders();
    setCurrentProvider(new FormData());

    handleCloseModalCreate();
    handleCloseModalDelete();
    handleCloseModalView();
  };

  const findByRuc = () => {
    getProviders();
    const providersFilter = providers.filter((p) => p.ruc.includes(searchRuc));
    setProviders(providersFilter);
  };

  return (
    <div>
      {/* <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por RUC..."
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          value={searchRuc}
          onChange={onChangeSearchRuc}
        ></input>
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={findByRuc}
        >
          Buscar
        </button>
      </div> */}
      <div className="d-flex flex-row-reverse mb-2">
        <Button
          variant="primary"
          onClick={() => {
            openCreateProvider(new FormData());
          }}
        >
          Agregar Proveedor
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>RUC</th>
            <th>Representante</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {providers.length > 0 &&
            providers.map((provider) => (
              <tr key={provider.id}>
                <td>{provider.ruc}</td>
                <td>{provider.representative}</td>
                <td>{provider.email}</td>
                <td>
                  <Button
                    className="me-1"
                    variant="info"
                    size="sm"
                    onClick={() => openViewProvider(provider)}
                  >
                    Ver
                  </Button>
                  <Button
                    className="me-1"
                    variant="warning"
                    size="sm"
                    onClick={() => openCreateProvider(provider)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => openDeleteProvider(provider)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <ProviderCreateModal
        show={showModalCreate}
        currentProvider={currentProvider}
        handleClose={handleCloseModalCreate}
        handleCreated={refreshList}
      ></ProviderCreateModal>

      <ProviderDetailModal
        show={showModalView}
        provider={currentProvider}
        handleClose={handleCloseModalView}
      ></ProviderDetailModal>

      <ProviderDeleteModal
        show={showModalDelete}
        provider={currentProvider}
        handleClose={handleCloseModalDelete}
        handleDeleted={refreshList}
      ></ProviderDeleteModal>
    </div>
  );
};

export default ProviderList;
