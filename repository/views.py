
from django.shortcuts import render
from django.http import Http404
from django.http import HttpResponse, FileResponse

from HNGER.settings import MEDIA_URL

from .models import Document

from pathlib import Path
import os



# Create your views here.
def test(request):


    return render(request, 'repository/test.html')


def upload(request):
    if(request.method == 'POST'):
        print('uploading file')
    if ('pdf_file' in request.FILES):
        pdf_file = request.FILES['pdf_file']
        city = request.POST['city']
        country = request.POST['country']
        major = request.POST['major']
        author = request.POST['author']
        advisor = request.POST['advisor']
        themes = request.POST['themes']
        year = request.POST['year']
        
        
        
        Document.objects.create(name=pdf_file.name, docfile=pdf_file, year = year, city = city, country = country, major = major, author = author, advisor = advisor, themes = themes)
        
    return render(request, 'repository/upload.html')

def index(request):
    documents = Document.objects.all()
    

    return render(request, 'repository/index.html', {'documents': documents})


