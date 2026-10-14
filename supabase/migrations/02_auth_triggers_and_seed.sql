-- ==============================================================================
-- 🏥 AVEN CLINIC / SANCTUARY HEALTH - AUTH TRIGGERS & SEED DATA
-- Migration 02: Auth synchronization, trigger helpers, and clinical seed records
-- ==============================================================================

-- 1. AUTOMATIC UPDATED_AT TIMESTAMP TRIGGER
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_users_updated_at') THEN
    CREATE TRIGGER set_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_customer_updated_at') THEN
    CREATE TRIGGER set_customer_updated_at BEFORE UPDATE ON public.customer FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_service_updated_at') THEN
    CREATE TRIGGER set_service_updated_at BEFORE UPDATE ON public.service FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_agenda_updated_at') THEN
    CREATE TRIGGER set_agenda_updated_at BEFORE UPDATE ON public.agenda FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
  END IF;
END $$;

-- ==============================================================================
-- 2. AUTH.USERS -> PUBLIC.USERS SYNCHRONIZATION TRIGGER
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_user_id integer;
  v_default_role_id integer;
  v_first_name text;
  v_last_name text;
BEGIN
  -- Extract first and last name from raw_user_meta_data
  v_first_name := COALESCE(
    NEW.raw_user_meta_data->>'firstname',
    NEW.raw_user_meta_data->>'first_name',
    split_part(NEW.raw_user_meta_data->>'full_name', ' ', 1),
    split_part(NEW.raw_user_meta_data->>'name', ' ', 1),
    'Doctor'
  );

  v_last_name := COALESCE(
    NEW.raw_user_meta_data->>'lastname',
    NEW.raw_user_meta_data->>'last_name',
    NULLIF(substr(NEW.raw_user_meta_data->>'full_name', length(v_first_name) + 2), ''),
    ''
  );

  -- Insert or update in public.users
  INSERT INTO public.users (
    auth_user_uid,
    firstname,
    lastname,
    email,
    phone,
    status,
    avatar_url,
    working_days,
    start_time,
    end_time
  )
  VALUES (
    NEW.id,
    v_first_name,
    v_last_name,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', NEW.phone, ''),
    'activo',
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', NULL),
    '["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]'::jsonb,
    '08:00:00'::time,
    '18:00:00'::time
  )
  ON CONFLICT (email) DO UPDATE SET
    auth_user_uid = EXCLUDED.auth_user_uid,
    firstname = COALESCE(public.users.firstname, EXCLUDED.firstname),
    lastname = COALESCE(public.users.lastname, EXCLUDED.lastname),
    avatar_url = COALESCE(public.users.avatar_url, EXCLUDED.avatar_url),
    updated_at = CURRENT_TIMESTAMP
  RETURNING id INTO v_user_id;

  -- Default role assignment: Administrator if first user, else Doctor
  SELECT id INTO v_default_role_id FROM public.role WHERE name ILIKE '%Doctor%' OR name ILIKE '%Specialist%' ORDER BY id LIMIT 1;
  IF v_default_role_id IS NULL THEN
    SELECT id INTO v_default_role_id FROM public.role ORDER BY id LIMIT 1;
  END IF;

  IF v_user_id IS NOT NULL AND v_default_role_id IS NOT NULL THEN
    INSERT INTO public.role_by_users (role_id, user_id)
    VALUES (v_default_role_id, v_user_id)
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==============================================================================
-- 3. SEED DATA: GEOGRAPHY (COUNTRIES, STATES, CITIES, DISTRICTS)
-- ==============================================================================

INSERT INTO public.country (id, name) VALUES
  (1, 'United States'),
  (2, 'Mexico'),
  (3, 'Canada')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.state (id, country_id, name) VALUES
  (1, 1, 'California'),
  (2, 1, 'New York'),
  (3, 1, 'Texas'),
  (4, 1, 'Florida')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.city (id, state_id, name) VALUES
  (1, 1, 'San Francisco'),
  (2, 1, 'Los Angeles'),
  (3, 2, 'New York City'),
  (4, 3, 'Austin'),
  (5, 4, 'Miami')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.district (id, district_id, state_id, name) VALUES
  (1, 1, 1, 'Downtown Financial'),
  (2, 1, 1, 'Mission Medical District'),
  (3, 1, 1, 'Pacific Heights Clinic Zone'),
  (4, 2, 1, 'Beverly Hills Medical Plaza'),
  (5, 3, 2, 'Manhattan Health Corridor')
