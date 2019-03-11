from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ArticleViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, base_name='users')
router.register(r'articles', ArticleViewSet, base_name='articles')
urlpatterns = router.urls
