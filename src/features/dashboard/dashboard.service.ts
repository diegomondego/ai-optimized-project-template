/**
 * dashboard.service.ts
 *
 * Business logic for the dashboard feature.
 */

import type { ActivityEvent, DashboardStats } from "./dashboard.types";

/**
 * Fetch aggregate stats for the user's dashboard.
 */
export async function getStats(userId: string): Promise<DashboardStats> {
  // TODO: query your database
  void userId;
  return {
    userId,
    totalItems: 0,
    activeItems: 0,
    lastActivityAt: null,
  };
}

/**
 * Fetch the most recent activity events for a user.
 */
export async function getRecentActivity(
  userId: string,
  limit = 20
): Promise<ActivityEvent[]> {
  // TODO: query your database
  void userId;
  void limit;
  return [];
}

export const dashboardService = { getStats, getRecentActivity };
