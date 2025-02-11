from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from apps.service_booklets.models import ServiceBooklet
from apps.service_booklets.serializers import ServiceBookletSerializer

# Create your views here.


class ServiceBookletView(generics.ListAPIView, generics.CreateAPIView):
    serializer_class = ServiceBookletSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ServiceBooklet.objects.get_booklets_by_vehicle()


class ServiceBookletDetailView(generics.RetrieveAPIView, generics.DestroyAPIView):
    serializer_class = ServiceBookletSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return ServiceBooklet.objects.get_booklet_by_id(
            booklet_id=self.kwargs.get("booklet_id"),
        )
