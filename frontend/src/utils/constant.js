// ✅ Unified API base URL setup
const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "https://ignitex-e9n0.onrender.com";

// ✅ Log backend being used
console.log("🔧 Using backend base URL:", BACKEND_BASE_URL);

// ✅ Export all endpoints consistently
export const USER_API_END_POINT = `${BACKEND_BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${BACKEND_BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${BACKEND_BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${BACKEND_BASE_URL}/api/v1/company`;
