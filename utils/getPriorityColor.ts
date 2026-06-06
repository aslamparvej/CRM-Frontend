const getPriorityColor = (priority: string): string => {
  const map: Record<string, string> = {
    low: '#94A3B8',
    medium: '#F59E0B',
    high: '#F97316',
    urgent: '#EF4444',
  };
  return map[priority] || '#94A3B8';
};

export default getPriorityColor;