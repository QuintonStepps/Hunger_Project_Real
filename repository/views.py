
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
        
        
        print(f'Uploaded file name: {pdf_file.name}')
        
        Document.objects.create(name=pdf_file.name, docfile=pdf_file)
        
    return render(request, 'repository/upload.html')

def index(request):
    documents = Document.objects.all()
    print("Bingo")
    print(MEDIA_URL)

    return render(request, 'repository/index.html', {'documents': documents})


def download(request):
    documents = Document.objects.all()
    document = documents.get(name="TestDoc.pdf")
    
  #  file_path = os.path.join(settings.MEDIA_ROOT, path)
    file_path = '/documents/TestDoc.pdf'
    if os.path.exists(file_path):
        print("This far")
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/force-download")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response
    return render(request, 'repository/download.html')