import {
  useHotelGetItemQuery,
  useHotelGetListQuery,
  useHotelGetRoomQuery,
  useHotelGetRoomsQuery,
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
  const { data: rooms, isLoading: isLoadingRooms } = useHotelGetRoomsQuery(id);
  return {
    hotel: data,
    rooms: rooms?.data || [],
    isLoading,
  };
}
export function useGetRoom(id: string | undefined) {
  const { data, isLoading } = useHotelGetRoomQuery(id);
  return {
    room: data,
    isLoading,
  };
}
