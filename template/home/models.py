from django.db import models
from django.contrib.auth.models import User
# Create your models here.

templateChoice = [
    ('Navigation Bar', 'Nav'),
    ('Footer', 'Footer'),
    ('Full Page','FullPage')
]

ratingChoice = [
    (1,'Not Satisfactory'),
    (2,'Satisfactory'),
    (3,'Good'),
    (4,'very Good'),
    (5,'Excellent'),
]


class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,null=True, related_name="profile")
    image = models.ImageField(upload_to="profile_pics", blank=True)
    tag1 = models.CharField(max_length=100,null=True,blank=True)
    tag2 = models.CharField(max_length=100,null=True,blank=True)
    tag3 = models.CharField(max_length=100,null=True,blank=True)
    tag4 = models.CharField(max_length=100,null=True,blank=True)
    tag5 = models.CharField(max_length=100,null=True,blank=True)
    tag6 = models.CharField(max_length=100,null=True,blank=True)
    tag7 = models.CharField(max_length=100,null=True,blank=True)

def get_html_path(instance, filename):
    return '%s/templates/%d/html/%s' % (instance.user.username,instance.id,'templateHtml.html')

def get_css_path(instance, filename):
    return '%s/templates/%d/css/%s' % (instance.user.username,instance.id,'templateCss.css')

def get_js_path(instance, filename):
    return '%s/templates/%d/js/%s' % (instance.user.username,instance.id,'templateJs.js')


class Template(models.Model):
    user = models.ForeignKey(User,related_name="templates",on_delete=models.CASCADE, null=True)
    template_type = models.CharField(max_length=20, choices=templateChoice)
    description = models.TextField()
    htmlFile = models.FileField(upload_to=get_html_path,null=True)
    cssFile = models.FileField(upload_to=get_css_path,blank=True,null=True)
    jsFile = models.FileField(upload_to=get_js_path, blank=True, null=True)
    noOfViews = models.IntegerField(default=0,null=True)
    colors = models.IntegerField(default=0,null=True,blank=True)
    avgRating = models.IntegerField(default=0,null=True,blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)



class Component(models.Model):
    template_type = models.CharField(max_length=20, choices=templateChoice)
    description = models.TextField()
    htmlFile = models.FileField(upload_to='templates/html')
    cssFile = models.FileField(upload_to='templates/css')
    jsFile = models.FileField(upload_to='templates/js', blank=True)
    noOfViews = models.IntegerField(default=0)


class Rating(models.Model):
    template_id = models.ForeignKey(Template, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    rating = models.CharField(choices=ratingChoice, max_length=16)



class Comment(models.Model):
    template_id = models.ForeignKey(Template, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User,null=True, on_delete=models.CASCADE)
    comment = models.TextField()
    comment_time = models.DateTimeField(auto_now_add=True)


