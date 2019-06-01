import { API_URL } from "react-native-dotenv";
// import jwtDecode from "jwt-decode";
import Strapi from "strapi-sdk-javascript/build/main";
import env from "../config/env";

const apiUrl = API_URL;
const strapi = new Strapi(apiUrl);

console.log("env: ", env)

export const strapiRegister = (username, email, password) => {
  console.log(username, email, password);

  strapi.register(username, email, password).then(res => {
    setToken(res);
  });

  return Promise.resolve();
};

// use strapi to get a JWT and token object, save
// to approriate cookie for future requests
export const strapiLogin = async (email, password) => {
  if (!process.browser) {
    return;
  }
  // Get a token
  strapi.login(email, password).then(res => {
    setToken(res);
  });
  
  return Promise.resolve();
};

// export const updateStrapiUser = async ({ id, stripeCustomerId, username, email }) => {
//   console.log(stripeCustomerId)
//   const updatedUser = await strapi.updateEntry("users", id, { _id: id, stripeCustomerId, username, email });

//   console.log(updatedUser);

//   return Promise.resolve();
// }

export const setToken = token => {
  // Cookies.set("id", token.user._id);
  // Cookies.set("username", token.user.username);
  // Cookies.set("email", token.user.email);
  // Cookies.set("role", token.user.role.type);
  // Cookies.set("jwt", token.jwt);
  // Cookies.set("stripeCustomerId", token.user.stripeCustomerId);

  console.log(token);

  // if (Cookies.get("username")) {
  //   Router.push("/");
  // }
};

// export const unsetToken = () => {
//   if (!process.browser) {
//     return;
//   }
  
//   Cookies.remove("id");
//   Cookies.remove("username");
//   Cookies.remove("email");
//   Cookies.remove("role");
//   Cookies.remove("jwt");
//   Cookies.remove("stripeCustomerId");

//   // to support logging out from all windows
//   window.localStorage.setItem("logout", Date.now());
//   Router.push("/");
// };

// export const getUserFromServerCookie = req => {
//   if (!req.headers.cookie || "") {
//     return undefined;
//   }

//   let user = {};

//   let id = req.headers.cookie
//     .split(";")
//     .find(user => user.trim().startsWith("id="));

//   if (id) {
//     user.id = id.split("=")[1];
//   }

//   let username = req.headers.cookie
//     .split(";")
//     .find(user => user.trim().startsWith("username="));
  
//   if (username) {
//     user.username = username.split("=")[1];
//   }

//   let email = req.headers.cookie
//     .split(";")
//     .find(user => user.trim().startsWith("email="));

//   if (email) {
//     user.email = email.split("=")[1];
//   }

//   let role = req.headers.cookie
//     .split(";")
//     .find(user => user.trim().startsWith("role="));

//   if (role) {
//     user.role = role.split("=")[1];
//   }

//   let stripeCustomerId = req.headers.cookie
//     .split(";")
//     .find(user => user.trim().startsWith("stripeCustomerId="));

//   if (stripeCustomerId) {
//     user.stripeCustomerId = stripeCustomerId.split("=")[1];
//   }

//   const jwtCookie = req.headers.cookie
//     .split(";")
//     .find(c => c.trim().startsWith("jwt="));
  
//   if (!jwtCookie) {
//     return null;
//   }
  
//   const jwt = jwtCookie.split("=")[1];

//   user.jwt = jwt;
  
//   return jwtDecode(jwt), user;
// };

// export const getUserFromLocalCookie = () => {
//   let user = null;
  
//   if (Cookies.get("jwt")) {
//     user = {
//       id: Cookies.get("id"),
//       username: Cookies.get("username"),
//       email: Cookies.get("email"),
//       role: Cookies.get("role"),
//       jwt: Cookies.get("jwt"),
//       stripeCustomerId: Cookies.get("stripeCustomerId")
//     }
//   }

//   return user;
// };

// export const updateUser = async (user) => {
//   const updatedUser = await strapi.updateEntry("users", user.id, user);
//   return updatedUser;
// }

// //these will be used if you expand to a provider such as Auth0
// const getQueryParams = () => {
//   const params = {};
//   window.location.href.replace(
//     /([^(?|#)=&]+)(=([^&]*))?/g,
//     ($0, $1, $2, $3) => {
//       params[$1] = $3;
//     }
//   );
//   return params;
// };
// export const extractInfoFromHash = () => {
//   if (!process.browser) {
//     return undefined;
//   }
//   const { id_token, state } = getQueryParams();
//   return { token: id_token, secret: state };
// };