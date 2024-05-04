import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});
