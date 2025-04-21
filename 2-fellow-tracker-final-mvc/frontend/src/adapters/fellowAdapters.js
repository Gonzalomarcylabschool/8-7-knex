import handleFetch from "./handleFetch"

export const getAllFellows = async () => {
  const [allFellows, error] = await handleFetch('/api/fellows/')
  return [allFellows, error];
}

export const getFellowById = async (id) => {
  const [fellow, error] = await handleFetch(`/api/fellows/${id}`);
  return [fellow, error];
}

export const createFellow = async (fellowName) => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ fellowName })
  }

  const [newFellow, error] = await handleFetch(`/api/fellows/`, options);
  return [newFellow, error];
}

export const deleteFellow = async (id) => {
  const options = {
    method: "DELETE",
  };
  const [success, error] = await handleFetch(`/api/fellows/${id}`, options);
  return [success, error];
}

export const updateFellowName = async (id, fellowName) => {
  const options = {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ fellowName })
  };

  const [updatedFellow, error] = await handleFetch(`/api/fellows/${id}`, options);
  return [updatedFellow, error];
}