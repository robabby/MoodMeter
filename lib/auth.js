import { API_URL } from "react-native-dotenv";
import { AsyncStorage } from "react-native";
import axios from "axios";

export const register = async (username, email, password) => {
  const res = await axios.post(`${API_URL}/auth/local/register`, {
      username,
      email,
      password
    })
    .then(async ({ data }) => {
      console.log('User profile: ', data.user);
      console.log('User token: ', data.jwt);

      setToken(data);

      return data;
    })
    .catch(error => {
      // Handle error.
      console.log('An error occurred:', error);
    });

  return res;
};

// use strapi to get a JWT and token object, save
// to approriate cookie for future requests
export const login = async (email, password) => {
  const data = await axios.post(`${API_URL}/auth/local`, {
      identifier: email,
      password
    })
    .then(async ({ data }) => {
      console.log('User profile: ', data.user);
      console.log('User token: ', data.jwt);

      setToken(data);

      return data;
    })
    .catch(error => {
      // Handle error.
      console.error('An error occurred:', error);
    });
  
    return Promise.resolve(data);
};

// export const updateStrapiUser = async ({ id, stripeCustomerId, username, email }) => {
//   console.log(stripeCustomerId)
//   const updatedUser = await strapi.updateEntry("users", id, { _id: id, stripeCustomerId, username, email });

//   console.log(updatedUser);

//   return Promise.resolve();
// }

export const setToken = async (data) => {
  await AsyncStorage.setItem("token", data.jwt);
  await AsyncStorage.setItem("username", data.user.username);
};

export const unsetToken = async () => {
  await AsyncStorage.removeItem("token");
};

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