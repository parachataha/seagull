import z from "zod"

export const UserSkillSchema = z.object({
  name: z.string({
    error: "Skill name must be a string",
  }),

  id: z.number({
    error: "Skill ID must be a number",
  }),

  userId: z.number({
    error: "User ID must be a number",
  }),

  parentId: z.number({
    error: "Parent ID must be a number",
  }).nullable(),

  order: z.number({
    error: "Order must be a number",
  }).nullable(),

  color: z.string({
    error: "Color must be a string",
  }).max(7, {
    error: "Invalid hex color"
  }),

  createdAt: z.number({
    error: "CreatedAt must be a number",
  }),
});

export type UserSkill = z.infer<typeof UserSkillSchema>;
