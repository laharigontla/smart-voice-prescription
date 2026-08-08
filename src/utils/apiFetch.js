// Wraps fetch() and automatically attaches the logged-in doctor's auth token.
// Use this instead of the raw fetch() for any call to our own /api/* backend.

const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("authToken");

  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  // Token missing/expired/invalid — send the doctor back to login.
  if (response.status === 401) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("doctorName");
    window.location.href = "/login";
  }

  return response;
}

export default apiFetch;
