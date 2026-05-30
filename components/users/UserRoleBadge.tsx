import { View, Text } from "react-native";
import {Shield} from "lucide-react-native";
import { ROLE_LABELS } from "@/constants/roles";

const UserRoleBadge: React.FC<{ role: string }> = ({ role }) => {
  const colors: Record<string, string> = { admin: 'text-red-400', sub_admin: 'text-amber-400', agent: 'text-indigo-400' };
  const bgs: Record<string, string> = { admin: 'bg-red-500/20', sub_admin: 'bg-amber-500/20', agent: 'bg-indigo-500/20' };
  return (
    <View className={`flex-row items-center gap-1 ${bgs[role]} px-2 py-0.5 rounded-full`}>
      <Shield size={10} color={colors[role]?.replace('text-', '') || '#fff'} />
      <Text className={`text-xs font-semibold ${colors[role]}`}>{ROLE_LABELS[role]}</Text>
    </View>
  );
};

export default UserRoleBadge;