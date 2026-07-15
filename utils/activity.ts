import React from "react";
import {   
CheckCircle2,
  Pencil,
  Trash2,
  User,
  Users,
  CalendarDays,
  FileText,
  Bell,
  Shield,
  Circle,
  ArrowRightLeft,
  Flag,
  MessageSquare, } from "lucide-react-native";

import { Activity } from "@/types/activity.types";

/**
 * Returns icon color based on activity
 */
export const getActivityColor = (activity: Activity): string => {
  const action = activity.action.toUpperCase();

  if (action.includes("CREATE")) return "#16A34A";

  if (action.includes("UPDATE")) return "#2563EB";

  if (action.includes("DELETE")) return "#DC2626";

  if (action.includes("LOGIN")) return "#7C3AED";

  if (action.includes("LOGOUT")) return "#7C3AED";

  if (action.includes("STATUS")) return "#EA580C";

  if (action.includes("ASSIGN")) return "#0891B2";

  if (action.includes("PRIORITY")) return "#F59E0B";

  switch (activity.module) {
    case "Lead":
      return "#2563EB";

    case "FollowUp":
      return "#EA580C";

    case "User":
      return "#0EA5E9";

    case "Notification":
      return "#EAB308";

    case "Note":
      return "#8B5CF6";

    case "Auth":
      return "#14B8A6";

    default:
      return "#64748B";
  }
};

/**
 * Returns icon for activity
 */
export const getActivityIcon = (activity: Activity) => {
  const action = activity.action.toUpperCase();

  const color = getActivityColor(activity);

  if (action.includes("CREATE"))
    return React.createElement(CheckCircle2, { size: 18, color });

  if (action.includes("UPDATE"))
    return React.createElement(Pencil, { size: 18, color });

  if (action.includes("DELETE"))
    return React.createElement(Trash2, { size: 18, color });

  if (action.includes("LOGIN"))
    return React.createElement(Shield, { size: 18, color });

  if (action.includes("LOGOUT"))
    return React.createElement(Shield, { size: 18, color });

  if (action.includes("ASSIGN"))
    return React.createElement(ArrowRightLeft, { size: 18, color });

  if (action.includes("STATUS"))
    return React.createElement(Circle, { size: 18, color, fill: color });

  if (action.includes("PRIORITY"))
    return React.createElement(Flag, { size: 18, color });

  switch (activity.module) {
    case "Lead":
      return React.createElement(Users, { size: 18, color });

    case "FollowUp":
      return React.createElement(CalendarDays, { size: 18, color });

    case "Note":
      return React.createElement(MessageSquare, { size: 18, color });

    case "Notification":
      return React.createElement(Bell, { size: 18, color });

    case "User":
      return React.createElement(User, { size: 18, color });

    case "Auth":
      return React.createElement(Shield, { size: 18, color });

    default:
      return React.createElement(FileText, { size: 18, color });
  }
};

/**
 * LEAD_CREATED
 * ↓
 * Lead Created
 */
export const formatAction = (action: string) => {
  return action
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
