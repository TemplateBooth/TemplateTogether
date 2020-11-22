from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Profile, Template, Component, Comment, Rating

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email']


class TemplateUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = '__all__'


class TemplateSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    rating = serializers.CharField(max_length=20,allow_null=True,required=False)
    uploaded_at = serializers.DateTimeField(format="%d-%m-%y")
    class Meta:
        model = Template
        fields = '__all__'


class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'



class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'

templateChoice = [
    ('Navigation Bar', 'Nav'),
    ('Footer', 'Footer'),
    ('Full Page','FullPage')
]

class TemplateDetailSerializer(serializers.Serializer):
    template_type = serializers.ChoiceField(choices=templateChoice)
    description = serializers.CharField(style={'base_template': 'textarea.html'})
    htmlContent = serializers.CharField(style={'base_template': 'textarea.html'})
    cssContent = serializers.CharField(style={'base_template': 'textarea.html'})
    jsContent = serializers.CharField(style={'base_template': 'textarea.html'})
    views = serializers.IntegerField(allow_null=True, label='NoOfViews', required=False)
    colors = serializers.IntegerField(allow_null=True,required=False)
