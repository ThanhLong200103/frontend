import api from "@/lib/api";
import { authStore } from "@/stores/authStore";

export default async function logout() {
    await api.post("/api/auth/logout");
    authStore.getState().logout();
    localStorage.removeItem("roles");
};
