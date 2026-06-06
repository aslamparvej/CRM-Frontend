const getLeadStatusColor = (status: string): string => {
  const map: Record<string, string> = {
    new: '#3B82F6',
    contacted: '#8B5CF6',
    qualified: '#F59E0B',
    proposal: '#EC4899',
    negotiation: '#06B6D4',
    closed_won: '#10B981',
    closed_lost: '#EF4444',
    on_hold: '#94A3B8',
  };
  return map[status] || '#94A3B8';
};

export default getLeadStatusColor;