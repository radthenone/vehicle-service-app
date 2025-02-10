from rest_framework import permissions

from apps.vehicles.models import Vehicle


class IsVehicleOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        vehicle_id = view.kwargs.get("vehicle_id")

        if vehicle_id:
            return Vehicle.objects.filter(id=vehicle_id, user=request.user).exists()

        return False
