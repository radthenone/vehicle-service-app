from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from apps.service_booklets.serializers import ServiceBookletSerializer
from apps.vehicles.models import Vehicle
from apps.vehicles.serializers import VehicleSerializer
from common.permissions import IsVehicleOwner

# Create your views here.


class VehicleView(generics.ListAPIView, generics.CreateAPIView):
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Vehicle.objects.get_vehicles_by_user(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class VehicleDetailView(generics.RetrieveAPIView, generics.DestroyAPIView):
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated, IsVehicleOwner]

    def get_queryset(self):
        return Vehicle.objects.get_vehicles_by_user(user=self.request.user)

    def get_object(self):
        return Vehicle.objects.get_vehicle_by_id(
            vehicle_id=self.kwargs.get("vehicle_id")
        )


class VehicleBookletListView(generics.ListCreateAPIView):
    serializer_class = ServiceBookletSerializer
    permission_classes = [IsAuthenticated, IsVehicleOwner]

    def get_queryset(self):
        return Vehicle.objects.get_vehicle_booklets_by_id(
            user=self.request.user,
            vehicle_id=self.kwargs.get("vehicle_id"),
        )
