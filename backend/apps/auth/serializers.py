from typing import Optional

from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apps.users.models import User


class TokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username

        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        required=True,
        min_length=8,
        write_only=True,
    )
    rewrite_password = serializers.CharField(
        required=True,
        min_length=8,
        write_only=True,
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "rewrite_password",
        ]
        extra_kwargs = {
            "username": {"required": True},
            "email": {"required": False},
        }
        read_only_fields = [
            "id",
        ]

    def validate(self, attrs):
        if attrs["password"] != attrs["rewrite_password"]:
            raise ValidationError(detail="Password don't match")
        return attrs

    def validate_email(self, value: Optional[str]):  # noqa
        if value:
            if "@" not in value:
                raise serializers.ValidationError("Invalid email")

            if User.objects.filter(email=value).exists():
                raise serializers.ValidationError("User with this email already exists")
            return value

        return value

    def validate_username(self, value: str):  # noqa
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("User with this username already exists")
        return value

    def create(self, validated_data):
        validated_data.pop("rewrite_password")

        email = validated_data.pop("email", None)
        username = validated_data.pop("username", None)
        password = validated_data.pop("password", None)

        user = User.auth.create_user(
            username=username,
            password=password,
            email=email,
            **validated_data,
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(
        required=True,
        write_only=True,
    )
    password = serializers.CharField(
        required=True,
        write_only=True,
    )

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")
        user = User.auth.authenticate_user(username=username, password=password)
        if not user:
            raise serializers.ValidationError(
                detail="Invalid credentials",
                code=status.HTTP_400_BAD_REQUEST,
            )

        User.auth.set_last_login(user_id=user.id)
        User.auth.set_is_active(user_id=user.id)
        attrs["user"] = user

        tokens = User.auth.get_tokens_for_user(user.id)
        attrs["access"] = tokens.get("access")
        attrs["refresh"] = tokens.get("refresh")
        return attrs

    def to_representation(self, instance):
        return {
            "access": str(instance["access"]),
            "refresh": str(instance["refresh"]),
            "user": {
                "id": instance["user"].id,
                "username": instance["user"].username,
            },
        }


class RefreshTokenSerializer(serializers.Serializer):
    refresh = serializers.CharField(write_only=True)

    def validate(self, attrs):  # noqa
        payload = User.auth.decode_token(attrs.get("refresh"))
        if payload is None:
            raise serializers.ValidationError(
                detail="Invalid token",
                code=status.HTTP_401_UNAUTHORIZED,
            )
        user = User.auth.get_user(
            user_id=payload.get("user_id"),
        )

        attrs["user"] = user

        tokens = User.auth.get_tokens_for_user(user.id)
        attrs["access"] = tokens.get("access")
        attrs["refresh"] = tokens.get("refresh")
        return attrs

    def to_representation(self, instance):
        return {
            "access": str(instance["access"]),
            "refresh": str(instance["refresh"]),
            "user": {
                "id": instance["user"].id,
                "username": instance["user"].username,
            },
        }
