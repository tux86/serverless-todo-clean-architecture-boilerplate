import { validate, ValidationError } from 'class-validator';

export async function classValidator<T extends object>(object: T): Promise<void> {
    const validationErrors: ValidationError[] = await validate(object);
    if (validationErrors.length > 0) {
        const errors = validationErrors.map((error) => Object.values(error.constraints || {})).join(', ');
        throw new Error(errors);
    }
}
