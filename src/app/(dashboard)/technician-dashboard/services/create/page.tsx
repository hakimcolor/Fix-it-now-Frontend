import CreateServiceForm from '@/app/(dashboard)/_components/CreateServiceForm';
import { getServiceCategories } from '@/app/(dashboard)/_actions/getServiceCategories';

export default async function ServiceCreatePage() {
  const categories = await getServiceCategories();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <CreateServiceForm categories={categories} />
    </div>
  );
}
