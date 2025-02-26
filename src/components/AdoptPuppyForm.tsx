"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PuppyWithId } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const adoptSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  message: z.string().min(10, "Message needs to be at least 10 characters"),
});

type AdoptFormValues = z.infer<typeof adoptSchema>;

export default function AdoptPuppyForm({ puppy }: { puppy: PuppyWithId }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AdoptFormValues>({
    resolver: zodResolver(adoptSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: AdoptFormValues) => {
    setLoading(true);

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/adopters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        puppyId: puppy._id,
        ...data,
      }),
    })
      .then(async (res) => {
        const responseData = await res.json();

        if (!res.ok) {
          setError("root", {
            type: "custom",
            message: responseData.message.join(", "),
          });
          return;
        }

        setSubmitted(true);
      })
      .catch((error) => {
        console.error(error);
        setError("root", {
          type: "custom",
          message: "An unexpected error occurred. Please try again.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="pt-24 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-2">
        Interested in Adopting {puppy.name}?
      </h3>
      {submitted ? (
        <p className="text-green-500">
          Your adoption request has been submitted!
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your Name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Your Phone Number"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              placeholder="Why do you want to adopt?"
              {...register("message")}
              className="border p-2 rounded w-full"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </Button>

          {/* Display custom errors from the server */}
          {errors.root && errors.root.type === "custom" && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}
        </form>
      )}
    </div>
  );
}
