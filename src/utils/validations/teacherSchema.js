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

// Create Teacher Schema - for adding new teachers
export const CreateTeacherSchema = z.object({
    name: z.string().min(1, "Teacher name is required."),
    image: z.string().optional().default(""),
    course_id: z.number().min(1, "Course ID is required."),
    batch_id: z.number().min(1, "Batch ID is required."),
    father_name: z.string().optional().default(""),
    mother_name: z.string().optional().default(""),
    gender: z.enum(["male", "female", "other"]).default("male"),
    mobile: z.string().min(1, "Mobile number is required."),
    address: z.string().optional().default(""),
    ssc_result: z.string().optional().default(""),
    hsc_result: z.string().optional().default(""),
    total_amount: z.string().optional().default(""),
    status: z.number().optional().default(1),
});

// Edit Teacher Schema - for updating existing teachers (all fields optional for partial updates)
export const EditTeacherSchema = z.object({
    name: z.string().min(1, "Teacher name is required.").optional(),
    image: z.string().optional(),
    course_id: z.number().min(1, "Course ID is required.").optional(),
    batch_id: z.number().min(1, "Batch ID is required.").optional(),
    father_name: z.string().optional(),
    mother_name: z.string().optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    mobile: z.string().min(1, "Mobile number is required.").optional(),
    address: z.string().optional(),
    ssc_result: z.string().optional(),
    hsc_result: z.string().optional(),
    total_amount: z.string().optional(),
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

// Legacy aliases for backward compatibility
export const TeacherSchema = CreateTeacherSchema;
export const AddTeacherSchema = CreateTeacherSchema;
export const UpdateTeacherSchema = EditTeacherSchema;