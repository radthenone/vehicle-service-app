from datetime import datetime, timedelta

from django.core.validators import MinValueValidator
from django.db import models

from apps.service_booklets.managers import BookletManager

# Create your models here.


class ServiceBooklet(models.Model):
    vehicle = models.ForeignKey(
        "vehicles.Vehicle",
        on_delete=models.CASCADE,
        related_name="booklets",
    )
    date = models.DateField()
    mileage = models.PositiveIntegerField()
    description = models.TextField(max_length=500)
    cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[
            MinValueValidator(5.00, message="Cost must be at least 5.00 PLN"),
        ],
    )

    objects = BookletManager()

    class Meta:
        verbose_name = "booklet"
        verbose_name_plural = "booklets"
        db_table = "booklets"
        ordering = ["-date", "-mileage"]

    def __str__(self):
        return f"{self.vehicle.name} - {self.mileage}"
