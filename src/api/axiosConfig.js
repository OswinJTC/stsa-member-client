import axios from "axios";

export default axios.create({
    baseURL: 'https://stsa-member-server.onrender.com',
    headers: {"skip-browser-warning": "true"}
});
