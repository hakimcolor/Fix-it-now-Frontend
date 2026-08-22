

// {
//   "categoryId": "04540e3c-0531-49c4-8e3e-27877f81b159",
//   "serviceId": "8a2c0342-22d7-43dd-831f-796411a37702",
//   "title": "update4: Professional AC Repair Service",
//   "description": "Expert air conditioner repair, maintenance, and troubleshooting for all brands.",
//   "price": 1500,
//   "priceType": "FIXED",
//   "estimatedDuration": 120,
//   "thumbnail": "https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
//   "isAvailable": true
// }



// import UpdateServiceForm from "@/app/(dashboard)/_components/UpdateServiceForm";
// import { getAllCategories } from "@/app/(public)/_actions/getAllCategories";

// interface Props {
//   params: Promise<{
//     serviceId: string;
//   }>;
// }

// export default async function ServiceEditPage({ params }: Props) {
//   // const { id } = await params;
// const { serviceId } = await params;
//   const result = await getAllCategories();

//   console.log("Service ID:", serviceId);
//   console.log("Categories:", result.data);

//   return <div>
//   <UpdateServiceForm
//     serviceId={serviceId}
//     categories={result.data ?? []}
//     />
  
//   </div>;
// }

































import { getServiceById } from "@/app/(dashboard)/_actions/getServiceById";
import UpdateServiceForm from "@/app/(dashboard)/_components/UpdateServiceForm";
import { getAllCategories } from "@/app/(public)/_actions/getAllCategories";

type Props = {
  params: Promise<{
    serviceId: string;
  }>;
};

export default async function ServiceEditPage({ params }: Props) {
  const { serviceId } = await params;

  const result = await getAllCategories();
  const service = await getServiceById(serviceId);

// console.log(service);

  return (
    <UpdateServiceForm
      serviceId={serviceId}
      categories={result.data ?? []}
      service={service}
    />
  );
}