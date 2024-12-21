from django.db import models
from django.shortcuts import render
# Create your models here.

#going to add the rest of the information for models here
class Document(models.Model):
    name = models.CharField(max_length=255)
    docfile = models.FileField(upload_to='documents/')
    def __str__(self):
        return self.name