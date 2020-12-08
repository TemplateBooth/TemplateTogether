from django.shortcuts import render
from rest_framework import generics, permissions
# Create your views here.
from .serializers import TemplateSerializer, ComponentSerializer, RatingSerializer, CommentSerializer,TemplateUploadSerializer, ProfileSerializer
from .models import Template, Comment, Component, Rating
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import JsonResponse
from django.conf import settings
from .converter.JSConverter import jsConverter
from .converter.cssConverter import cssConverter
from .converter.htmlConverter import htmlConverter
import os
from django.views.generic.base import TemplateView
from .converter.color_Variable import variables
from bs4 import BeautifulSoup
import re 
from django.core.files import File
from collections import OrderedDict

class HomeView(TemplateView):
    template_name = 'index.html'



@api_view(['GET'])
def APIView(request):
    if request.method == "GET":
        return Response({
            "users": reverse('users', request=request),
                        'register': reverse('register', request=request),
                        'login': reverse('login', request=request),
                        'templates': reverse('templates', request=request),
                        'create-template':reverse('create-template',request=request),
                        'create-comment':reverse('comment-create',request=request),
                        'create-rating':reverse('rating-create',request=request),
                
                        })
                        

class TemplateView(generics.ListAPIView):
    serializer_class = TemplateSerializer

    def get_queryset(self):
        print(Template.objects.all())
        queryset = Template.objects.all().order_by('-uploaded_at')
        if self.request.user.is_authenticated:
            for query in queryset:
                print(query.id)
                if Rating.objects.filter(user_id = self.request.user, template_id=query.id).exists():
                    query.rating = Rating.objects.get(user_id = self.request.user, template_id=query.id).rating 
                else:
                    query.rating = None
                print(query.rating)
        return queryset

class UserTemplatesView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = TemplateSerializer
    
    def get_queryset(self):
        queryset = self.request.user.templates.all().order_by('-uploaded_at')
        for query in queryset:
            print(query.id)
            if Rating.objects.filter(user_id = self.request.user, template_id=query.id).exists():
                query.rating = Rating.objects.get(user_id = self.request.user, template_id=query.id).rating 
            else:
                query.rating = None
            print(query.rating)
        return queryset

class TemplateCreateview(generics.CreateAPIView):
    
    permission_classes = [
        permissions.IsAuthenticated
    ]

    queryset = Template.objects.all()
    serializer_class = TemplateUploadSerializer
    
    def perform_create(self,serializer):
        data = serializer.validated_data
        file_dict = data.copy()
        htmlFile = None
        cssFile = None
        jsFile = None

        if 'htmlFile' in data:
            htmlFile = data['htmlFile']
            del data['htmlFile']
        if 'cssFile' in data :
            cssFile = data['cssFile']
            del data['cssFile']
        if 'jsFile' in data:
            jsFile = data['jsFile']
            del data['jsFile']

        
 
        CustomSerializer = TemplateUploadSerializer(data=data)
        if CustomSerializer.is_valid():
            template = CustomSerializer.save(user=self.request.user)
        
        newSerializer = TemplateUploadSerializer(template, data=file_dict)
        if newSerializer.is_valid():
            print("dfd")
            t = newSerializer.save()    
            print(t)  
        else:
            print(newSerializer.errors)        
       
        template_list = list(Template.objects.all())
        latest_template = template_list[len(template_list)-1]

        if latest_template.htmlFile != '':
            oldHtml = open(settings.EX_DIR + latest_template.htmlFile.url, "r").read()
        if latest_template.cssFile != '':
            oldCss = open(settings.EX_DIR + latest_template.cssFile.url, 'r').read()
        if latest_template.jsFile != '':
            oldJs = open(settings.EX_DIR + latest_template.jsFile.url, "r").read()

        newHtml = ''
        newCss = ''
        newJs = ''
        if latest_template.htmlFile != '':
            with open(settings.EX_DIR + latest_template.htmlFile.url) as HTML:
                soup = BeautifulSoup(HTML, "html.parser")

            links = soup.find_all(['link', 'style'])
        
            cssFileLink = False
            for link in links:
                if re.search('href\s*=\s*(\'|")https', str(link)):
                    print(link)
                elif str(link).strip()[:6] == '<style':
                    print(''.join(link.contents))
                    newCss += '\n' + ''.join(link.contents)
                    link.replace_with('')
                elif latest_template.cssFile != '' and str(link).find(str(cssFile)) != -1:
                    cssFileLink = True
                    newCss += '\n' + oldCss
                    print(latest_template.cssFile.url)
                else:
                    link.replace_with('')
            
            #if user uploads a file but does'nt provide a link to the file
            if latest_template.cssFile != '' and not cssFileLink:
                #add the uploaded css to the html <style> Css
                newCss = oldCss + newCss

        

            scripts = soup.find_all('script')
            
            jsFileLink = False
            for script in scripts:
                print(script)
                if re.search('src\s*=\s*(\'|")https', str(script)):
                    print(script)
                elif ''.join(script.contents).strip() != '':
                    newJs += '\n' + ''.join(script.contents).strip()
                    script.replace_with('')
                elif latest_template.jsFile != '' and str(script).find(str(jsFile)) != -1:
                    jsFileLink = True
                    newJs += '\n' + oldJs
                    
                else:
                    script.replace_with('')


            if latest_template.jsFile != '' and not jsFileLink:
                #add the uploaded css to the html <style> Css
                newJs = oldJs + newJs
              


            newHtml = str(soup)
            print("newHtml",newHtml)
            print("newCss",newCss)
            print("newJs",newJs)


        if newCss != '' and latest_template.cssFile == '':
            username = latest_template.user.username
            template_id = latest_template.id 
            file = open(settings.EX_DIR + '/media/' + 'templateCss.css', 'r')
            latest_template.cssFile = File(file)
            latest_template.save()

        if newCss != '':
            wholeHtml = soup.html 
            wholeHead = wholeHtml.head
            localsoup = BeautifulSoup(
                    '<link type="text/css" rel="stylesheet" href="http://localhost:8002' + latest_template.cssFile.url +  '" />', 'html.parser')
            wholeHead.append(localsoup)
            newHtml = str(soup)
          


        if newJs != '' and latest_template.jsFile == '':
            username = latest_template.user.username
            template_id = latest_template.id 
            file = open(settings.EX_DIR + '/media/' + 'templatejs.js', 'r')
            latest_template.jsFile = File(file)
            latest_template.save()



        if newJs != '':
            wholeHtml = soup.html 
            wholeBody = wholeHtml.body
            localsoup = BeautifulSoup(
                    '<script type="text/javascript" src="http://localhost:8002' + latest_template.jsFile.url + '"' +  '></script>', 'html.parser')
            wholeBody.append(localsoup)
            newHtml = str(soup)



        #images and videos parsing



                

        if latest_template.htmlFile != '':
            htmlConverter(settings.EX_DIR + latest_template.htmlFile.url,newHtml).convert()
        if latest_template.cssFile != '':    
            cssConverter(settings.EX_DIR + latest_template.cssFile.url,newCss).convert()   
        if latest_template.jsFile != '':
            jsConverter(settings.EX_DIR + latest_template.jsFile.url,newJs).convert()

        total_colors = variables['total_variable']
        latest_template.colors = total_colors
        
        serializer.save(user=self.request.user,colors=latest_template.colors,jsFile=latest_template.jsFile,cssFile=latest_template.cssFile,htmlFile=latest_template.htmlFile)

        #clear variables
        variables['old_variables'] = {}
        variables['total_variable'] =  0
        variables['color_variables'] = {}
         
        # print(filejs+filecss+filehtml)
        # return JsonResponse(filejs+filecss+filehtml) 
    print(queryset)

