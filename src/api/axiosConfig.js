import axios from "axios";

export default axios.create({
    baseURL: 'https://member-server.stsa.tw',
    headers: {"skip-browser-warning": "true"}

});
