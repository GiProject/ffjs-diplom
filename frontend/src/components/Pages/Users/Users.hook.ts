import { useGetUsersQuery } from "@/redux/api/generalAPI";

export default function useUsers() {
  const { data, isFetching } = useGetUsersQuery("", {
    pollingInterval: 900000,
  });
  return {
    users: data?.users || [],
    count: data?.count || 0,
    isLoading: isFetching,
  };
}