class TemplateDeleteView(generics.DestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = TemplateSerializer


class TemplateDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
def templateContentView(request,pk):
    if request.method == "GET":
        template = Template.objects.get(pk=pk)
        content = {}
        content['template_type'] = template.template_type
        content['description'] = template.description 
        content['colors'] = template.colors  
       
        if template.htmlFile.name:
            file = open(settings.EX_DIR +template.htmlFile.url, "r")
            htmlContent = file.read()
            print(htmlContent)
            content['htmlContent'] = htmlContent
        else:
            content['htmlContent'] = ''

        if template.cssFile.name:
            file = open(settings.EX_DIR +template.cssFile.url, "r")
            cssConetnt = file.read()
            print(cssConetnt)
            content['cssContent'] = cssConetnt
        else:
            content['cssContent'] = ''


        print("sfd",template.jsFile)
        if template.jsFile.name:
            file = open(settings.EX_DIR + template.jsFile.url, "r")
            jsContent = file.read()
            print(htmlContent)
            content['jsContent'] = jsContent
        else:
            content['jsContent'] = ''
        

        

        content['htmlFile'] = template.htmlFile.url
        return JsonResponse(content)

class CommentCreateView(generics.CreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(user_id = self.request.user)

class ListTemplateCommentsView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(template_id = self.kwargs['pk'])

class RatingCreateView(generics.CreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = RatingSerializer

    def perform_create(self, serializer):
        serializer.save(user_id = self.request.user)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def ratingCreateUpdateView(request):

    if request.method == "POST":
        serializer = RatingSerializer(data = request.data)
        
        if serializer.is_valid():
            templateId = serializer.validated_data['template_id'].id
            user = request.user

            if Rating.objects.filter(template_id=templateId,user_id=user).exists():
                rating = Rating.objects.get(template_id=templateId,user_id=user)
                print(rating)
                template = Template.objects.get(id=templateId)
                totalUsers = len(Rating.objects.filter(template_id=templateId))
                avgRating = template.avgRating
                
                prevRating = int(rating.rating)
                newRating = serializer.validated_data["rating"]
                
                avgRating = ((avgRating*totalUsers) - prevRating + newRating)/(totalUsers)
                template.avgRating = avgRating
                template.save()

                serializer = RatingSerializer(rating,data=request.data)
              
                if serializer.is_valid():
                    serializer.save(user_id=request.user)
                    newDict = serializer.data
                    newDict["avgRating"] = avgRating
                    print(newDict)
                    return Response(newDict)
                return Response(serializer.errors,status=400)

            template = Template.objects.get(id=templateId)
            totalUsers = len(Rating.objects.filter(template_id=templateId))
            avgRating = template.avgRating
            
            userRating = serializer.validated_data["rating"]

            avgRating = ((avgRating*totalUsers) + userRating)/(totalUsers + 1)
            template.avgRating = avgRating
            template.save()

            serializer.save(user_id = request.user)
            newDict = serializer.data
            newDict["avgRating"] = avgRating
            print(newDict)
            return Response(newDict)
        return Response(serializer.errors,status=400)



class ListTemplateRatingsView(generics.ListAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

    def get_queryset(self):
        return Rating.objects.filter(template_id = self.kwargs['pk'])


class ProfileUpdateView(generics.UpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile 

    
