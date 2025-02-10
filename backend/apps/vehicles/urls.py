from django.urls import path

from apps.service_booklets.views import ServiceBookletDetailView, ServiceBookletView
from apps.vehicles.views import VehicleDetailView, VehicleView

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
        ServiceBookletView.as_view(),
        name="booklet-list-create",
    ),
    path(
        "<int:vehicle_id>/booklets/<int:booklet_id>/",
        ServiceBookletDetailView.as_view(),
        name="booklet-detail",
    ),
]
