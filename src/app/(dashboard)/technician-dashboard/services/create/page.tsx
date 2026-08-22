

import CreateServiceForm from "@/app/(dashboard)/_components/CreateServiceForm";
import { getAllCategories } from "@/app/(public)/_actions/getAllCategories";



export default async function ServiceCreatePage() {
    const result = await getAllCategories();

    // console.log("Fetched categories:", result.data);
    return (
        <div className="mx-auto max-w-4xl space-y-6">
        <CreateServiceForm
          categories={result.data ?? []}
        />

        </div>
    );
}