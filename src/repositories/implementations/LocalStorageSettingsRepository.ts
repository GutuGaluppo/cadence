import { Settings, DEFAULT_SETTINGS } from '@/types';
import { SettingsRepository } from '../SettingsRepository';

export class LocalStorageSettingsRepository implements SettingsRepository {
  private readonly STORAGE_KEY = 'cadence_settings';

  async getSettings(): Promise<Settings> {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : DEFAULT_SETTINGS;
  }

  async saveSettings(settings: Settings): Promise<void> {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
  }
}
