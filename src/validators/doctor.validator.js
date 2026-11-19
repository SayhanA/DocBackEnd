const { z } = require("zod");

const doctorSchema = z.object({
    name: z.string().trim().min(2).max(100),
    specialization: z.string().trim().min(2).max(100),
    hospital: z.string().trim().min(2).max(150),
    phone: z.string().trim().min(5).max(20),
    email: z.string().trim().email().toLowerCase(),
});



module.exports = {
    doctorSchema,
};