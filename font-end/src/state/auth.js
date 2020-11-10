import { API } from "../config";

export const signUp = (user) => {
  return fetch(`${API}signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const signIn = (user) => {
  return fetch(`${API}signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// Method to save Jwt in local storage

export const authenticate = (data, cb) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    cb();
  }
};

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
  return fetch(`${API}signout`, {
    method: "GET",
  })
    .then((data) => {
      console.log(" sign out ", data);
    })
    .catch((err) => console.log(err));
};

export const isAuth = () => {
  if (typeof window == undefined) return false;

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else return false;
};
