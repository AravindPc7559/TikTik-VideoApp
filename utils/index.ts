import axios from "axios";
import jwtDecode from "jwt-decode";
export const BASE_URL = process.env.NEXT_PUBLIC_URL

export const createOrGetUser = async (responce: any, adddUser: any) => {
 const decoded: {name: string, picture: string, sub: string} =  jwtDecode(responce.credential);
 const {name, picture, sub} = decoded;
 const user = {
  _id: sub,
  _type: 'user',
  userName: name,
  image: picture
 }
 adddUser(user);
 await axios.post(`http://localhost:3000/api/auth`, user)
};
