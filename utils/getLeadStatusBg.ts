const getLeadStatusBg = (status: string): string => {
  const map: Record<string, string> = {
    new: 'bg-blue-500/20',
    contacted: 'bg-purple-500/20',
    qualified: 'bg-amber-500/20',
    proposal: 'bg-pink-500/20',
    negotiation: 'bg-cyan-500/20',
    closed_won: 'bg-emerald-500/20',
    closed_lost: 'bg-red-500/20',
    on_hold: 'bg-slate-500/20',
  };
  return map[status] || 'bg-slate-500/20';
};

export default getLeadStatusBg;