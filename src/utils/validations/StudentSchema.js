import { z } from "zod";


const isValidDateString = (dateStr) => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime()) && dateStr.length === 10;
};

const isNotPastDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date >= today;
};

export const StudentSchema = z.object({
    name: z.string().min(1, "Student name is required."),
    course_id: z.number().min(1, "Course ID is required."),
    start_date: z
        .string()
        .min(1, "Start date is required.")
        .refine(isValidDateString, "Invalid date format. Use YYYY-MM-DD.")
        .refine(isNotPastDate, "Start date cannot be before today's date."),
    end_date: z
        .string()
        .min(1, "End date is required.")
        .refine(isValidDateString, "Invalid date format. Use YYYY-MM-DD."),
    status: z.number().optional().default(1),
}).refine(
    (data) => {
        if (data.start_date && data.end_date) {
            const startDate = new Date(data.start_date);
            const endDate = new Date(data.end_date);
            return endDate >= startDate;
        }
        return true;
    },
    {
        message: "End date cannot be before start date.",
        path: ["end_date"],
    }
);

export const EditStudentSchema = z.object({
    name: z.string().min(1, "Student name is required.").optional(),
    course_id: z.number().min(1, "Course ID is required.").optional(),
    start_date: z
        .string()
        .min(1, "Start date is required.")
        .refine(isValidDateString, "Invalid date format. Use YYYY-MM-DD.")
        .refine(isNotPastDate, "Start date cannot be before today's date.")
        .optional(),
    end_date: z
        .string()
        .min(1, "End date is required.")
        .refine(isValidDateString, "Invalid date format. Use YYYY-MM-DD.")
        .optional(),
    status: z.number().optional(),
}).refine(
    (data) => {
        if (data.start_date && data.end_date) {
            const startDate = new Date(data.start_date);
            const endDate = new Date(data.end_date);
            return endDate >= startDate;
        }
        return true;
    },
    {
        message: "End date cannot be before start date.",
        path: ["end_date"],
    }
);

export const CreateStudentSchema = StudentSchema;
export const AddStudentSchema = CreateStudentSchema;
export const UpdateStudentSchema = EditStudentSchema;