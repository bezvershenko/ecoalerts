from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from EcoAlert.settings import AUTH_USER_MODEL


class User(AbstractUser):
    bio = models.TextField(max_length=500, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True)

    def __str__(self):
        return self.username


class Article(models.Model):
    author = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    city = models.CharField(max_length=30, default='Не указано')
    address = models.CharField(max_length=100, default='Не указано')
    title = models.CharField(max_length=30)
    text = models.TextField()
    image = models.ImageField(upload_to='article_images/', default='../media/article_images/')
    rating = models.IntegerField(default=0)
    n_comments = models.IntegerField(default=0)
    is_solved = models.BooleanField(default=0)
    lat = models.FloatField(default=0.0)
    lon = models.FloatField(default=0.0)

    def __str__(self):
        return self.title
