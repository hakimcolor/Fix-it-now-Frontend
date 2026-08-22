"use server";

import { ActiveStatus } from "../_components/UserActionsInAdmindeshboard";

export interface GetAllTechniciansParams {
  page?: number;
  limit?: number;
  city?: string;
  profession?: string;
  isAvailable?: boolean;
  isApproved?: boolean;
  minRating?: number;
  minExperience?: number;
  maxHourlyRate?: number;
}

export interface TechnicianProfile {
  id: string;
  userId: string;
  bio: string | null;
  profilePhoto: string;
  description: string | null;
  profession: string | null;
  skills: string[] | null;
  yearsOfExperience: number | null;
  hourlyRate: number | null;
  averageRating: number;
  totalReviews: number;
  totalCompletedJobs: number;
  isAvailable: boolean;
  responseTime: string | null;
  isApproved: boolean;
  address: string | null;
  city: string | null;
  district: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  activeStatus: "ACTIVE" | "BLOCKED" | "BAN" | "UNBAN";
  role: "TECHNICIAN";
  isVerified: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  technicianProfile: TechnicianProfile;
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

    // Pagination
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    // Filters
    if (filters.city) params.append("city", filters.city);
    if (filters.profession)
      params.append("profession", filters.profession);

    if (filters.isAvailable !== undefined)
      params.append("isAvailable", String(filters.isAvailable));

    if (filters.isApproved !== undefined)
      params.append("isApproved", String(filters.isApproved));

    if (filters.minRating !== undefined)
      params.append("minRating", filters.minRating.toString());

    if (filters.minExperience !== undefined)
      params.append("minExperience", filters.minExperience.toString());

    if (filters.maxHourlyRate !== undefined)
      params.append("maxHourlyRate", filters.maxHourlyRate.toString());

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technicians?${params.toString()}`,
      {
        method: "GET",
        next: {
          tags: ["technicians"],
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch technicians.");
    }

    return result;
  } catch (error) {
    console.error("Error fetching technicians:", error);

    return {
      success: false,
      statusCode: 500,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
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