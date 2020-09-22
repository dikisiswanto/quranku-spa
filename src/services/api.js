import CONSTANTS from '../data/constants';

class ApiService {
  static async getAllSurahs() {
    try {
      const response = await fetch(`${CONSTANTS.API_BASE_URL}/surah`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error('error');
    } catch (error) {
      return error;
    }
  }

  static async getSurah(surahNumber) {
    try {
      const response = await fetch(`${CONSTANTS.API_BASE_URL}/surah/${surahNumber}`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error('error');
    } catch (error) {
      return error;
    }
  }
}

export default ApiService;
