/**
 * ============================================================================
 * 🏥 AVEN CLINIC / SANCTUARY HEALTH - SUPABASE DATABASE TYPE DEFINITIONS
 * Reflects public schema tables, views, and relations.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. RBAC (Roles & Permissions)
// ----------------------------------------------------------------------------

export interface DatabasePermission {
  id: number;
  icon?: string | null;
  name: string;
  route?: string | null;
  code: string;
  visible: boolean;
  parent_id?: number | null;
  position?: number | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

export interface DatabaseRole {
  id: number;
  name: string;
  description?: string | null;
  status: 'activo' | 'inactivo';
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

export interface DatabasePermissionByRole {
  id: number;
  permission_id: number;
  role_id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

export interface DatabaseRoleByUser {
  id: number;
  role_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

// ----------------------------------------------------------------------------
// 2. Users (Staff / Doctors / Admins)
// ----------------------------------------------------------------------------

export interface DatabaseUser {
  id: number;
  auth_user_uid?: string | null;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string | null;
  status: 'activo' | 'inactivo' | 'suspendido';
  avatar_url?: string | null;
  working_days?: string[] | null; // e.g. ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
  start_time?: string | null;     // '08:00:00'
  end_time?: string | null;       // '18:00:00'
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

// ----------------------------------------------------------------------------
// 3. Specialties
// ----------------------------------------------------------------------------

export interface DatabaseSpecialty {
  id: number;
  name: string;
  description?: string | null;
  status: 'activo' | 'inactivo';
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

export interface DatabaseUserSpecialty {
  id: number;
  user_id: number;
  specialty_id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

// ----------------------------------------------------------------------------
// 4. Geography & Locations
// ----------------------------------------------------------------------------

export interface DatabaseCountry {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

export interface DatabaseState {
  id: number;
  country_id?: number | null;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

export interface DatabaseCity {
  id: number;
  state_id?: number | null;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

export interface DatabaseDistrict {
  id: number;
  district_id?: number | null;
  state_id?: number | null;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

// ----------------------------------------------------------------------------
// 5. Patients (Customer) & Emergency Contacts
// ----------------------------------------------------------------------------

export interface DatabaseCustomer {
  id: number;
  mrn?: string | null; // Medical Record Number e.g. "PT-88231"
  firstname: string;
  lastname: string;
  phone?: string | null;
  email?: string | null;
  birthday?: string | null; // 'YYYY-MM-DD'
  gender?: string | null;   // 'Male' | 'Female' | 'Other'
  status: 'activo' | 'inactivo';
  urgency_level?: 'Normal' | 'Urgent' | 'Critical';
  blood_type?: string | null; // 'O+', 'A-', etc.
  allergies?: string[] | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

export interface DatabaseEmergencyContact {
  id: number;
  customer_id: number;
  name: string;
  phone: string;
  relationship?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

export interface DatabaseAddress {
  id: number;
  id_customer?: number | null;
  name?: string | null;
  address_line?: string | null;
  district_id?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

export interface DatabaseAssistantAddress {
  id: number;
  id_user: number;
  address_line?: string | null;
  district_id?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
  created_by?: number | null;
  updated_by?: number | null;
}

// ----------------------------------------------------------------------------
// 6. Clinical Services & Appointments (Agenda)
// ----------------------------------------------------------------------------

export type ServiceStatus =
  | 'programado'
  | 'confirmado'
  | 'en_camino'
  | 'en_progreso'
  | 'completado'
  | 'cancelado';

export interface DatabaseService {
  id: number;
  customer_id?: number | null;
  user_id?: number | null;
  description?: string | null;
  address_id?: number | null;
  days_of_week?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  frequency?: string | null;
  status: ServiceStatus;
  is_recurrent: boolean;
  specialty_id?: number | null;
  omitted_dates?: string | null;
  recurrence_end_type: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

export interface DatabaseAgenda {
  id: number;
  service_id?: number | null;
  customer_id?: number | null;
  user_id?: number | null;
  address_id?: number | null;
  description?: string | null;
  date?: string | null; // 'YYYY-MM-DD'
  start_time?: string | null;
  end_time?: string | null;
  status?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

// ----------------------------------------------------------------------------
// 7. Billing & Transactions
// ----------------------------------------------------------------------------

export interface DatabasePaymentMethod {
  id: number;
  name: string;
  description?: string | null;
  status: 'activo' | 'inactivo';
  created_at: string;
  updated_at: string;
}

export interface DatabaseTransaction {
  id: number;
  customer_id: number;
  service_id?: number | null;
  amount: number;
  status: 'Completado' | 'Pendiente' | 'Cancelado';
  description?: string | null;
  transaction_date: string;
  created_at: string;
  updated_at: string;
}

export interface DatabasePayment {
  id: number;
  service_id?: number | null;
  customer_id?: number | null;
  payment_method_id?: number | null;
  amount: number;
  payment_date: string;
  status: string;
  reference_code?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  created_by?: number | null;
}

// ----------------------------------------------------------------------------
// 8. System Parameters & Clinical Practice Settings
// ----------------------------------------------------------------------------

export interface DatabaseSystemParameter {
  id: number;
  code: string;
  name: string;
  value: string;
  helper?: string | null;
  category: 'general' | 'billing' | 'agenda' | 'clinical' | string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

// ----------------------------------------------------------------------------
// 9. Clinical Convenience Views (Domain Aliases)
// ----------------------------------------------------------------------------

export interface PatientViewModel {
  id: number;
  mrn: string;
  firstname: string;
  lastname: string;
  full_name: string;
  email?: string | null;
  phone?: string | null;
  birthday?: string | null;
  gender?: string | null;
  status: string;
  urgency_level: 'Normal' | 'Urgent' | 'Critical';
  blood_type?: string | null;
  allergies?: string[] | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AppointmentViewModel {
  id: number;
  service_id?: number | null;
  customer_id?: number | null;
  patient_name?: string | null;
  patient_email?: string | null;
  patient_avatar?: string | null;
  urgency_level?: string | null;
  doctor_id?: number | null;
  doctor_name?: string | null;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  description?: string | null;
  specialty_name?: string | null;
  room_or_address?: string | null;
}

export interface StaffViewModel {
  id: number;
  auth_user_uid?: string | null;
  firstname: string;
  lastname: string;
  full_name: string;
  email: string;
  phone?: string | null;
  status: string;
  avatar_url?: string | null;
  working_days?: string[] | null;
  start_time?: string | null;
  end_time?: string | null;
  role_name?: string | null;
  specialty_name?: string | null;
}
