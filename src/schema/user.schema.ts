import {object, string, TypeOf} from "zod";

export const createUserSchema = object({
    body: object({
        firstname: string({required_error: "First name is required"}),
        lastname: string({required_error: "Last name is required"}),
        nickname: string({required_error: "Nick name is required"}),
        email: string({required_error: "Email is required"}).email("Enter a valid email"),
        password: string({required_error: "Password is required"}).min(6,"Password is too short - should be 6 chars minimum"),
        confirmedPassword: string({required_error: "Confirm password is required"})
    }).refine((data)=>data.password === data.confirmedPassword,{message: "Password doesn't match",path:['confirmPassword']})
});

export type createUserInput = Omit<TypeOf<typeof createUserSchema>,"body.confirmedPassword">;