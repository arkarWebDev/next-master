"use client";

import CardWrapper from "@/components/topics/card-wrapper";
import { PostSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { useState } from "react";
import { createPostHandler } from "@/lib/action";

interface CreatePostProps {
  params: {
    topicId: string;
  };
}
const CreatePost = ({ params }: CreatePostProps) => {
  const [loading, setLoading] = useState(false);
  const { topicId } = params;

  const form = useForm({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      content: "",
      topicId: topicId,
    },
  });

  const onSubmitHandler = async (data: z.infer<typeof PostSchema>) => {
    setLoading(true);
    await createPostHandler(data);
  };

  return (
    <main>
      <CardWrapper title="Create new post" label={`create your own new post.`}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="topicId"
                render={({ field }) => (
                  <FormItem hidden>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter post title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="content"
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
            <Button size={"lg"} className="w-full" disabled={loading}>
              {loading ? "Requesting ..." : "Create Post"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </main>
  );
};

export default CreatePost;
