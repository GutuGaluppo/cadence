import { create } from 'zustand';
import { Settings, DEFAULT_SETTINGS } from '@/types';
import { LocalStorageSettingsRepository } from '@/repositories/implementations/LocalStorageSettingsRepository';

const repository = new LocalStorageSettingsRepository();

interface SettingsStore {
  settings: Settings;
  loadSettings: () => Promise<void>;
  updateSettings: (settings: Settings) => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: DEFAULT_SETTINGS,

  loadSettings: async () => {
    const settings = await repository.getSettings();
    set({ settings });
  },

  updateSettings: async (settings: Settings) => {
    await repository.saveSettings(settings);
    set({ settings });
  },
}));
