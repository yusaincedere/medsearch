import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers } from '../../utils/userQueries'; // userQueries fonksiyonunu içe aktarıyoruz
import { UserFilter } from '../../types/filters'; // Filtre yapısını içe aktarıyoruz

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  try {
    const { page = 1, limit = 10, filters } = req.body;

    // Gelen filtreleri işleme

    // getUsers fonksiyonunu çağır
    const result = await getUsers(Number(page), Number(limit), filters);
    console.log(result)
    // Başarılı yanıt
    return res.status(200).json(result);
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
