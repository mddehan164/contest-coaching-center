import { z } from "zod";

// ---------- Schemas ----------

// Create Schema
export const CourseSchema = z.object({
  title: z.string().min(1, "Course title is required."),
  image: z.string().min(1, "Course image is required."),
  short_des: z.string().min(1, "Short description is required."),
  long_des: z.string().min(1, "Long description is required."),
  price: z.number().min(0, "Price must be a positive number."),
  offer_price: z.number().min(0, "Offer price must be a positive number.").optional(),
  branch_id: z.array(z.number()).min(1, "At least one branch must be selected."),
  group: z.string().optional(),
  status: z.number().optional().default(1),
});

// Edit Schema (all optional but still validated if present)
export const EditCourseSchema = z.object({
  title: z.string().min(1, "Course title is required.").optional(),
  image: z.string().min(1, "Course image is required.").optional(),
  short_des: z.string().min(1, "Short description is required.").optional(),
  long_des: z.string().min(1, "Long description is required.").optional(),
  price: z.number().min(0, "Price must be a positive number.").optional(),
  offer_price: z.number().min(0, "Offer price must be a positive number.").optional(),
  branch_id: z.array(z.number()).min(1, "At least one branch must be selected.").optional(),
  group: z.string().optional(),
  status: z.number().optional(),
});

// Aliases
export const CreateCourseSchema = CourseSchema;
export const AddCourseSchema = CreateCourseSchema;
export const UpdateCourseSchema = EditCourseSchema;
