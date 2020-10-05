export default {
  get: () => {
    return localStorage.getItem("userData");
  },

  save: (userDataObject) => {
    localStorage.setItem("userData", JSON.stringify(userDataObject));
  },
};
