import { useQuery } from "@tanstack/react-query";

function useQueryGetWeekPlan() {
    return useQuery({
        queryKey: ["latestweekplan"],
        queryFn: async () => {
            const response = await fetch("/api/weekplan", {
                headers: {
                "Content-Type": "application/json",
                },
            });
            const weekplan = (await response.json());
            return weekplan;
        },
        refetchOnMount: false,
    })
}

export { useQueryGetWeekPlan }