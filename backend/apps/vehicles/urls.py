from django.urls import path

from apps.vehicles.views import (
    VehicleBookletListView,
    VehicleDetailView,
    VehicleView,
    VehicleDetailCvsView,
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
    # path('vehicles/<str:vehicle_id>/csv/?format=csv', VehicleDetailCvsView.as_view(), name='vehicle-csv'),
    path(
        "<int:vehicle_id>/booklets/",
        VehicleBookletListView.as_view(),
        name="vehicle-booklets",
    ),
    path('<int:vehicle_id>/csv/', VehicleDetailCvsView.as_view(), name='vehicle-csv'),

    path(
        "<int:vehicle_id>/booklets/",
        VehicleBookletListView.as_view(),
        name="vehicle-booklets",
    ),
]
