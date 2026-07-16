import API from "./axios";

export const getDashboardOverview = async () => {
  try {
    const response = await API.get("/dashboard/overview");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStats = async () => {
  try {
    const response = await API.get("/dashboard/stats");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getChartData = async (period: "week" | "month" | "year") => {
  try {
    const reponse = await API.get("/dashboard/charts", { params: { period } });

    return reponse.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTodayLeads = async () => {
  try {
    const response = await API.get("/dashboard/today-leads");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
