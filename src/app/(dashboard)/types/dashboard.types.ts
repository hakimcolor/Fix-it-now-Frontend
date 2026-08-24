export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';
  /** API returns `status` field */
  status?: 'ACTIVE' | 'INACTIVE' | 'BANNED' | string;
  /** Some older responses use activeStatus */
  activeStatus?: 'ACTIVE' | 'INACTIVE' | string;
  userStatus?: string | null;
  isVerified?: boolean;
  profilePhoto?: string | null;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  technicianProfile?: null;
}

export interface ApiResponse {
  data?: IUserProfile | null;
  message: string;
  statusCode?: number;
  success: boolean;
}
