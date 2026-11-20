import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string()
    .trim() //Removes surrounding whitespace
    .min(3, "Title must contain at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(5, "Description must contain at least 5 characters"),

  status: z
    .enum(["OPEN", "IN_PROGRESS", "CLOSED"]) //Allows only specified values
    .default("OPEN"),
});