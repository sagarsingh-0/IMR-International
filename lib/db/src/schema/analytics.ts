import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const analyticsEvents = pgTable("analytics_events", {
  id: serial("id").primaryKey(),
  hashedSessionId: text("hashed_session_id").notNull(),
  eventType: text("event_type").notNull(),
  page: text("page").notNull(),
  element: text("element"),
  timestamp: timestamp("timestamp", { withTimezone: true }).defaultNow().notNull(),
});

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = typeof analyticsEvents.$inferInsert;

export const consentLogs = pgTable("consent_logs", {
  id: serial("id").primaryKey(),
  status: text("status").notNull(),
  ipAddress: text("ip_address"),
  timestamp: timestamp("timestamp", { withTimezone: true }).defaultNow().notNull(),
});

export type ConsentLog = typeof consentLogs.$inferSelect;
export type InsertConsentLog = typeof consentLogs.$inferInsert;
