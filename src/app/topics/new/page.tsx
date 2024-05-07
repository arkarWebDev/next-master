"use client";
import CardWrapper from "@/components/topics/card-wrapper";

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

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TopicSchema } from "@/schema";
import { useFormStatus } from "react-dom";
import { useState } from "react";

const CreateTopic = () => {
  const [loading, setLoading] = useState(false);

  const { pending } = useFormStatus();

  const form = useForm({
    resolver: zodResolver(TopicSchema),
    defaultValues: {
      name: "",
      image: "",
      description: "",
    },
  });

  const onSubmitHandler = (data: z.infer<typeof TopicSchema>) => {
    console.log(data);
  };
  return (
    <section>
      <CardWrapper title="Create new Topic" label="create your own topic now.">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="TypeScript" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Link</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://www.expample.com/example.png"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter your description here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <Button size={"lg"} className="w-full" disabled={pending}>
              {loading ? "Requesting ..." : "Create Topic"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </section>
  );
};

export default CreateTopic;
