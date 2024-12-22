
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
    if(request.method == 'POST'):
        
        return search(request)
    

    return render(request, 'repository/index.html', {'documents': documents})

def search(request):
    documents = Document.objects.all()
    if request.method == 'POST':
        city = request.POST['city']
        country = request.POST['country']
        major = request.POST['major']
        author = request.POST['author']
        advisor = request.POST['advisor']
        themes = request.POST['themes']
        year = request.POST['year']
        if(year != ''):
            documents = documents.filter(year=year)
        if(author != ''):
            documents = documents.filter(author=author)
        if(advisor != ''):
            documents = documents.filter(advisor=advisor)    
        if(city != ''):
            documents = documents.filter(city=city)
        if(country != ''):
            documents = documents.filter(country=country)
        if(major != ''):
            documents = documents.filter(major=major)
        if(themes != ''):
            documents = documents.filter(themes=themes)
        

        
        
        return render(request, 'repository/index.html', {'documents': documents})
    else:
        ()
        return render(request, 'repository/index.html', {'documents': documents})
