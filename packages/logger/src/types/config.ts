import type { AxiosRequestConfig } from "axios";
import type { BrowserOptions } from "@sentry/react";
import { ProductType } from "./product";

export interface LoggerOptions {
  product: ProductType;

  sellerId: number;
  deviceId: number;

  sentry?: BrowserOptions;
  loki?: AxiosRequestConfig;
}
