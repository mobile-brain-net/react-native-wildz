import AsyncStorage from '@react-native-async-storage/async-storage';

export type FieldLog = {
  id: string;
  speciesName: string;
  date: string;
  time: string;
  biome: string;
  locationNote?: string;
  weather: string;
  notes?: string;
};

export type HabitatCheck = {
  id: string;
  biomeName: string;
  biomeType: string;
  date: string;
  vegetation: 'lush' | 'mixed' | 'thin' | 'bare';
  water: 'abundant' | 'limited' | 'dry';
  disturbance: 'low' | 'medium' | 'high';
  litter: 'none' | 'low' | 'medium' | 'high';
  notes?: string;
  score: number;
};

const KEYS = {
  BOOKMARKS: 'wildz/speciesBookmarks',
  JOURNAL: 'wildz/journal',
  BIOMES: 'wildz/biomes',
  ACTIONS: 'wildz/actions',
};

export const storage = {
  async getBookmarks(): Promise<string[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      return [];
    }
  },

  async setBookmarks(bookmarks: string[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  },

  async getJournal(): Promise<FieldLog[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.JOURNAL);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading journal:', error);
      return [];
    }
  },

  async setJournal(logs: FieldLog[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.JOURNAL, JSON.stringify(logs));
    } catch (error) {
      console.error('Error saving journal:', error);
    }
  },

  async getBiomes(): Promise<HabitatCheck[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.BIOMES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading biomes:', error);
      return [];
    }
  },

  async setBiomes(checks: HabitatCheck[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.BIOMES, JSON.stringify(checks));
    } catch (error) {
      console.error('Error saving biomes:', error);
    }
  },

  async getActions(): Promise<any[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.ACTIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading actions:', error);
      return [];
    }
  },

  async setActions(actions: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.ACTIONS, JSON.stringify(actions));
    } catch (error) {
      console.error('Error saving actions:', error);
    }
  },
};
