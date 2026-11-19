const { z } = require('zod');

const loginSchema = z.object({
    email: z.string().trim().email({ message: "Invalid email address"}),
    password: z.string().min(6, { message: "Password must be at least 6 characters long"})
});

module.exports = {
    loginSchema
}