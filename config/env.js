import { Constants } from "expo";

const ENV = {
  dev: {
    apiUrl: "http://localhost:1337/api"
  },
  staging: {
    apiUrl: "https://staging.orchard.ai/api"
  },
  prod: {
    apiUrl: "https://orchard.ai/api"
  }
}

function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return ENV.dev
  if (env.indexOf('dev') !== -1) return ENV.dev
  if (env.indexOf('staging') !== -1) return ENV.staging
  if (env.indexOf('prod') !== -1) return ENV.prod
}


export default getEnvVars(Constants.manifest.releaseChannel)