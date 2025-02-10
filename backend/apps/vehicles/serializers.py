from django.utils import timezone
from rest_framework import serializers

from apps.vehicles.models import Vehicle


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = [
            "id",
            "name",
            "model",
            "year",
            "vin",
            # nested
            "user",
        ]
        extra_kwargs = {
            "name": {"required": True},
            "model": {"required": True},
            "year": {
                "min_value": 1800,
                "max_value": timezone.now().year + 1,
                "required": True,
            },
            "vin": {"required": True},
        }
        read_only_fields = [
            "id",
            "user",
        ]

    def validate_vin(self, value: str) -> str:  # noqa
        return value.upper()

    def validate_name(self, value: str) -> str:  # noqa
        return value.capitalize()

    def validate_model(self, value: str) -> str:  # noqa
        return value.capitalize()

    def validate_year(self, value: int) -> int:  # noqa
        if value > timezone.now().year:
            raise serializers.ValidationError("This is future year")
        return value

    def create(self, validated_data):
        return Vehicle.objects.create_vehicle(
            name=validated_data.pop("name"),
            model=validated_data.pop("model"),
            year=validated_data.pop("year"),
            vin=validated_data.pop("vin"),
            user=validated_data.pop("user"),
            **validated_data,
        )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.pop("user")
        return data
