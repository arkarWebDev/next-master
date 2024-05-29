"use client";

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
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiscussSchema } from "@/schema";
import * as z from "zod";
import { LoaderCircle, Send } from "lucide-react";

const CommentBox = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(DiscussSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmitHandler = (data: z.infer<typeof DiscussSchema>) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <main className="mt-8">
      <Card>
        <CardHeader>
          <h2 className=" text-xl font-bold">Discuss Area</h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitHandler)}
              className="space-y-6"
            >
              <div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discuss content</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="eg.I found a solution for you."
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <div className=" flex justify-end">
                  <Button size={"lg"} className=" mt-2" disabled={loading}>
                    {loading ? <LoaderCircle /> : <Send />}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default CommentBox;
