export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';
  activeStatus: 'ACTIVE' | 'INACTIVE';
  userStatus: string | null;
  isVerified: boolean;
  profilePhoto?: string | null;
  lastLoginAt: string;
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
