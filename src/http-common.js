import axios from "axios";

// Detecta si estás en localhost
const isLocal = window.location.hostname === "localhost";

// Define las URLs para local y remoto
const prestabancoBackendLocal = `http://${import.meta.env.VITE_PRESTABANCO_BACKEND_SERVER}:${import.meta.env.VITE_PRESTABANCO_BACKEND_PORT}`;
const prestabancoBackendRemote = "https://g9r69s1p-8090.brs.devtunnels.ms"; // Reemplaza con tu URL remota si cambia

// Elige la URL adecuada
const baseURL = isLocal ? prestabancoBackendLocal : prestabancoBackendRemote;

// Muestra en consola para verificar
console.log("Base URL:", baseURL);

export default axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});
