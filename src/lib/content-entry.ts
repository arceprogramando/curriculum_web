/**
 * Slug público de una entrada de colección (glob anidado).
 * Ej.: id `01-lab-setup/es` → URL `…/01-lab-setup/`
 */
export function getContentEntrySlug(entryId: string): string {
  const slash = entryId.lastIndexOf('/');
  return slash === -1 ? entryId : entryId.slice(0, slash);
}
