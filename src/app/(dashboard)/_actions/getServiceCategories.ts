'use server';

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
}

// Fetches /api/categories (all admin-created categories) for the create service form.
export async function getServiceCategories(): Promise<ServiceCategory[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      { cache: 'no-store' }
    );

    if (!res.ok) return [];

    const result = await res.json();
    const categories: ServiceCategory[] = (result?.data ?? []).map(
      (cat: ServiceCategory) => ({
        id: cat.id,
        name: cat.name,
        description: cat.description ?? '',
      })
    );

    return categories;
  } catch {
    return [];
  }
}
