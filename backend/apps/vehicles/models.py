from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone

from apps.vehicles.managers import VehicleManager

# Create your models here.


class Vehicle(models.Model):
    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="vehicles",
    )

    name = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField(
        validators=[MinValueValidator(1800), MaxValueValidator(timezone.now().year)]
    )
    vin = models.CharField(max_length=17, unique=True)

    objects = VehicleManager()

    class Meta:
        verbose_name = "vehicle"
        verbose_name_plural = "vehicles"
        db_table = "vehicles"
        ordering = ["name", "model"]

    def __str__(self):
        return f"{self.name} - {self.model}"
