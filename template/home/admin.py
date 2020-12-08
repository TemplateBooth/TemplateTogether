from django.contrib import admin
from .models import Profile,Template, Comment, Component, Rating,TemplateMediaFile



class TemplateMediaFileAdmin(admin.StackedInline):
    model = TemplateMediaFile

@admin.register(Template)
class TemplateAdmin(admin.ModelAdmin):
    inlines = [TemplateMediaFileAdmin]

    class Meta:
       model = Template

@admin.register(TemplateMediaFile)
class TemplateMediaFileAdmin(admin.ModelAdmin):
    pass

# Register your models here.
admin.site.register(Profile)
# admin.site.register(Template)
# admin.site.register(TemplateMediaFile)

admin.site.register(Component)

admin.site.register(Comment)

admin.site.register(Rating)
