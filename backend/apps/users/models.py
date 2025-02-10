from django.contrib.auth.models import AbstractUser

from apps.users.managers import AuthManager

# Create your models here.


class User(AbstractUser):
    auth = AuthManager()

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"
        db_table = "users"

    def __str__(self):
        return self.username
