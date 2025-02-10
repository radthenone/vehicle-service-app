from typing import TYPE_CHECKING, Optional

from django.db import models
from django.db.models import QuerySet

from apps.service_booklets.utils import get_next_year_date

if TYPE_CHECKING:
    from apps.service_booklets.models import ServiceBooklet
    from apps.vehicles.models import Vehicle


class BookletManager(models.Manager):
    def get_booklet_by_id(
        self,
        vehicle: "Vehicle",
        booklet_id: int,
    ) -> Optional["ServiceBooklet"]:
        try:
            return self.select_related("vehicle").get(id=booklet_id, vehicle=vehicle)
        except self.model.DoesNotExist:
            raise ValueError("Booklet does not exist")

    def get_booklets_by_vehicle(self, vehicle: "Vehicle") -> QuerySet["ServiceBooklet"]:
        return self.select_related("vehicle").filter(vehicle=vehicle)

    def create_booklet(
        self,
        vehicle: "Vehicle",
        mileage: int,
        description: str,
        cost: float,
        **kwargs,
    ) -> Optional["ServiceBooklet"]:
        try:
            booklet = self.model(
                vehicle=vehicle,
                date=get_next_year_date(),
                mileage=mileage,
                description=description,
                cost=cost,
                **kwargs,
            )
            booklet.save()
            return booklet
        except Exception as error:
            raise ValueError(f"Could not create booklet. Error: {error}")
