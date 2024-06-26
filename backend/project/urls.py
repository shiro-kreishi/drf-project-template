from django.contrib import admin
from django.urls import path, include
from users.views.views import HomeStub

urlpatterns = [
    path('admin/', admin.site.urls),
    path('captcha/', include('captcha.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('users/', include('users.urls')),
    path('api/user/', include('user_api.urls')),
    path('', HomeStub.as_view(), name='homepage'),
]
