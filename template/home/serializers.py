from rest_framework import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.contrib.auth.models import User
from django.forms.fields import FileField
from django.forms import ClearableFileInput
import json
# import demjson
# from django.forms.fields import FileField
from .models import Profile, Template, Component, Comment, Rating,TemplateMediaFile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email']


    
class TemplateFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemplateMediaFile
        fields = ('mediaFiles',)
            

class TemplateUploadSerializer(serializers.ModelSerializer):
    mediaFiles = TemplateFileSerializer(source='templatemediafile_set', many=True,read_only=True)
    class Meta:
        model = Template
        fields = ('id','user','template_type','description','htmlFile','cssFile','cssFile','jsFile','noOfViews','colors','avgRating','uploaded_at','mediaFiles')

    # def create(self, validated_data):

    #     if 'mediaFiles' in validated_data:
    #         files_data = self.context.get('view').request.FILES.getlist('mediaFiles')
    #         print('filesss',files_data)
    #         template_Id = Template.objects.latest('created_at')
    #         for filez in files_data:
    #             print('filez',filez)
    #             TemplateMediaFile.objects.create(template_Id=template_Id, mediaFiles=filez)
    #         return template_Id
   






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
