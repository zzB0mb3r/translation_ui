import { LanguageCodes } from "./language.enum";

export interface Translation {
  originalLanguage: LanguageCodes;
  originalText: string;
  targetLanguage: LanguageCodes;
  targetText?: string;
}