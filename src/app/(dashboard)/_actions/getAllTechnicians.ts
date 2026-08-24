'use server';

export interface GetAllTechniciansParams {
  page?: number;
  limit?: number;
}

// Shape returned directly by https://fixit-now-backend.vercel.app/api/technicians
export interface Technician {
  id: string;
  userId: string;
  bio: string | null;
  skills: string[];
  experience: number;
  hourlyRate: number;
  location: string;
  totalReviews: number;
  averageRating: number;
  availability: Record<string, unknown>;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    email: string;
    status: string;
  };
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface GetAllTechniciansResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Technician[];
  meta: PaginationMeta;
}

export async function getAllTechnicians(
  filters: GetAllTechniciansParams = {}
): Promise<GetAllTechniciansResponse> {
  try {
    const params = new URLSearchParams();
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technicians?${params.toString()}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || 'Failed to fetch technicians.');
    }

    return result;
  } catch (error) {
    console.error('Error fetching technicians:', error);

    return {
      success: false,
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Something went wrong.',
      data: [],
      meta: {
        page: filters.page ?? 1,
        limit: filters.limit ?? 10,
        total: 0,
        totalPage: 0,
      },
    };
  }
}
