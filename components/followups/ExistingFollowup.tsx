import React from "react";
import { useRouter } from "expo-router";

import { Followup } from "@/types/followup.types";
import { showError, showSuccess } from "@/utils/toast";
import { useFollowupStore } from "@/store/followup.store";
import { completeFollowup } from "@/services/api/followups.api";

import FollowupDetailsCard from "./FollowupDetailsCard";

interface ExistingFollowupProps {
  followup: Followup;
}

const ExistingFollowup: React.FC<ExistingFollowupProps> = ({ followup }) => {
  const router = useRouter();
  const {updateFollowup} = useFollowupStore();

  const handleEditFollowup = () => {
      router.push(`/(protected)/followup/edit/${followup.id}`)
  };

  const handleCompleteFollowup = async (id: string) => {
    try {
      const response = await completeFollowup(id);
      if (response.success) {
        updateFollowup(id, { status: "completed" });
        showSuccess(response.message);
      }
    } catch (error: any) {
      console.error("Error to mark done", error.message);
      showError(error.message || "Error to mark done");
    }
  };

  const handleViewLead = () => {
    router.push(`/(protected)/leads/details/${followup.leadId}`);
  };
  return (
    <FollowupDetailsCard
      followup={followup}
      onComplete={handleCompleteFollowup}
      onEdit={handleEditFollowup}
      onViewLead={handleViewLead}
    />
  );
};

export default ExistingFollowup;
