import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { getToken } from "./utils/auth";

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: "pusher",
    key: "850326f2fcc9e62959b7",
    cluster: "mt1",
    forceTLS: false,
    authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer ${getToken()}`, 
        },
    },

});

export default echo;