from django.urls import path,include
from . import views
from django.views.generic import TemplateView




urlpatterns = [
    path('',TemplateView.as_view(template_name='index.html'),name="home"),
    path('api/', views.APIView, name="base"),
    path('templates/', views.TemplateView.as_view(), name="templates"),
    path('templates/user/', views.UserTemplatesView.as_view(), name="templates-user"),
    path('templates/auth/create/',views.TemplateCreateview.as_view(),name="create-template"),
    path('templates/<int:pk>/', views.TemplateDetailView.as_view(),
         name="template-detail"),
    path('templates/content/<int:pk>/', views.templateContentView,
         name="template-content"),
    path('templates/<int:pk>/comments/',views.ListTemplateCommentsView.as_view(),name="template-comments"),
    path('comments/create/',views.CommentCreateView.as_view(),name="comment-create"),
     path('templates/<int:pk>/ratings/',views.ListTemplateRatingsView.as_view(),name="template-ratings"),
    path('ratings/create/',views.RatingCreateView.as_view(),name="rating-create"),
    path('ratings/create-update/',views.ratingCreateUpdateView,name="rating-create-update"),

    path('profile/update/',views.ProfileUpdateView.as_view(),name="profile-update"),
]
