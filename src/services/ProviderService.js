import http from "../http-common";

const getAll = () => {
  return http.get("/provider");
};

const get = (id) => {
  return http.get(`/provider/${id}`);
};

const getForRuc = (ruc) => {
  return http.get(`/provider/ruc/${ruc}`);
};

const create = (data) => {
  return http.post("/provider", data);
};

const update = (id, data) => {
  return http.patch(`/provider/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/provider/${id}`);
};

const removeAll = () => {
  return http.delete(`/provider`);
};

// const findByRuc = (ruc) => {
//   let providers = getAll().then((data) => {
//     providers = data.data.filter((d) => {
//       return d.ruc == ruc;
//     });
//   });
//   return providers;
// };

const ProviderService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getForRuc,
  // findByRuc,
};

export default ProviderService;
