import { z } from "zod";

export const payloadSchema = z.object({
  sub: z.uuid(),
  email: z.email(),
  username: z.string().nonempty(),
});
