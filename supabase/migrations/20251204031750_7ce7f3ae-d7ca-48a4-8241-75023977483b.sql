-- Create a function to find profile by short ID
CREATE OR REPLACE FUNCTION public.find_profile_by_short_id(short_id text)
RETURNS TABLE (
  id uuid,
  username text,
  first_name text,
  last_name text,
  avatar text,
  bio text,
  rating numeric,
  total_sales integer,
  region text,
  city text,
  joined_date timestamptz,
  is_verified boolean,
  achievements text[]
) 
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.id, p.username, p.first_name, p.last_name, p.avatar, p.bio,
    p.rating, p.total_sales, p.region, p.city, p.joined_date,
    p.is_verified, p.achievements
  FROM profiles p
  WHERE p.id::text LIKE short_id || '%'
  LIMIT 1;
$$;