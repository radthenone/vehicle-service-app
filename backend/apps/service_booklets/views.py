from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from apps.service_booklets.models import ServiceBooklet
from apps.service_booklets.serializers import ServiceBookletSerializer
from apps.vehicles.models import Vehicle
from common.permissions import IsVehicleOwner

# Create your views here.


class ServiceBookletView(generics.ListAPIView, generics.CreateAPIView):
    serializer_class = ServiceBookletSerializer
    permission_classes = [IsAuthenticated, IsVehicleOwner]

    def get_queryset(self):
        vehicle_id = self.kwargs.get("vehicle_id")
        vehicle = Vehicle.objects.get_vehicle_by_id(vehicle_id=vehicle_id)

        return ServiceBooklet.objects.get_booklets_by_vehicle(vehicle=vehicle)

    def perform_create(self, serializer):
        vehicle_id = self.kwargs.get("vehicle_id")
        vehicle = Vehicle.objects.get_vehicle_by_id(vehicle_id=vehicle_id)

        serializer.save(vehicle=vehicle)


class ServiceBookletDetailView(generics.RetrieveAPIView, generics.DestroyAPIView):
    serializer_class = ServiceBookletSerializer
    permission_classes = [IsAuthenticated, IsVehicleOwner]

    def get_object(self):
        vehicle_id = self.kwargs.get("vehicle_id")
        booklet_id = self.kwargs.get("booklet_id")
        vehicle = Vehicle.objects.get_vehicle_by_id(vehicle_id=vehicle_id)

        return ServiceBooklet.objects.get_booklet_by_id(
            vehicle=vehicle,
            booklet_id=booklet_id,
        )
