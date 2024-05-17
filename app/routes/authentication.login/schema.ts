import * as v from "valibot";

export const LoginFormSchema = v.object({
  username: v.string([v.minLength(1, "Name cannot be empty")]),
  password: v.string([v.minLength(1, "Password cannot be empty")]),
});
