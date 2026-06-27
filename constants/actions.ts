import {
  Plus,
  FileText,
  UserPlus,
  UserCheck,
  Phone,
  MessageSquare,
  Edit,
  XCircle,
  Clock
} from "lucide-react-native";

const ACTION_CONFIG = {
  CREATED: {
    icon: Plus,
    bg: "#DCFCE7",
    color: "#16A34A",
  },
  NOTE_ADDED: {
    icon: FileText,
    bg: "#DBEAFE",
    color: "#2563EB",
  },
  ASSIGNED: {
    icon: UserPlus,
    bg: "#F3E8FF",
    color: "#9333EA",
  },
  REASSIGNED: {
    icon: UserCheck,
    bg: "#F3E8FF",
    color: "#9333EA",
  },
  CALL_MADE: {
    icon: Phone,
    bg: "#FEF3C7",
    color: "#D97706",
  },
  MESSAGE_SENT: {
    icon: MessageSquare,
    bg: "#CCFBF1",
    color: "#0F766E",
  },
  EMAIL_SENT: {
    icon: MessageSquare,
    bg: "#CCFBF1",
    color: "#0F766E",
  },
  UPDATED: {
    icon: Edit,
    bg: "#E0E7FF",
    color: "#4F46E5",
  },
  CLOSED: {
    icon: XCircle,
    bg: "#FEE2E2",
    color: "#DC2626",
  },
  FOLLOW_UP: {
    icon: Clock,
    bg: "#F3F4F6",
    color: "#6B7280",
  },
};

export default ACTION_CONFIG;
