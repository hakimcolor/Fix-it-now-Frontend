
export type BackendUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
  status: string;
  authProvider: string;
  isVerified: boolean;
  profilePhoto?: string | null;
  password?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
};

export type GoogleLoginSuccess = {
  message: string;
  user: BackendUser;
  accessToken: string;
  refreshToken: string;
};

export type GoogleAuthActionState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; data: GoogleLoginSuccess };
