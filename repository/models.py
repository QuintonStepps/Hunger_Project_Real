from django.db import models
from django.shortcuts import render
# Create your models here.

#going to add the rest of the information for models here
class Document(models.Model):
    name = models.CharField(max_length=255) 
    docfile = models.FileField(upload_to='documents/')
    year = models.CharField(max_length=5, null=True, blank=True)
    city = models.CharField(max_length=30, null=True, blank=True)
    country = models.CharField(max_length=30, null=True, blank=True)
    major = models.CharField(max_length=30, null=True, blank=True)
    author = models.CharField(max_length=30, null=True, blank=True)
    advisor = models.CharField(max_length=30, null=True, blank=True)
    themes = models.CharField(max_length=200, null=True, blank=True)


    def __str__(self):
        return self.name