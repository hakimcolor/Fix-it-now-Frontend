import { getAdminCategories } from '../../_actions/adminCategories';
import AdminCategoriesClient from './AdminCategoriesClient';

export default async function AdminCategoriesPage() {
  const result = await getAdminCategories();
  const categories = result.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Service Categories</h1>
        <p className="text-muted-foreground">
          Manage service categories available on the platform.
        </p>
      </div>

      <AdminCategoriesClient categories={categories} />
    </div>
  );
}