ON CONFLICT (id) DO NOTHING;

-- Reset sequences for geography
SELECT setval('public.country_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.country));
SELECT setval('public.state_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.state));
SELECT setval('public.city_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.city));
SELECT setval('public.district_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.district));

-- ==============================================================================
-- 4. SEED DATA: ROLES & PERMISSIONS (RBAC)
-- ==============================================================================

INSERT INTO public.role (id, name, description, status) VALUES
  (1, 'Administrator', 'Full clinical practice, staff management, financial billing and system administration privileges', 'activo'),
  (2, 'Doctor / Specialist', 'Clinical consultations, electronic health records, diagnosis, and patient agenda access', 'activo'),
  (3, 'Nurse / Triage Assistant', 'Patient intake triage, queue monitoring, vital signs recording and clinical support', 'activo'),
  (4, 'Receptionist / Front Desk', 'Front desk registration, appointment booking, patient check-in, and point of sale cashier', 'activo'),
  (5, 'Billing Specialist', 'Financial accounting, patient invoicing, payment processing, insurance claims, and audit', 'activo')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

INSERT INTO public.permissions (id, code, name, route, icon, visible, position) VALUES
  (1,  'dashboard.view',    'Practice Analytics & Live Queue', '/admin',                     'Activity',    true, 1),
  (2,  'agenda.view',       'Appointment Schedule',            '/admin/agenda',              'Calendar',    true, 2),
  (3,  'agenda.manage',     'Manage Appointments',             '/admin/agenda/manage',       'Clock',       true, 3),
  (4,  'patients.view',     'Patient Directory',               '/admin/patients',            'Users',       true, 4),
  (5,  'patients.manage',   'Create & Edit Patients',          '/admin/patients/manage',     'UserPlus',    true, 5),
  (6,  'staff.view',        'Clinical Staff Directory',        '/admin/staff',               'UserCheck',   true, 6),
  (7,  'staff.manage',      'Manage Doctors & Shifts',         '/admin/staff/manage',        'Briefcase',   true, 7),
  (8,  'billing.view',      'Transactions & Billing',          '/admin/billing',             'CreditCard',  true, 8),
  (9,  'analytics.view',    'Executive Clinical Analytics',    '/admin/analytics',           'BarChart3',   true, 9),
  (10, 'settings.view',     'Practice & System Settings',      '/admin/settings',            'Settings',    true, 10)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  route = EXCLUDED.route,
  icon = EXCLUDED.icon;

-- Map permissions to roles
-- Admin gets all permissions (1-10)
INSERT INTO public.permission_by_role (permission_id, role_id)
SELECT p.id, 1 FROM public.permissions p
ON CONFLICT DO NOTHING;

-- Doctor gets dashboard, agenda, patients
INSERT INTO public.permission_by_role (permission_id, role_id) VALUES
  (1, 2), (2, 2), (3, 2), (4, 2), (5, 2), (9, 2)
ON CONFLICT DO NOTHING;

-- Nurse gets dashboard, agenda, patients
INSERT INTO public.permission_by_role (permission_id, role_id) VALUES
  (1, 3), (2, 3), (4, 3), (5, 3)
ON CONFLICT DO NOTHING;

-- Receptionist gets agenda, patients, billing
INSERT INTO public.permission_by_role (permission_id, role_id) VALUES
  (1, 4), (2, 4), (3, 4), (4, 4), (5, 4), (8, 4)
ON CONFLICT DO NOTHING;

-- Billing specialist gets dashboard, billing, analytics
INSERT INTO public.permission_by_role (permission_id, role_id) VALUES
  (1, 5), (8, 5), (9, 5)
ON CONFLICT DO NOTHING;

SELECT setval('public.role_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.role));
SELECT setval('public.permissions_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.permissions));

-- ==============================================================================
-- 5. SEED DATA: CLINICAL SPECIALTIES
-- ==============================================================================

INSERT INTO public.specialty (id, name, description, status) VALUES
  (1, 'General Practice / Family Medicine', 'Comprehensive primary health care for patients of all ages', 'activo'),
  (2, 'Cardiology', 'Disorders of the heart and the cardiovascular circulatory system', 'activo'),
  (3, 'Dermatology', 'Diagnosis and treatment of skin, hair, and nail medical conditions', 'activo'),
  (4, 'Pediatrics', 'Specialized medical care for infants, children, and adolescents', 'activo'),
  (5, 'Neurology', 'Disorders and diseases of the nervous system, brain, and spinal cord', 'activo'),
  (6, 'Orthopedics & Sports Medicine', 'Care for bones, joints, ligaments, tendons, and muscles', 'activo'),
  (7, 'Internal Medicine', 'Prevention, diagnosis, and treatment of adult internal diseases', 'activo'),
  (8, 'Psychiatry & Mental Health', 'Diagnosis, prevention, and treatment of mental health disorders', 'activo')
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description;

SELECT setval('public.specialty_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.specialty));

-- ==============================================================================
-- 6. SEED DATA: PAYMENT METHODS
-- ==============================================================================

INSERT INTO public.payment_method (id, name, description, status) VALUES
  (1, 'Credit Card', 'Visa, MasterCard, American Express POS and online processing', 'activo'),
  (2, 'Debit Card', 'Direct checking account debit terminal card payment', 'activo'),
  (3, 'Cash', 'Physical currency payment collected at front desk checkout', 'activo'),
  (4, 'Health Insurance / Copay', 'Primary healthcare insurance policy coverage and patient co-payment', 'activo'),
  (5, 'Bank Transfer / Wire', 'Electronic ACH or direct clinic wire transfer', 'activo'),
  (6, 'Digital Wallet', 'Apple Pay, Google Pay, and contactless mobile payments', 'activo')
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description;

SELECT setval('public.payment_method_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.payment_method));

-- ==============================================================================
-- 7. SEED DATA: SYSTEM PARAMETERS & CLINIC CONFIGURATION
-- ==============================================================================

INSERT INTO public.system_parameters (code, name, value, helper, category) VALUES
  ('CLINIC_NAME', 'Practice Legal Name', 'Aven Clinic / Sanctuary Health', 'Official clinic branding name displayed across reports and receipts', 'general'),
  ('CLINIC_ADDRESS', 'Practice Physical Address', '742 Evergreen Terrace, Suite 100, San Francisco, CA 94107', 'Physical facility location for patient appointments', 'general'),
  ('CLINIC_PHONE', 'Main Contact Telephone', '+1 (415) 555-0199', 'Customer service and emergency hotline phone number', 'general'),
  ('CLINIC_EMAIL', 'Primary Clinic Email', 'support@avenclinic.com', 'Dispatch email for appointment confirmations and notifications', 'general'),
  ('CLINIC_TAX_ID', 'Federal Tax Identification (TIN/EIN)', 'US-94-2849182', 'Registered clinic tax ID for financial receipts and invoices', 'billing'),
  ('CURRENCY_CODE', 'Operational Currency Code', 'USD', 'Three-letter ISO currency code used in all financial records', 'billing'),
  ('CURRENCY_SYMBOL', 'Operational Currency Symbol', '$', 'Currency symbol prefix for UI financial dashboards', 'billing'),
  ('APPOINTMENT_SLOT_MINUTES', 'Default Consultation Slot Duration', '30', 'Standard duration in minutes for calendar agenda slot scheduling', 'agenda'),
  ('OPERATING_HOURS_START', 'Daily Operating Start Time', '07:00:00', 'Earliest clinical appointment slot allowed in the agenda', 'agenda'),
  ('OPERATING_HOURS_END', 'Daily Operating End Time', '20:00:00', 'Latest clinical appointment slot allowed in the agenda', 'agenda'),
  ('CANCELLATION_WINDOW_HOURS', 'Cancellation Notice Window', '24', 'Hours in advance required for penalty-free appointment cancellation', 'agenda'),
  ('PATIENT_QUEUE_AUTO_TRIAGE', 'Automatic Patient Queue Priority', 'true', 'Automatically prioritize patient waiting queue by clinical urgency level', 'clinical')
ON CONFLICT (code) DO UPDATE SET
  value = EXCLUDED.value,
  helper = EXCLUDED.helper,
  category = EXCLUDED.category;

SELECT setval('public.system_parameters_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.system_parameters));
