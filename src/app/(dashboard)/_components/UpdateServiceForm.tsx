

// import { Category } from "../types/cetegoryProps";
// import { IServiceDetails } from "../_actions/getServiceById";
// import { updateService, UpdateServicePayload } from "../_actions/updateService";


// export interface UpdateServiceFormProps {
//   serviceId: string;
//   categories: Category[];
//   service: IServiceDetails | null;
// }

// export default async function UpdateServiceForm({
//   serviceId,
//   categories,
//   service,
// }: UpdateServiceFormProps) {
//   const payload= {
//   "categoryId": "04540e3c-0531-49c4-8e3e-27877f81b159",
//   "serviceId": "8a2c0342-22d7-43dd-831f-796411a37702",
//   "title": "update5: Professional AC Repair Service",
//   "description": "Expert air conditioner repair, maintenance, and troubleshooting for all brands.",
//   "price": 1500,
//   "priceType": "FIXED",
//   "estimatedDuration": 120,
//   "thumbnail": "https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
//   "isAvailable": true
// }

//   // console.log("Services____________________ form updateServiceFROM", service, );
//   console.log("categories____________________ form updateServiceFROM", categories, );
  
//   const technicianId= service?.technicianId as string;
  
//   const updatedService = await updateService(technicianId, payload as UpdateServicePayload);
//   console.log("updatedService____________________ form updateServiceFROM", updatedService, );
  

 





//   return (
//     <div>
//       <h1>Update Service {serviceId}</h1>
//                 <h2 >
//                   Select a Category
//                 </h2>

//                 {categories.map((category) => (
//                   <p
//                     key={category.id}
//                     // value={category.id}
//                   >
//                     {category.name}
//                   </p>
//                 ))}
//     </div>
//   );
// }















// "use client";

// import { useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";

// import { Category } from "../types/cetegoryProps";
// import { IServiceDetails } from "../_actions/getServiceById";
// import {
//   updateService,
//   UpdateServicePayload,
// } from "../_actions/updateService";

// const updateServiceSchema = z.object({
//   categoryId: z.string().min(1, "Category is required"),
//   title: z.string().min(3, "Title is required"),
//   description: z.string().min(10, "Description is required"),
//   price: z.coerce.number().min(0, "Price must be a positive number"),
//   priceType: z.enum(["FIXED", "HOURLY"]),
//   estimatedDuration: z.coerce.number().min(1),
//   thumbnail: z.string().url("Enter a valid image URL"),
//   isAvailable: z.boolean(),
// });

// type FormValues = z.infer<typeof updateServiceSchema>;

// export interface UpdateServiceFormProps {
//   serviceId: string;
//   categories: Category[];
//   service: IServiceDetails | null;
// }

// export default function UpdateServiceForm({
//   serviceId,
//   categories,
//   service,
// }: UpdateServiceFormProps) {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>({
//     resolver: zodResolver(updateServiceSchema),
//     defaultValues: {
//       categoryId: service?.categoryId ?? "",
//       title: service?.title ?? "",
//       description: service?.description ?? "",
//       price: service?.price ?? 0,
//       priceType: service?.priceType ?? "FIXED",
//       estimatedDuration: service?.estimatedDuration ?? 0,
//       thumbnail: service?.thumbnail ?? "",
//       isAvailable: service?.isAvailable ?? true,
//     },
//   });

//   const onSubmit = (data: FormValues) => {
//     startTransition(async () => {
//       try {
//         const payload: UpdateServicePayload = {
//           ...data,
//           serviceId,
//         };

//         const result = await updateService(
//           service!.technicianId,
//           payload
//         );

//         console.log(result);

//         toast.success("Service updated successfully");

//         router.refresh();
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to update service");
//       }
//     });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="mx-auto max-w-3xl space-y-6 rounded-lg border p-6"
//     >
//       <h1 className="text-3xl font-bold">Update Service</h1>

//       {/* Category */}
//       <div>
//         <label className="mb-2 block font-medium">Category</label>

//         <select
//           {...register("categoryId")}
//           className="w-full rounded-md border p-3"
//         >
//           <option value="">Select Category</option>

//           {categories.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </select>

//         <p className="text-sm text-red-500">
//           {errors.categoryId?.message}
//         </p>
//       </div>

//       {/* Title */}
//       <div>
//         <label className="mb-2 block font-medium">Title</label>

//         <input
//           {...register("title")}
//           className="w-full rounded-md border p-3"
//         />

//         <p className="text-sm text-red-500">
//           {errors.title?.message}
//         </p>
//       </div>

//       {/* Description */}
//       <div>
//         <label className="mb-2 block font-medium">
//           Description
//         </label>

//         <textarea
//           rows={5}
//           {...register("description")}
//           className="w-full rounded-md border p-3"
//         />

//         <p className="text-sm text-red-500">
//           {errors.description?.message}
//         </p>
//       </div>

//       {/* Price */}
//       <div>
//         <label className="mb-2 block font-medium">Price</label>

//         <input
//           type="number"
//           {...register("price")}
//           className="w-full rounded-md border p-3"
//         />

//         <p className="text-sm text-red-500">
//           {errors.price?.message}
//         </p>
//       </div>

