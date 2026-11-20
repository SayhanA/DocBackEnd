const { z } = require("zod");

const doctorSchema = z.object({
    name: z.string().trim().min(2).max(100),
    specialization: z.string().trim().min(2).max(100),
    hospital: z.string().trim().min(2).max(150),
    phone: z.string().trim().min(5).max(20),
    email: z.string().trim().email().toLowerCase(),
});

const updateDoctorSchema = doctorSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field is required"
    }
);

const doctorQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().default(""),
  specialization: z.string().trim().optional(),
  hospital: z.string().trim().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortBy: z.enum(["createdAt", "name"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
}).refine(
  (data) => {
    if (!data.startDate || !data.endDate) return true;

    return new Date(data.startDate) <= new Date(data.endDate);
  },
  {
    message: "startDate must be before or equal to endDate",
    path: ["endDate"],
  }
);


module.exports = {
    doctorSchema,
    updateDoctorSchema,
    doctorQuerySchema
};