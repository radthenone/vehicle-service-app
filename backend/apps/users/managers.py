from typing import TYPE_CHECKING, Optional

import jwt
from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import check_password
from django.utils import timezone
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

if TYPE_CHECKING:
    from apps.users.models import User


class AuthManager(BaseUserManager):
    def get_user(self, user_id: int) -> Optional["User"]:
        try:
            return self.get(id=user_id)
        except self.model.DoesNotExist:
            raise ValueError("User does not exist")

    def authenticate_user(self, username: str, password: str) -> Optional["User"]:
        try:
            user = self.get(username=username)
        except self.model.DoesNotExist:
            raise ValueError("User does not exist")

        if check_password(password, user.password):
            return user

        return None

    def create_user(
        self,
        username: str,
        password: str,
        email: str = None,
        **kwargs,
    ) -> Optional["User"]:
        if not all([username, password]):
            raise ValueError("You must pass username and password")
        if email:
            kwargs["email"] = self.normalize_email(email)
        user = self.model(username=username, **kwargs)
        user.set_password(password)
        user.save()
        return user

    def set_is_active(self, user_id: int) -> None:
        user = self.get_user(user_id=user_id)
        user.is_active = True
        user.save(update_fields=["is_active"])

    def set_last_login(self, user_id: int) -> None:
        user = self.get_user(user_id=user_id)
        user.last_login = timezone.now()
        user.save(update_fields=["last_login"])

    def get_tokens_for_user(self, user_id: id) -> dict[str, str]:
        user = self.get_user(user_id=user_id)
        refresh = RefreshToken.for_user(user)

        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }

    @staticmethod
    def decode_token(token: AccessToken | RefreshToken) -> Optional[dict[str, any]]:
        try:
            payload: dict[str, any] = jwt.decode(
                str(token),
                key=settings.SECRET_KEY,
                algorithms=[settings.SIMPLE_JWT["ALGORITHM"]],
            )
            return payload

        except jwt.PyJWTError:
            return None

        except Exception:
            return None
