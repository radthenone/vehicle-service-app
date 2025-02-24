from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.service_booklets.serializers import ServiceBookletSerializer
from apps.vehicles.models import Vehicle
from apps.vehicles.renderers import VehicleServiceRenderer
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


class VehicleDetailCvsView(generics.RetrieveAPIView):
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated, IsVehicleOwner]
    renderer_classes = [VehicleServiceRenderer]
    lookup_url_kwarg = 'vehicle_id'
    lookup_field = 'id'

    def get_queryset(self):
        return Vehicle.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        try:
            vehicle = self.get_object()
            serializer = self.get_serializer(vehicle)
            return Response(
                serializer.data,
                headers={
                    # 'Content-Disposition': f'attachment; filename="vehicle_{vehicle.id}.csv"',
                    'Content-Type': 'text/csv'
                }
            )
        except Vehicle.DoesNotExist:
            return Response(
                {"error": "Vehicle not found"},
                status=status.HTTP_404_NOT_FOUND
            )



class VehicleBookletListView(generics.ListCreateAPIView):
    serializer_class = ServiceBookletSerializer
    permission_classes = [IsAuthenticated, IsVehicleOwner]

    def get_queryset(self):
        return Vehicle.objects.get_vehicle_booklets_by_id(
            user=self.request.user,
            vehicle_id=self.kwargs.get("vehicle_id"),
        )
