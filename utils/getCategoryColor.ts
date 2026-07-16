const getCategoryColor = (category: string): string => {
  const map: Record<string, string> = {
    insurance: "#10B981",
    education: "#3B82F6",      // Blue
    healthcare: "#10B981",     // Green
    realestate: "#F59E0B",     // Amber
    finance: "#8B5CF6",        // Violet
    technology: "#06B6D4",     // Cyan
    ecommerce: "#EC4899",      // Pink
    retail: "#F97316",         // Orange
    manufacturing: "#64748B",  // Slate
    hospitality: "#14B8A6",    // Teal
    automobile: "#DC2626",     // Red
    travel: "#0EA5E9",         // Sky
    other: "#94A3B8",          // Gray
  };

  return map[category.toLowerCase()] || "#94A3B8";
};

export default getCategoryColor;