const apiAdapter = require("../../routes/apiAdapter");

const { URL_SERVICE_USER } = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const users = await api.post("/users/register", req.body);

    return res.json(users.data);
  } catch (error) {
    // console.log(error);
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    }
    //console.log(error.response);
    const { status, data } = error.response;

    return res.status(status).json(data);
  }
};
