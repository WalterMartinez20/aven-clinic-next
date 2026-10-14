-- ==============================================================================
-- 🏥 AVEN CLINIC / SANCTUARY HEALTH - CLINICAL CORE DATABASE SCHEMA
-- Compatible with Supabase PostgreSQL & Next.js 16 Backend
-- ==============================================================================

-- 1. SEQUENCES SETUP
CREATE SEQUENCE IF NOT EXISTS public.permissions_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.role_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.users_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.permission_by_role_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.role_by_users_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.country_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.state_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.city_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.district_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.customer_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.address_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.specialty_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.user_specialty_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.service_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.agenda_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.emergency_contact_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.assistant_address_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.payment_method_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.payment_id_seq;
CREATE SEQUENCE IF NOT EXISTS public.system_parameters_id_seq;

-- ==============================================================================
-- 2. GEOGRAPHICAL & LOCATION TABLES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.country (
  id integer NOT NULL DEFAULT nextval('public.country_id_seq'::regclass),
  name character varying NOT NULL,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  CONSTRAINT country_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.state (
  id integer NOT NULL DEFAULT nextval('public.state_id_seq'::regclass),
  country_id integer,
  name character varying NOT NULL,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  CONSTRAINT state_pkey PRIMARY KEY (id),
  CONSTRAINT fk_state_country FOREIGN KEY (country_id) REFERENCES public.country(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS public.city (
  id integer NOT NULL DEFAULT nextval('public.city_id_seq'::regclass),
  state_id integer,
  name character varying NOT NULL,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  CONSTRAINT city_pkey PRIMARY KEY (id),
  CONSTRAINT fk_city_state FOREIGN KEY (state_id) REFERENCES public.state(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS public.district (
  id integer NOT NULL DEFAULT nextval('public.district_id_seq'::regclass),
  district_id integer,
  state_id integer,
  name character varying NOT NULL,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  CONSTRAINT district_pkey PRIMARY KEY (id),
  CONSTRAINT fk_district_city FOREIGN KEY (district_id) REFERENCES public.city(id) ON DELETE SET NULL,
  CONSTRAINT fk_district_state FOREIGN KEY (state_id) REFERENCES public.state(id) ON DELETE SET NULL
);

-- ==============================================================================
-- 3. RBAC (ROLES & PERMISSIONS)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.permissions (
  id integer NOT NULL DEFAULT nextval('public.permissions_id_seq'::regclass),
  icon character varying,
  name character varying NOT NULL,
  route character varying,
  code character varying NOT NULL UNIQUE,
  visible boolean DEFAULT true,
  parent_id integer,
  position integer,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  CONSTRAINT permissions_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.role (
  id integer NOT NULL DEFAULT nextval('public.role_id_seq'::regclass),
  name character varying NOT NULL,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  description text,
  status character varying DEFAULT 'activo'::character varying,
  CONSTRAINT role_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.permission_by_role (
  id integer NOT NULL DEFAULT nextval('public.permission_by_role_id_seq'::regclass),
  permission_id integer,
  role_id integer,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  CONSTRAINT permission_by_role_pkey PRIMARY KEY (id),
  CONSTRAINT fk_permission_by_role_permission FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE,
  CONSTRAINT fk_permission_by_role_role FOREIGN KEY (role_id) REFERENCES public.role(id) ON DELETE CASCADE
);

-- ==============================================================================
-- 4. CLINICAL USERS / STAFF MEMBERS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.users (
  id integer NOT NULL DEFAULT nextval('public.users_id_seq'::regclass),
  auth_user_uid uuid,
  firstname character varying,
  lastname character varying,
  email character varying UNIQUE,
  phone character varying,
  status character varying DEFAULT 'activo',
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  avatar_url text,
  working_days jsonb DEFAULT '["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]'::jsonb,
  start_time time without time zone DEFAULT '06:00:00'::time without time zone,
  end_time time without time zone DEFAULT '20:00:00'::time without time zone,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_auth_user_uid_fkey FOREIGN KEY (auth_user_uid) REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS public.role_by_users (
  id integer NOT NULL DEFAULT nextval('public.role_by_users_id_seq'::regclass),
  role_id integer,
  user_id integer,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  CONSTRAINT role_by_users_pkey PRIMARY KEY (id),
  CONSTRAINT fk_role_by_users_role FOREIGN KEY (role_id) REFERENCES public.role(id) ON DELETE CASCADE,
  CONSTRAINT role_by_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

-- ==============================================================================
-- 5. SPECIALTIES & PRACTITIONER MAPPING
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.specialty (
  id integer NOT NULL DEFAULT nextval('public.specialty_id_seq'::regclass),
  name character varying NOT NULL UNIQUE,
  description text,
  status character varying DEFAULT 'activo'::character varying,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  CONSTRAINT specialty_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.user_specialty (
  id integer NOT NULL DEFAULT nextval('public.user_specialty_id_seq'::regclass),
  user_id integer NOT NULL,
  specialty_id integer NOT NULL,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  CONSTRAINT user_specialty_pkey PRIMARY KEY (id),
  CONSTRAINT fk_user_specialty_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE,
  CONSTRAINT fk_user_specialty_specialty FOREIGN KEY (specialty_id) REFERENCES public.specialty(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.assistant_address (
  id integer NOT NULL DEFAULT nextval('public.assistant_address_id_seq'::regclass),
  id_user integer NOT NULL,
  address_line text,
  district_id integer,
  latitude numeric,
  longitude numeric,
  is_primary boolean NOT NULL DEFAULT false,
  created_by integer,
  updated_by integer,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT assistant_address_pkey PRIMARY KEY (id),
  CONSTRAINT assistant_address_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id) ON DELETE CASCADE,
  CONSTRAINT assistant_address_district_id_fkey FOREIGN KEY (district_id) REFERENCES public.district(id) ON DELETE SET NULL,
  CONSTRAINT assistant_address_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL,
  CONSTRAINT assistant_address_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE SET NULL
);

-- ==============================================================================
-- 6. PATIENTS (CUSTOMER) & EMERGENCY CONTACTS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.customer (
  id integer NOT NULL DEFAULT nextval('public.customer_id_seq'::regclass),
  firstname character varying,
  lastname character varying,
  phone character varying,
  email character varying,
  birthday date,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  status text NOT NULL DEFAULT 'activo'::text CHECK (status = ANY (ARRAY['activo'::text, 'inactivo'::text])),
  avatar_url text,
  -- Clinical extension fields for clinic management:
  mrn character varying UNIQUE,
  gender character varying,
  urgency_level character varying DEFAULT 'NORMAL' CHECK (urgency_level IN ('NORMAL', 'URGENT', 'CRITICAL')),
  blood_type character varying,
  allergies text,
  CONSTRAINT customer_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.emergency_contact (
  id integer NOT NULL DEFAULT nextval('public.emergency_contact_id_seq'::regclass),
  customer_id integer NOT NULL,
  name character varying NOT NULL,
  phone character varying NOT NULL,
  relationship character varying,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  CONSTRAINT emergency_contact_pkey PRIMARY KEY (id),
  CONSTRAINT fk_emergency_contact_customer FOREIGN KEY (customer_id) REFERENCES public.customer(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.address (
  id integer NOT NULL DEFAULT nextval('public.address_id_seq'::regclass),
  id_customer integer,
  name character varying,
  address_line text,
  district_id integer,
  latitude numeric,
  longitude numeric,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  is_primary boolean DEFAULT false,
  CONSTRAINT address_pkey PRIMARY KEY (id),
  CONSTRAINT fk_address_district FOREIGN KEY (district_id) REFERENCES public.district(id) ON DELETE SET NULL,
  CONSTRAINT fk_address_customer FOREIGN KEY (id_customer) REFERENCES public.customer(id) ON DELETE CASCADE
);

-- ==============================================================================
-- 7. CLINICAL SERVICES & APPOINTMENT AGENDA
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.service (
  id integer NOT NULL DEFAULT nextval('public.service_id_seq'::regclass),
  customer_id integer,
  user_id integer,
  description text,
  address_id integer,
  days_of_week character varying,
  start_date date,
  end_date date,
  start_time time without time zone,
  end_time time without time zone,
  frequency character varying,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  status character varying DEFAULT 'programado'::character varying CHECK (status::text = ANY (ARRAY['programado'::character varying, 'confirmado'::character varying, 'en_camino'::character varying, 'en_progreso'::character varying, 'completado'::character varying, 'cancelado'::character varying]::text[])),
  is_recurrent boolean DEFAULT false,
  specialty_id integer,
  omitted_dates text,
  recurrence_end_type text DEFAULT 'never'::text,
  CONSTRAINT service_pkey PRIMARY KEY (id),
  CONSTRAINT fk_service_customer FOREIGN KEY (customer_id) REFERENCES public.customer(id) ON DELETE SET NULL,
  CONSTRAINT fk_service_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL,
  CONSTRAINT fk_service_address FOREIGN KEY (address_id) REFERENCES public.address(id) ON DELETE SET NULL,
  CONSTRAINT fk_service_specialty FOREIGN KEY (specialty_id) REFERENCES public.specialty(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS public.agenda (
  id integer NOT NULL DEFAULT nextval('public.agenda_id_seq'::regclass),
  service_id integer,
  customer_id integer,
  user_id integer,
  address_id integer,
  description text,
  date date,
  start_time time without time zone,
  end_time time without time zone,
  status character varying DEFAULT 'Confirmed',
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  CONSTRAINT agenda_pkey PRIMARY KEY (id),
  CONSTRAINT fk_agenda_service FOREIGN KEY (service_id) REFERENCES public.service(id) ON DELETE CASCADE,
  CONSTRAINT fk_agenda_customer FOREIGN KEY (customer_id) REFERENCES public.customer(id) ON DELETE CASCADE,
  CONSTRAINT fk_agenda_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL,
  CONSTRAINT fk_agenda_address FOREIGN KEY (address_id) REFERENCES public.address(id) ON DELETE SET NULL
);

-- ==============================================================================
-- 8. BILLING, PAYMENTS & TRANSACTIONS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.payment_method (
  id integer NOT NULL DEFAULT nextval('public.payment_method_id_seq'::regclass),
  name character varying NOT NULL UNIQUE,
  description text,
  status character varying DEFAULT 'activo'::character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT payment_method_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.transactions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  customer_id bigint NOT NULL,
  service_id bigint,
  amount numeric NOT NULL DEFAULT 0.00,
  status character varying NOT NULL DEFAULT 'Completado'::character varying CHECK (status::text = ANY (ARRAY['Completado'::character varying, 'Pendiente'::character varying, 'Cancelado'::character varying]::text[])),
  description text,
  transaction_date timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT transactions_pkey PRIMARY KEY (id),
  CONSTRAINT fk_transaction_customer FOREIGN KEY (customer_id) REFERENCES public.customer(id) ON DELETE CASCADE,
  CONSTRAINT fk_transaction_service FOREIGN KEY (service_id) REFERENCES public.service(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS public.payment (
  id integer NOT NULL DEFAULT nextval('public.payment_id_seq'::regclass),
  service_id integer,
  customer_id integer,
  payment_method_id integer,
  amount numeric NOT NULL,
  payment_date timestamp with time zone DEFAULT now(),
  status character varying DEFAULT 'completado'::character varying,
  reference_code character varying,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  created_by integer,
  CONSTRAINT payment_pkey PRIMARY KEY (id),
  CONSTRAINT payment_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.service(id) ON DELETE SET NULL,
  CONSTRAINT payment_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(id) ON DELETE CASCADE,
  CONSTRAINT payment_payment_method_id_fkey FOREIGN KEY (payment_method_id) REFERENCES public.payment_method(id) ON DELETE SET NULL,
  CONSTRAINT payment_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL
);

-- ==============================================================================
-- 9. SYSTEM PARAMETERS & CLINICAL PRACTICE SETTINGS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.system_parameters (
  id integer NOT NULL DEFAULT nextval('public.system_parameters_id_seq'::regclass),
  code character varying NOT NULL UNIQUE,
  name character varying NOT NULL,
  value text NOT NULL,
  helper text,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  category character varying NOT NULL DEFAULT 'general'::character varying,
  CONSTRAINT system_parameters_pkey PRIMARY KEY (id)
);

-- ==============================================================================
-- 10. CLINICAL CONVENIENCE VIEWS (DOMAIN ALIASES)
-- ==============================================================================

-- Patient directory view
CREATE OR REPLACE VIEW public.patients AS
SELECT 
  c.id,
  c.mrn,
  c.firstname,
  c.lastname,
  CONCAT(c.firstname, ' ', c.lastname) AS full_name,
  c.email,
  c.phone,
  c.birthday,
  c.gender,
  c.status,
  c.urgency_level,
  c.blood_type,
  c.allergies,
  c.avatar_url,
  c.created_at,
  c.updated_at
FROM public.customer c
WHERE c.deleted_at IS NULL;

-- Appointment schedule view
CREATE OR REPLACE VIEW public.appointments AS
SELECT 
  a.id,
  a.service_id,
  a.customer_id,
  CONCAT(c.firstname, ' ', c.lastname) AS patient_name,
  c.email AS patient_email,
  c.avatar_url AS patient_avatar,
  c.urgency_level,
  a.user_id AS doctor_id,
  CONCAT(u.firstname, ' ', u.lastname) AS doctor_name,
  a.date,
  a.start_time,
  a.end_time,
  a.status,
  a.description,
  s.name AS specialty_name,
  addr.address_line AS room_or_address
FROM public.agenda a
LEFT JOIN public.customer c ON a.customer_id = c.id
LEFT JOIN public.users u ON a.user_id = u.id
LEFT JOIN public.service srv ON a.service_id = srv.id
LEFT JOIN public.specialty s ON srv.specialty_id = s.id
LEFT JOIN public.address addr ON a.address_id = addr.id
WHERE a.deleted_at IS NULL;

-- Medical staff directory view
CREATE OR REPLACE VIEW public.staff AS
SELECT 
  u.id,
  u.auth_user_uid,
  u.firstname,
  u.lastname,
  CONCAT(u.firstname, ' ', u.lastname) AS full_name,
  u.email,
  u.phone,
  u.status,
  u.avatar_url,
  u.working_days,
  u.start_time,
  u.end_time,
  r.name AS role_name,
  s.name AS specialty_name
FROM public.users u
LEFT JOIN public.role_by_users rbu ON u.id = rbu.user_id AND rbu.deleted_at IS NULL
LEFT JOIN public.role r ON rbu.role_id = r.id AND r.deleted_at IS NULL
LEFT JOIN public.user_specialty us ON u.id = us.user_id AND us.deleted_at IS NULL
LEFT JOIN public.specialty s ON us.specialty_id = s.id AND s.deleted_at IS NULL
WHERE u.deleted_at IS NULL;
