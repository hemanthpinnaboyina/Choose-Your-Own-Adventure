const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
export const API_BASE_URL = isLocal 
  ? "http://localhost:8000/api" 
  : "https://choose-your-own-adventure-z0hr.onrender.com/api";