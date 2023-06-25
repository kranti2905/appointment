const BASE_URL = "http://localhost:4000/dev/";

export default {
  LOGIN: BASE_URL + "auth/login",
  REGISTER: BASE_URL + "auth/register",
  PROFILE: BASE_URL + "user/profile",
  SEND_OTP: BASE_URL + "auth/send-otp",
  VERIFY_OTP: BASE_URL + "auth/verify-otp",
  UPDATE_CLIENT: BASE_URL + "client",
  USERS: BASE_URL + "user",
  SERVICE: BASE_URL + "service"
};
