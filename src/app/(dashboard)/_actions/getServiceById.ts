"use server";


export interface IServiceDetails {
  id: string;
  technicianId: string;
  categoryId: string;
  title: string;
  description: string;
  price: string;
  priceType: "FIXED" | "HOURLY";
  estimatedDuration: number;
  thumbnail: string;
  isAvailable: boolean;
  averageRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
    icon: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  bookingSlots: [];
}

interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IServiceDetails;
}

export const getServiceById = async (
  serviceId: string
): Promise<IServiceDetails | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceId}`,
      {
        method: "GET",
        next: {
          tags: [`service-${serviceId}`],
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch service.");
    }

    const result: ApiResponse = await res.json();


    return result.data;
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
};