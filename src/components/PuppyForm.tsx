"use client";

import { Puppy } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const puppySchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(0, "Age must be a positive number"),
  gender: z.string().min(1, "Gender is required"),
  isVaccinated: z.boolean(),
  isNeutered: z.boolean(),
  size: z.string().min(1, "Size is required"),
  breed: z.string().min(1, "Breed is required"),
  traits: z.array(z.string()),
  photoUrl: z.string().url("Invalid URL"),
});

type PuppyFormValues = z.infer<typeof puppySchema>;

export default function PuppyForm({
  puppy,
  onSave,
}: {
  puppy: Partial<Puppy>;
  onSave: (puppy: Partial<Puppy>) => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<PuppyFormValues>({
    resolver: zodResolver(puppySchema),
    defaultValues: {
      name: puppy.name || "",
      age: puppy.age || 0,
      gender: puppy.gender || "",
      isVaccinated: puppy.isVaccinated || false,
      isNeutered: puppy.isNeutered || false,
      size: puppy.size || "",
      breed: puppy.breed || "",
      traits: puppy.traits || [],
      photoUrl: puppy.photoUrl || "",
    },
  });

  useEffect(() => {
    if (puppy) {
      setValue("name", puppy.name || "");
      setValue("age", puppy.age || 0);
      setValue("gender", puppy.gender || "");
      setValue("isVaccinated", puppy.isVaccinated || false);
      setValue("isNeutered", puppy.isNeutered || false);
      setValue("size", puppy.size || "");
      setValue("breed", puppy.breed || "");
      setValue("traits", puppy.traits || []);
      setValue("photoUrl", puppy.photoUrl || "");
    }
  }, [puppy, setValue]);

  const onSubmit = (data: PuppyFormValues) => {
    onSave({ ...puppy, ...data, age: Number(data.age) });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Name" {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          placeholder="Age"
          type="number"
          {...register("age", { valueAsNumber: true })}
        />
        {errors.age && <p className="text-red-500">{errors.age.message}</p>}
      </div>

      <div>
        <Label htmlFor="gender">Gender</Label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.gender && (
          <p className="text-red-500">{errors.gender.message}</p>
        )}
      </div>

      <div className="space-x-2 flex items-center">
        <Controller
          name="isVaccinated"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="isVaccinated"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="isVaccinated">Vaccinated</Label>
      </div>

      <div className="space-x-2 flex items-center">
        <Controller
          name="isNeutered"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="isNeutered"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="isNeutered">Neutered</Label>
      </div>

      <div>
        <Label htmlFor="size">Size</Label>
        <Controller
          name="size"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.gender && (
          <p className="text-red-500">{errors.gender.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="breed">Breed</Label>
        <Input id="breed" placeholder="Breed" {...register("breed")} />
        {errors.breed && <p className="text-red-500">{errors.breed.message}</p>}
      </div>

      <div>
        <Label htmlFor="photoUrl">Photo URL</Label>
        <Input
          id="photoUrl"
          placeholder="Photo URL"
          type="url"
          {...register("photoUrl")}
        />
        {errors.photoUrl && (
          <p className="text-red-500">{errors.photoUrl.message}</p>
        )}
      </div>

      <Button type="submit">{puppy ? "Update Puppy" : "Add Puppy"}</Button>
    </form>
  );
}
