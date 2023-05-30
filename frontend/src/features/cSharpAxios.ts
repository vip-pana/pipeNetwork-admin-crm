import axios from "axios";

export default axios.create({ baseURL: "https://localhost:7141/api/" });

export const CONTACT_URL = "Contacts/";
export const USER_LOGIN_URL = "Users/login";
export const TICKET_URL = "Tickets/";
