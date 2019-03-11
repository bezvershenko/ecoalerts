from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from articles.models import Article, User
from allauth.account.adapter import get_adapter
from rest_framework.authtoken.models import Token


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            'id', 'title', 'image', 'text', 'rating', 'n_comments', 'author', 'is_solved', 'city', 'address', 'lat', 'lon')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'bio', 'avatar', 'password',
                  )


class CustomRegisterSerializer(RegisterSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),

        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)

        self.cleaned_data = self.get_cleaned_data()

        user.save()
        adapter.save_user(request, user, self)
        return user


class TokenSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()

    class Meta:
        model = Token
        fields = ('key', 'user', 'user_info')

    def get_user_info(self, obj):
        serializer_data = UserSerializer(obj.user).data
        del serializer_data['password']

        return serializer_data
