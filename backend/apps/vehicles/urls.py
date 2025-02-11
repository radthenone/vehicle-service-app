from django.urls import path

from apps.vehicles.views import (
    VehicleBookletListView,
    VehicleDetailView,
    VehicleView,
)

urlpatterns = [
    path(
        "",
        VehicleView.as_view(),
        name="vehicle-list-create",
    ),
    path(
        "<int:vehicle_id>/",
        VehicleDetailView.as_view(),
        name="vehicle-detail",
    ),
    path(
        "<int:vehicle_id>/booklets/",
        VehicleBookletListView.as_view(),
        name="vehicle-booklets",
    ),
]
