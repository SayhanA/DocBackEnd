const { z } = require("zod");

const patientSchema = z.object({
    name: z.string().trim().min(2).max(100),
    age: z.coerce.number().min(0).max(150),
    gender: z.enum(["male", "female", "other"]),
    condition: z.string().trim().min(2).max(200),
    phone: z.string().trim().min(5).max(20),
    email: z.string().trim().email().toLowerCase().optional(),
    doctor: z.string().trim().min(1),
});


module.exports = {
    patientSchema
}

