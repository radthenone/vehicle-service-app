from django.urls import path

from apps.auth.views import (
    LoginView,
    RefreshTokenView,
    RegisterView,
)

urlpatterns = [
    path(
        "register/",
        RegisterView.as_view(),
        name="register",
    ),
    path(
        "login/",
        LoginView.as_view(),
        name="login",
    ),
    path(
        "refresh/",
        RefreshTokenView.as_view(),
        name="refresh",
    ),
]
