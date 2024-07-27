import axios from "axios";
const axiosInstance = axios.create({
  // local instance of bire base function
  // baseURL: "http://127.0.0.1:5001/clone-6ab20/us-central1/api",
  // firebase deploy
  // baseURL: "https://api-u7xr5on6bq-uc.a.run.app"

// deloy on render.com
  baseURL: "https://amazo-api-deploy.onrender.com",
});

export { axiosInstance };
