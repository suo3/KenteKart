-- Create a function to find listing by short ID
CREATE OR REPLACE FUNCTION public.find_listing_by_short_id(short_id text)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  title text,
  description text,
  category text,
  condition text,
  images text[],
  location text,
  wanted_items text[],
  price numeric,
  status text,
  views integer,
  likes integer,
  whatsapp_number text,
  created_at timestamptz,
  updated_at timestamptz
) 
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    l.id, l.user_id, l.title, l.description, l.category, l.condition,
    l.images, l.location, l.wanted_items, l.price, l.status,
    l.views, l.likes, l.whatsapp_number, l.created_at, l.updated_at
  FROM listings l
  WHERE l.id::text LIKE short_id || '%'
    AND l.status = 'active'
  LIMIT 1;
$$;