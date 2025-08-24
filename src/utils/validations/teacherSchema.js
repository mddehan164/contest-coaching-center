// utils/validations.ts
import { z } from 'zod';

export const CreateTeacherSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subject: z.string().min(1, "Subject is required"),
  gender: z.enum(["male", "female"]),
  mobile: z.string().min(11, "Mobile number must be at least 11 digits"),
  address: z.string().min(1, "Address is required"),
  image: z.string().optional(),
  course_id: z.number().positive("Course is required"),
  batch_id: z.number().positive("Batch is required"),
  status: z.number().min(0).max(1)
});

export const EditTeacherSchema = CreateTeacherSchema.partial();