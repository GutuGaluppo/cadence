import { Settings, DEFAULT_SETTINGS } from '@/types';
import { SettingsRepository } from '../SettingsRepository';

export class LocalStorageSettingsRepository implements SettingsRepository {
  private readonly STORAGE_KEY = 'cadence_settings';

  async getSettings(): Promise<Settings> {
    const data = localStorage.getItem(this.STORAGE_KEY);

    if (!data) {
      return DEFAULT_SETTINGS;
    }

    try {
      const parsed = JSON.parse(data) as Partial<Settings>;
      return { ...DEFAULT_SETTINGS, ...parsed };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  async saveSettings(settings: Settings): Promise<void> {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
  }
}
