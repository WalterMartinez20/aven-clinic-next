-- ==========================================
-- Función y Trigger para sincronizar auth.users con public.users
-- ==========================================

-- 1. Crear la función que será llamada por el trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insertamos en la tabla pública users utilizando los metadatos y correo
  INSERT INTO public.users (
    auth_user_uid,
    firstname,
    lastname,
    email,
    status
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',  -- Asumiendo que guardamos envíamos full_name en auth
    NEW.raw_user_meta_data->>'last_name',  -- O extraemos del metadata
    NEW.email,
    'activo'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Crear el trigger en la tabla auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
