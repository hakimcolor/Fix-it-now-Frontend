'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllServicesss = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
} = {}) => {
  try {
    const params = new URLSearchParams();

    const get = (v: string | string[] | undefined) =>
      Array.isArray(v) ? v[0] : v;

    const searchTerm = get(query?.searchTerm);
    const categoryId = get(query?.categoryId);
    const minRating = get(query?.minRating);
    const page = get(query?.page);
    const limit = get(query?.limit);

    if (searchTerm) params.set('searchTerm', searchTerm);
    if (categoryId) params.set('categoryId', categoryId);
    if (minRating) params.set('minRating', minRating);
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);

    const url = `${API_URL}/api/services${params.size ? `?${params}` : ''}`;

    const res = await fetch(url, { cache: 'no-store' });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        data: [],
        meta: null,
        message: result?.message || 'Failed to fetch services',
      };
    }

    return result;
  } catch (error) {
    console.error('getAllServicesss error:', error);
    return {
      success: false,
      data: [],
      meta: null,
      message: 'Failed to fetch services',
    };
  }
};
