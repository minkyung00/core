import * as Sentry from "@sentry/react";
import axios, { AxiosInstance } from "axios";

import { LoggerOptions } from "./types/config";
import type { Event as EventType } from "../src/types/event";

export class Logger {
  private defaultOption: LoggerOptions;
  private logClient: AxiosInstance;

  contructor(config: LoggerOptions) {
    this.init(config);
  }

  init(config: LoggerOptions) {
    this.defaultOption = config;

    this.initSentry(config.sentry);
    this.initLoki(config.loki);
  }

  private initSentry(config: LoggerOptions["sentry"]) {
    if (!config) throw new Error("No Sentry config set");

    Sentry.init(config);
  }

  private initLoki(config: LoggerOptions["loki"]) {
    if (!config) throw new Error("No Loki config set");

    this.logClient = axios.create(config);
  }

  private log(event: EventType) {
    this.sendLoki(event);
    this.sendSentry(event);
  }

  private sendSentry(event: EventType) {
    const { type, level, data } = event;

    Sentry.withScope((scope) => {
      scope.setTag(type, "my value");
      scope.setLevel(level);

      Sentry.captureException(data);
    });

    // Sentry method
    Sentry.captureException(data);
  }

  private sendLoki(event: EventType, url?: string) {
    if (!this.defaultOption.loki) throw new Error("No Loki config set");

    const endpoint = this.defaultOption.loki.url || url || "";
    this.logClient.post(endpoint, {
      ...event,
      timestamp: new Date(),
    });
  }

  info(event: EventType) {
    this.log({
      ...event,
      level: "info",
    });
  }

  error(event: EventType) {
    const { data: error } = event;

    // TODO: CustomError 정의
    // if (error instanceof CustomError) {
    // }

    this.log({
      ...event,
      level: "error",
    });
  }
}
