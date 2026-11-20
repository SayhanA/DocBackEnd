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

const updatePatientSchema = patientSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field is required"
    }
)

const patientQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().default(""),
  condition: z.string().trim().optional(),
  doctor: z.string().trim().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortBy: z.enum(["createdAt", "name", "age"]).default("createdAt"),
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
    patientSchema,
    updatePatientSchema,
    patientQuerySchema
}

