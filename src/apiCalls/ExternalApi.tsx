import axios from 'axios';

// Axios instance oluşturma (Gerekirse temel URL ve varsayılan ayarlarla)
const apiClient = axios.create({
  timeout: 10000, // Timeout süresi (isteğe bağlı)
  headers: {
    'Content-Type': 'application/json'
  }
});

// Şehir listesini almak için bir fonksiyon
export const getCityList = async () => {
  try {
    const response = await apiClient.get('https://turkiyeapi.dev/api/v1/provinces');
    return response.data; // API'den dönen verileri döndür
  } catch (error) {
    console.error("Error fetching city list:", error);
    throw error;
  }
};