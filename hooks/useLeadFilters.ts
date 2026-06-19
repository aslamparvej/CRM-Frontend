import { useLeadStore } from "@/store/leads.store";
 
export const useLeadFilters = () => {
  const { filters, setFilters, clearFilters } = useLeadStore();
  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  return { filters, setFilters, clearFilters, activeFilterCount, hasFilters: activeFilterCount > 0 };
};