//       {/* Price Type */}
//       <div>
//         <label className="mb-2 block font-medium">
//           Price Type
//         </label>

//         <select
//           {...register("priceType")}
//           className="w-full rounded-md border p-3"
//         >
//           <option value="FIXED">Fixed</option>
//           <option value="HOURLY">Hourly</option>
//         </select>
//       </div>

//       {/* Duration */}
//       <div>
//         <label className="mb-2 block font-medium">
//           Estimated Duration (Minutes)
//         </label>

//         <input
//           type="number"
//           {...register("estimatedDuration")}
//           className="w-full rounded-md border p-3"
//         />

//         <p className="text-sm text-red-500">
//           {errors.estimatedDuration?.message}
//         </p>
//       </div>

//       {/* Thumbnail */}
//       <div>
//         <label className="mb-2 block font-medium">
//           Thumbnail URL
//         </label>

//         <input
//           {...register("thumbnail")}
//           className="w-full rounded-md border p-3"
//         />

//         <p className="text-sm text-red-500">
//           {errors.thumbnail?.message}
//         </p>
//       </div>

//       {/* Available */}
//       <div className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           {...register("isAvailable")}
//         />

//         <label>Available</label>
//       </div>

//       <button
//         type="submit"
//         disabled={isPending}
//         className="rounded bg-orange-500 px-5 py-3 font-medium text-white disabled:opacity-50"
//       >
//         {isPending ? "Updating..." : "Update Service"}
//       </button>
//     </form>
//   );
// }



















































"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { Category } from "../types/cetegoryProps";
import { IServiceDetails } from "../_actions/getServiceById";
import {
  updateService,
  UpdateServicePayload,
} from "../_actions/updateService";

type FormValues = {
  categoryId: string;
  title: string;
  description: string;
  price: number;
  priceType: "FIXED" | "HOURLY";
  estimatedDuration: number;
  thumbnail: string;
  isAvailable: boolean;
};

export interface UpdateServiceFormProps {
  serviceId: string;
  categories: Category[];
  service: IServiceDetails | null;
}

export default function UpdateServiceForm({
  serviceId,
  categories,
  service,
}: UpdateServiceFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      categoryId: service?.categoryId ?? "",
      title: service?.title ?? "",
      description: service?.description ?? "",
      price: Number(service?.price) ?? 0,
      priceType: service?.priceType ?? "FIXED",
      estimatedDuration: Number(service?.estimatedDuration) ?? 0,
      thumbnail: service?.thumbnail ?? "",
      isAvailable: service?.isAvailable ?? true,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    startTransition(async () => {
      try {
        const payload: UpdateServicePayload = {
          ...data,
          serviceId,
        };

        const result = await updateService(
          service!.technicianId,
          payload
        );

        // console.log(result);

        toast.success("Service updated successfully");

        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Failed to update service");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-3xl space-y-6 rounded-lg border p-6"
    >
      <h1 className="text-3xl font-bold">Update Service</h1>

      {/* Category */}
      <div>
        <label className="mb-2 block font-medium">Category</label>

        <select
          {...register("categoryId")}
          className="w-full rounded-md border p-3"
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <p className="text-sm text-red-500">
          {errors.categoryId?.message}
        </p>
      </div>

      {/* Title */}
      <div>
        <label className="mb-2 block font-medium">Title</label>

        <input
          {...register("title")}
          className="w-full rounded-md border p-3"
        />

        <p className="text-sm text-red-500">
          {errors.title?.message}
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={5}
          {...register("description")}
          className="w-full rounded-md border p-3"
        />

        <p className="text-sm text-red-500">
          {errors.description?.message}
        </p>
      </div>

      {/* Price */}
      <div>
        <label className="mb-2 block font-medium">Price</label>

        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          className="w-full rounded-md border p-3"
        />

        <p className="text-sm text-red-500">
          {errors.price?.message}
        </p>
      </div>

      {/* Price Type */}
      <div>
        <label className="mb-2 block font-medium">
          Price Type
        </label>

        <select
          {...register("priceType")}
          className="w-full rounded-md border p-3"
        >
          <option value="FIXED">Fixed</option>
          <option value="HOURLY">Hourly</option>
        </select>
      </div>

      {/* Duration */}
      <div>
        <label className="mb-2 block font-medium">
          Estimated Duration (Minutes)
        </label>

        <input
          type="number"
          {...register("estimatedDuration", { valueAsNumber: true })}
          className="w-full rounded-md border p-3"
        />

        <p className="text-sm text-red-500">
          {errors.estimatedDuration?.message}
        </p>
      </div>

      {/* Thumbnail */}
      <div>
        <label className="mb-2 block font-medium">
          Thumbnail URL
        </label>

        <input
          {...register("thumbnail")}
          className="w-full rounded-md border p-3"
        />

        <p className="text-sm text-red-500">
          {errors.thumbnail?.message}
        </p>
      </div>

      {/* Available */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("isAvailable")}
        />

        <label>Available</label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-orange-500 px-5 py-3 font-medium text-white disabled:opacity-50"
      >
        {isPending ? "Updating..." : "Update Service"}
      </button>
    </form>
  );
}