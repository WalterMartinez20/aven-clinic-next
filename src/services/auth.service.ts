import { createClient } from "@/lib/supabase/client";
import { AuthResponse, LoginCredentials } from "@/types/auth";
import { User, Session } from "@supabase/supabase-js";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Si son las credenciales demo, permitimos el acceso inmediatamente para evitar fallas si no están en Supabase
    if (credentials.email === "admin@sanctuary.com" && credentials.password === "admin123") {
      const mockUser = {
        id: "demo-admin-id",
        email: "admin@sanctuary.com",
        user_metadata: { full_name: "Admin Demo" }
      } as unknown as User;

      const mockSession = {
        access_token: "demo-token",
        user: mockUser
      } as unknown as Session;

      return { 
        user: mockUser, 
        session: mockSession
      };
    }

    const supabase = createClient();
    
    // Intentamos login con Supabase para otras credenciales personalizadas
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password || "",
    });

    if (error) {
      throw new Error(error.message);
    }

    return { user: data.user, session: data.session };
  },

  async logout(): Promise<void> {
    const supabase = createClient();
    await supabase.auth.signOut();
  },
};

