import { S3Services } from "./s3Services";
import { DateService } from "./dateService";
import { Locale } from "./locale";
export const PMS_S3: S3Services = new S3Services();
export const PMS_DATE: DateService = new DateService();
export const PMS_LOCALE: Locale = new Locale();
