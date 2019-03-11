from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from articles.models import Article, User
from django.contrib.auth.models import Group


class UserAdmin(BaseUserAdmin):
    add_fieldsets = (
        (None, {
            'fields': (
                'username', 'email', 'bio', 'avatar', 'password1',
                'password2')
        }),
        ('Permissions', {
            'fields': ('is_superuser', 'is_staff')
        })
    )

    fieldsets = (
        (None, {
            'fields': (
                'username', 'email', 'bio', 'avatar', 'password')
        }),
        ('Permissions', {
            'fields': ('is_superuser', 'is_staff')
        })
    )

    list_display = ['username', 'email']
    search_fields = ('email', 'username')
    ordering = ('email',)


admin.site.register(User, UserAdmin)
admin.site.register(Article)

admin.site.unregister(Group)
