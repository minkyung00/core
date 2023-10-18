import { SeverityLevel } from "@sentry/react";

export interface Event {
  type: EventType;
  level: SeverityLevel;
  timestamp: Date;
  data: unknown;
}

type EventType = "USER_INTERFACE";
