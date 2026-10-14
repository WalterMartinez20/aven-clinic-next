CREATE SEQUENCE IF NOT EXISTS public.users_id_seq;

CREATE TABLE public.users (
  id integer NOT NULL DEFAULT nextval('public.users_id_seq'::regclass),
  auth_user_uid uuid,
  firstname character varying,
  lastname character varying,
  email character varying UNIQUE,
  phone character varying,
  status character varying,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp without time zone,
  created_by integer,
  updated_by integer,
  deleted_by integer,
  avatar_url text,
  address text,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_auth_user_uid_fkey FOREIGN KEY (auth_user_uid) REFERENCES auth.users(id)
);

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
