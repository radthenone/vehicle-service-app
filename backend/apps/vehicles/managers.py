from typing import TYPE_CHECKING, Optional

from django.db import models
from django.db.models import QuerySet

if TYPE_CHECKING:
    from apps.users.models import User
    from apps.vehicles.models import Vehicle


class VehicleManager(models.Manager):
    def get_vehicle_by_id(self, vehicle_id: int) -> Optional["Vehicle"]:
        try:
            return self.get(id=vehicle_id)
        except self.model.DoesNotExist:
            raise ValueError("Vehicle does not exist")

    def get_vehicle_by_vin(self, vin: str) -> Optional["Vehicle"]:
        try:
            return self.get(vin=vin)
        except self.model.DoesNotExist:
            raise ValueError("Vehicle does not exist")

    def get_vehicles_by_user(self, user: "User") -> QuerySet["Vehicle"]:
        return self.select_related("user").filter(user=user)

    def create_vehicle(
        self,
        user: "User",
        name: str,
        model: str,
        year: int,
        vin: str,
        **kwargs,
    ) -> Optional["Vehicle"]:
        try:
            vehicle = self.model(
                user=user,
                name=name,
                model=model,
                year=year,
                vin=vin,
                **kwargs,
            )
            vehicle.save()
            return vehicle
        except Exception as error:
            raise ValueError(f"Could not create vehicle. Error: {error}")
