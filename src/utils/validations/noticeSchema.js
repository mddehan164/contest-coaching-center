import { z } from "zod";

export const NoticeSchema = z.object({
  title: z.string().min(1, "Notice title is required."),
  date: z.string().min(1, "Date is required."),
  type: z.number().min(1, "Type is required.").optional(),
  file: z.string().optional(),
});

export const EditNoticeSchema = z.object({
  title: z.string().min(1, "Notice title is required.").optional(),
  date: z.string().min(1, "Date is required.").optional(),
  type: z.number().min(1, "Type is required.").optional(),
  file: z.string().optional(),
});

export const CreateNoticeSchema = NoticeSchema;
export const AddNoticeSchema = CreateNoticeSchema;
export const UpdateNoticeSchema = EditNoticeSchema;
