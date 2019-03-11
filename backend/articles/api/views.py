from rest_framework.generics import ListAPIView, RetrieveAPIView
from ..models import User
from .serializers import UserSerializer
from articles.models import Article
from .serializers import ArticleSerializer
from rest_framework import viewsets


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
