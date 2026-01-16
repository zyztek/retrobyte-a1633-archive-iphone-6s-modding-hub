import { DurableObject } from "cloudflare:workers";
import type { DemoItem } from '@shared/types';
import { MOCK_ITEMS } from '@shared/mock-data';
export interface LeaderboardEntry {
  username: string;
  xp: number;
  rank: string;
  lastUpdate: string;
}
// **DO NOT MODIFY THE CLASS NAME**
export class GlobalDurableObject extends DurableObject {
    async getCounterValue(): Promise<number> {
      const value = (await this.ctx.storage.get("counter_value")) || 0;
      return value as number;
    }
    async increment(amount = 1): Promise<number> {
      let value: number = (await this.ctx.storage.get("counter_value")) || 0;
      value += amount;
      await this.ctx.storage.put("counter_value", value);
      return value;
    }
    async getDemoItems(): Promise<DemoItem[]> {
      const items = await this.ctx.storage.get("demo_items");
      if (items) {
        return items as DemoItem[];
      }
      await this.ctx.storage.put("demo_items", MOCK_ITEMS);
      return MOCK_ITEMS;
    }
    async addDemoItem(item: DemoItem): Promise<DemoItem[]> {
      const items = await this.getDemoItems();
      const updatedItems = [...items, item];
      await this.ctx.storage.put("demo_items", updatedItems);
      return updatedItems;
    }
    async updateDemoItem(id: string, updates: Partial<Omit<DemoItem, 'id'>>): Promise<DemoItem[]> {
      const items = await this.getDemoItems();
      const updatedItems = items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      );
      await this.ctx.storage.put("demo_items", updatedItems);
      return updatedItems;
    }
    async deleteDemoItem(id: string): Promise<DemoItem[]> {
      const items = await this.getDemoItems();
      const updatedItems = items.filter(item => item.id !== id);
      await this.ctx.storage.put("demo_items", updatedItems);
      return updatedItems;
    }
    // Leaderboard Methods
    async syncAcademyData(entry: LeaderboardEntry): Promise<void> {
      const leaderboard = (await this.ctx.storage.get<LeaderboardEntry[]>("leaderboard")) || [];
      const index = leaderboard.findIndex(e => e.username === entry.username);
      if (index > -1) {
        leaderboard[index] = entry;
      } else {
        leaderboard.push(entry);
      }
      // Keep top 50
      const sorted = leaderboard.sort((a, b) => b.xp - a.xp).slice(0, 50);
      await this.ctx.storage.put("leaderboard", sorted);
    }
    async getGlobalLeaderboard(): Promise<LeaderboardEntry[]> {
      return (await this.ctx.storage.get<LeaderboardEntry[]>("leaderboard")) || [];
    }
}