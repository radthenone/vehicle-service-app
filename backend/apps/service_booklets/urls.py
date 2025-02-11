from django.urls import path

from apps.service_booklets.views import ServiceBookletDetailView, ServiceBookletView

urlpatterns = [
    path(
        "",
        ServiceBookletView.as_view(),
        name="booklet-list-create",
    ),
    path(
        "<int:booklet_id>/",
        ServiceBookletDetailView.as_view(),
        name="booklet-detail",
    ),
]
