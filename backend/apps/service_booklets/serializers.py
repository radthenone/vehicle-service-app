from decimal import Decimal

from rest_framework import serializers

from apps.service_booklets.models import ServiceBooklet
from apps.vehicles.models import Vehicle


class ServiceBookletSerializer(serializers.ModelSerializer):
    vehicle = serializers.PrimaryKeyRelatedField(
        queryset=Vehicle.objects.prefetch_related("booklets")
    )

    class Meta:
        model = ServiceBooklet
        fields = [
            "id",
            "date",
            "mileage",
            "description",
            "cost",
            # nested
            "vehicle",
            "vehicle_id",
        ]
        read_only_fields = [
            "id",
            "date",
            "vehicle",
        ]

    def validate_mileage(self, value) -> int:  # noqa
        if value < 0:
            raise serializers.ValidationError("Mileage cannot be negative")
        return value

    def validate_cost(self, value) -> Decimal:  # noqa
        if not isinstance(value, Decimal):
            raise serializers.ValidationError("Cost must be a like 10.00")
        if value < 5.00:
            raise serializers.ValidationError("Cost must be at least 5.00 PLN")
        return value

    def create(self, validated_data):
        return ServiceBooklet.objects.create_booklet(
            vehicle=validated_data.pop("vehicle"),
            mileage=validated_data.pop("mileage"),
            description=validated_data.pop("description"),
            cost=validated_data.pop("cost"),
            **validated_data,
        )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.pop("vehicle_id")
        data.pop("vehicle")
        return data
