


export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  activeStatus: "ACTIVE" | "INACTIVE";
  userStatus: string | null;
  isVerified: boolean;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
  technicianProfile?: null;
}

export interface ApiResponse {
  data: {
    profile: IUserProfile;
  };
  message: string;
  statusCode: number;
  success: boolean;
}