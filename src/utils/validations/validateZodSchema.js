import { errorNotify } from "../notify";

export const validateZodSchema = ({ schema, data }) => {
    try {
        const validatedData = schema.parse(data);
        return validatedData;
    } catch (error) {
        if (error.errors && Array.isArray(error.errors)) {
            const firstError = error.errors[0];
            if (firstError && firstError.message) {
                errorNotify(firstError.message);
            } else {
                errorNotify("Validation failed");
            }
        } else if (error.message) {
            errorNotify(error.message);
        } else {
            errorNotify("Validation failed");
        }
        return null;
    }
};