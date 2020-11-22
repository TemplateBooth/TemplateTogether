from django.contrib import admin
from .models import Profile,Template, Comment, Component, Rating

# Register your models here.
admin.site.register(Profile)
admin.site.register(Template)

admin.site.register(Component)

admin.site.register(Comment)

admin.site.register(Rating)
