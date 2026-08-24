'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface TechnicianProfile {
  id: string;
  userId: string;
  bio: string | null;
  skills: string[];
  experience: number;
  hourlyRate: number;
  location: string;
  totalReviews: number;
  averageRating: number;
  isVerified: boolean;
  availability: Record<string, string[]>;
  createdAt: string;
  updatedAt: string;
  user?: { name: string; email: string; status: string };
}

/**
 * /api/auth/me returns no technicianProfile field.
 * We resolve the technician row by matching userId against the technicians list.
 */
export async function getMyTechnicianProfile(): Promise<TechnicianProfile | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    if (!accessToken) return null;

    // 1. Get current user id
    const meRes = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });
    if (!meRes.ok) return null;
    const me = await meRes.json();
    const userId: string | undefined = me?.data?.id;
    if (!userId) return null;

    // 2. Find the technician row where userId matches
    const techRes = await fetch(`${API_URL}/api/technicians?limit=100`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });
    if (!techRes.ok) return null;
    const techData = await techRes.json();
    const list: TechnicianProfile[] = techData?.data ?? [];

    return list.find((t) => t.userId === userId) ?? null;
  } catch (error) {
    console.error('getMyTechnicianProfile error:', error);
    return null;
  }
}
