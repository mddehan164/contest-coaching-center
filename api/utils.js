import api from "./axiosInstance";

// Laravel backend থেকে encrypted code আনতে
export const getEncryptedId = async (id) => {
  const { data } = await api.post("/utils/encrypt-id", { id });
  return data.encrypted_id;
};

// Laravel backend-এ decrypt করতে চাইলে
export const decryptId = async (encrypted) => {
  const { data } = await api.post("/utils/decrypt-id", { code: encrypted });
  return data.original_id;
};
