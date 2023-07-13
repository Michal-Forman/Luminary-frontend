const BackendUrl = process.env.NODE_ENV === "production" ? "https://luminary-backend.onrender.com" : "http://localhost:6060";

const frontendBaseName = process.env.NODE_ENV === "production" ? "/Luminary-frontend" : "";

export default BackendUrl;

export { frontendBaseName };