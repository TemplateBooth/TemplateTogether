from django.urls import path, include
from . import views
from knox import views as knox_views

urlpatterns = [
    path('api/auth/', include('knox.urls')),
    path('users/register/', views.RegisterUser.as_view(), name="register"),
    path('users/login/', views.LoginUser.as_view(), name="login"),
    path('users/', views.ListUsers.as_view(), name="users"),
    path('api/user/', views.GetUser.as_view(), name="get-user"),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]


