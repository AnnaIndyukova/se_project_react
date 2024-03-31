const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export function getItemsList() {
  return fetch(`${baseUrl}/items`, {
    headers: headers,
  }).then(handleResponse);
}

export function addItem({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleResponse);
}

export function deleteItem(_id) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: headers,
  }).then(handleResponse);
}
