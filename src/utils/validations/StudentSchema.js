import { z } from "zod";


export const CreateStudentSchema = z.object({
    name: z.string().min(1, "Student name is required."),
    image: z.string().optional().default(""),
    course_id: z.number().min(1, "Course ID is required."),
    batch_id: z.number().min(1, "Batch ID is required."),
    father_name: z.string().optional().default(""),
    mother_name: z.string().optional().default(""),
    gender: z.enum(["male", "female", "other"]).default("male"),
    mobile: z.string().min(1, "Mobile number is required."),
    address: z.string().optional().default(""),
    ssc_result: z.number().optional().default(0),
    hsc_result: z.number().optional().default(0),
    total_amount: z.number().optional().default(0),
    status: z.number().optional().default(1),
});


// Legacy aliases for backward compatibility
export const StudentSchema = CreateStudentSchema;
export const AddStudentSchema = CreateStudentSchema;
export const EditStudentSchema = CreateStudentSchema;