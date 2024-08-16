import axios from 'axios';
import { API_URL } from "@/utils/apj";

export default async function handler(req, res) {
  try {
    const response = await axios.get(`${API_URL}/api/verifyToken`, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
