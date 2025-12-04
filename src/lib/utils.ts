import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .slice(0, 50); // Limit length
}

/**
 * Generate a user-friendly item URL with slug and short ID
 */
export function generateItemUrl(id: string, title: string): string {
  const slug = generateSlug(title);
  const shortId = id.slice(0, 8); // First 8 characters of UUID
  return `/item/${slug}-${shortId}`;
}

/**
 * Extract the item ID from a slug-based URL parameter
 * Supports both new format (slug-shortId) and old format (full UUID)
 */
export function extractItemId(param: string): string {
  // Check if it's a full UUID (old format)
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidPattern.test(param)) {
    return param;
  }
  
  // Extract short ID from the end of slug (last 8 characters after the last hyphen)
  const parts = param.split('-');
  if (parts.length > 0) {
    return parts[parts.length - 1];
  }
  
  return param;
}

/**
 * Generate a user-friendly URL for user profile pages
 */
export function generateUserUrl(id: string, displayName: string): string {
  const slug = generateSlug(displayName || 'user');
  const shortId = id.slice(0, 8);
  return `/user/${slug}-${shortId}`;
}

/**
 * Extract the user ID from a slug-based URL parameter
 * Supports both new format (slug-shortId) and old format (full UUID)
 */
export function extractUserId(param: string): string {
  // Check if it's a full UUID (old format)
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidPattern.test(param)) {
    return param;
  }
  
  // Extract short ID from the end of slug (last 8 characters after the last hyphen)
  const parts = param.split('-');
  if (parts.length > 0) {
    return parts[parts.length - 1];
  }
  
  return param;
}
