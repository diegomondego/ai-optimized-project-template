/**
 * dashboard.types.ts
 *
 * Types for the dashboard feature.
 * Add domain-specific types for the core product here.
 */

export interface DashboardStats {
  userId: string;
  totalItems: number;
  activeItems: number;
  lastActivityAt: Date | null;
}

export interface ActivityEvent {
  id: string;
  userId: string;
  type: string;
  description: string;
  occurredAt: Date;
}
