from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from apps.vehicles.models import Vehicle
from apps.vehicles.serializers import VehicleSerializer
from common.permissions import IsVehicleOwner

# Create your views here.


class VehicleView(generics.ListAPIView, generics.CreateAPIView):
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        return Vehicle.objects.get_vehicles_by_user(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class VehicleDetailView(generics.RetrieveAPIView, generics.DestroyAPIView):
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated, IsVehicleOwner]

    def get_queryset(self):
        user = self.request.user

        return Vehicle.objects.get_vehicles_by_user(user=user)

    def get_object(self):
        vehicle_id = self.kwargs.get("vehicle_id")

        return Vehicle.objects.get_vehicle_by_id(vehicle_id=vehicle_id)
