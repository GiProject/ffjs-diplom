import {
  useHotelGetItemQuery,
  useHotelGetListQuery,
} from "@/shared/redux/api/generalAPI";

export function useGetHotels() {
  const { data, isLoading } = useHotelGetListQuery();
  return {
    hotels: data?.data || [],
    count: data?.count || 0,
    isLoading,
  };
}
export function useGetHotel(id: string | undefined) {
  const { data, isLoading } = useHotelGetItemQuery(id);
  return {
    hotel: data,
    isLoading,
  };
}
