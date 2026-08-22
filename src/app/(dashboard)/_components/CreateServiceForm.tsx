





// "use client";

// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";

// import { createService } from "../_actions/createService";

// import {
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";

// import {
//   CreateServiceFormData,
//   createServiceSchema,
// } from "@/schemas/create-service.schema";

// type CategoryProps = {
//   id: string;
//   name: string;
// };

// type CreateServiceFormProps = {
//   categories: CategoryProps[];
// };

// export default function CreateServiceForm({
//   categories,
// }: CreateServiceFormProps) {
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<CreateServiceFormData>({
//     resolver: zodResolver(createServiceSchema),
//     defaultValues: {
//       categoryId: "",
//       title: "",
//       description: "",
//       price: 0,
//       priceType: "HOURLY",
//       estimatedDuration: 60,
//       thumbnail: "",
//       isAvailable: true,
//     },
//   });

//   const isAvailable = watch("isAvailable");

//   const onSubmit = async (
//     data: CreateServiceFormData
//   ) => {
//     try {
//       const result = await createService(data);

//       if (!result.success) {
//         throw new Error(result.message);
//       }

//       toast.success(
//         "Service created successfully!"
//       );

//       router.push(
//         "/dashboard/technician/services"
//       );
//       router.refresh();
//     } catch (error) {
//       toast.error("Failed to create service", {
//         description:
//           error instanceof Error
//             ? error.message
//             : "Something went wrong.",
//       });
//     }
//   };

//   return (
//     <>
//       <CardHeader className="text-center">
//         <CardTitle className="text-2xl">
//           Create New Service
//         </CardTitle>

//         <CardDescription>
//           Fill in the information below to publish
//           your service.
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-5"
//         >
//           {/* Category */}
//           <div className="space-y-2">
//             <Label>Category</Label>

//             <select
//               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//               {...register("categoryId")}
//             >
//               <option value="">
//                 Select a Category
//               </option>

//               {categories.map((category) => (
//                 <option
//                   key={category.id}
//                   value={category.id}
//                 >
//                   {category.name}
//                 </option>
//               ))}
//             </select>

//             {errors.categoryId && (
//               <p className="text-sm text-red-500">
//                 {errors.categoryId.message}
//               </p>
//             )}
//           </div>

//           {/* Title */}
//           <div className="space-y-2">
//             <Label>Service Title</Label>

//             <Input
//               placeholder="Complete House Wiring"
//               {...register("title")}
//             />

//             {errors.title && (
//               <p className="text-sm text-red-500">
//                 {errors.title.message}
//               </p>
//             )}
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <Label>Description</Label>

//             <Textarea
//               rows={5}
//               placeholder="Describe your service..."
//               {...register("description")}
//             />

//             {errors.description && (
//               <p className="text-sm text-red-500">
//                 {errors.description.message}
//               </p>
//             )}
//           </div>

//           {/* Price */}
//           <div className="space-y-2">
//             <Label>Price</Label>

//             <Input
//               type="number"
//               placeholder="50"
//               {...register("price", {
//                 valueAsNumber: true,
//               })}
//             />

//             {errors.price && (
//               <p className="text-sm text-red-500">
//                 {errors.price.message}
//               </p>
//             )}
//           </div>

//           {/* Price Type */}
//           <div className="space-y-2">
//             <Label>Price Type</Label>

//             <select
//               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//               {...register("priceType")}
//             >
//               <option value="HOURLY">
//                 Hourly
//               </option>

//               <option value="FIXED">
//                 Fixed
//               </option>
//             </select>

//             {errors.priceType && (
//               <p className="text-sm text-red-500">
//                 {errors.priceType.message}
//               </p>
//             )}
//           </div>

//           {/* Estimated Duration */}
//           <div className="space-y-2">
//             <Label>
//               Estimated Duration (minutes)
//             </Label>

//             <Input
//               type="number"
//               placeholder="60"
//               {...register(
//                 "estimatedDuration",
//                 {
//                   valueAsNumber: true,
//                 }
//               )}
//             />

//             {errors.estimatedDuration && (
//               <p className="text-sm text-red-500">
//                 {
//                   errors.estimatedDuration
//                     .message
//                 }
//               </p>
//             )}
//           </div>

//           {/* Thumbnail */}
//           <div className="space-y-2">
//             <Label>Thumbnail URL</Label>

//             <Input
//               placeholder="https://example.com/image.jpg"
//               {...register("thumbnail")}
//             />

//             {errors.thumbnail && (
//               <p className="text-sm text-red-500">
//                 {errors.thumbnail.message}
//               </p>
//             )}
//           </div>

//           {/* Availability */}
//           <div className="flex items-center justify-between rounded-lg border p-4">
//             <div>
//               <Label>Available</Label>

//               <p className="text-sm text-muted-foreground">
//                 Customers can book this service.
//               </p>
//             </div>

//             <Switch
//               checked={isAvailable}
//               onCheckedChange={(checked) =>
//                 setValue(
//                   "isAvailable",
//                   checked
//                 )
//               }
//             />
//           </div>

//           <Button
//             type="submit"
//             className="w-full"
//             disabled={isSubmitting}
//           >
//             {isSubmitting
//               ? "Creating Service..."
//               : "Create Service"}
//           </Button>
//         </form>
//       </CardContent>
//     </>
//   );
// }














"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createService } from "../_actions/createService";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import {
  CreateServiceFormData,
  createServiceSchema,
} from "@/schemas/create-service.schema";

type CategoryProps = {
  id: string;
  name: string;
};

type CreateServiceFormProps = {
  categories: CategoryProps[];
};

export default function CreateServiceForm({
  categories,
}: CreateServiceFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateServiceFormData>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      categoryId: "",
      title: "",
      description: "",
      price: 0,
      priceType: "HOURLY",
      estimatedDuration: 60,
      thumbnail: "",
      isAvailable: true,
    },
  });

  const isAvailable = watch("isAvailable");

  const onSubmit = async (
    data: CreateServiceFormData
  ) => {
    try {
      const result = await createService(data);

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success("Service created successfully!");

      router.push("/technician-dashboard/services");
      router.refresh();
    } catch (error) {
      toast.error("Failed to create service", {
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Create New Service
          </CardTitle>

          <CardDescription>
            Fill in the information below to publish your
            service.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                Category
              </Label>

              <select
                id="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...register("categoryId")}
              >
                <option value="">
                  Select a Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

              {errors.categoryId && (
                <p className="text-sm text-destructive">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Service Title
              </Label>

              <Input
                id="title"
                placeholder="Complete House Wiring"
                {...register("title")}
              />

              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description
              </Label>

              <Textarea
                id="description"
                rows={5}
                placeholder="Describe your service..."
                {...register("description")}
              />

              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">
                Price
              </Label>

              <Input
                id="price"
                type="number"
                placeholder="50"
                {...register("price", {
                  valueAsNumber: true,
                })}
              />

              {errors.price && (
                <p className="text-sm text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Price Type */}
            <div className="space-y-2">
              <Label htmlFor="priceType">
                Price Type
              </Label>

              <select
                id="priceType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...register("priceType")}
              >
                <option value="HOURLY">
                  Hourly
                </option>

                <option value="FIXED">
                  Fixed
                </option>
              </select>

              {errors.priceType && (
                <p className="text-sm text-destructive">
                  {errors.priceType.message}
                </p>
              )}
            </div>

            {/* Estimated Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">
                Estimated Duration (minutes)
              </Label>

              <Input
                id="duration"
                type="number"
                placeholder="60"
                {...register(
                  "estimatedDuration",
                  {
                    valueAsNumber: true,
                  }
                )}
              />

              {errors.estimatedDuration && (
                <p className="text-sm text-destructive">
                  {
                    errors.estimatedDuration
                      .message
                  }
                </p>
              )}
            </div>

            {/* Thumbnail */}
            <div className="space-y-2">
              <Label htmlFor="thumbnail">
                Thumbnail URL
              </Label>

              <Input
                id="thumbnail"
                placeholder="https://example.com/image.jpg"
                {...register("thumbnail")}
              />

              {errors.thumbnail && (
                <p className="text-sm text-destructive">
                  {errors.thumbnail.message}
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label>
                  Available
                </Label>

                <p className="text-sm text-muted-foreground">
                  Customers can book this
                  service.
                </p>
              </div>

              <Switch
                checked={isAvailable}
                onCheckedChange={(checked) =>
                  setValue(
                    "isAvailable",
                    checked
                  )
                }
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Creating Service..."
                : "Create Service"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}