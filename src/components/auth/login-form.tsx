"use client";

import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schema";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { Github } from "lucide-react";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { pending } = useFormStatus();

  const onSubmitHandler = (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <CardWrapper
      title="login"
      label="login form here"
      backHerf="/auth/register"
      backLabel="Don't have an account? Register here."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="example@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <Button size={"lg"} className="w-full" disabled={pending}>
            {loading ? "Requesting ..." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="my-2 text-muted-foreground text-center text-sm">or</p>
      <Button className="w-full" size={"lg"} variant={"outline"}>
        <Github className="mr-2 h-4 w-4" /> Continue with Github
      </Button>
    </CardWrapper>
  );
};

export default LoginForm;
