import API from "./axios";
import { RegisterPayload } from "@/types/user.types";

export const createUser = async (data: RegisterPayload) => {
  try {
    console.log("Creating user sending data", data);
    const response = await API.post("/users", data);
    return response;
  } catch (error) {
    console.log("Error sending user creation requiest...", error);
  }
};

export const getUsers = async () => {
  const response = await API.get("/users");
  return response;
};
