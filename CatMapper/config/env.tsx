import { Constants } from "expo";

const ENV = {
  FIREBASE_API: "AIzaSyBERtcsj7SR1oIcKfHxH6Uv6EoAypJUQf4",
  AUTHDOMAIN: "cat-mapper.firebaseapp.com",
  DATABASE_URL: "https://cat-mapper-default-rtdb.firebaseio.com",
  MAPS_API: "AIzaSyB66GWy2pyEcXxKmGfTihW03Z43nnv6Lks",
};

function getEnvVars() {
  return ENV;
}

export default getEnvVars();
