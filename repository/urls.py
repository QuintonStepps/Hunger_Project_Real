from django.urls import path
#. signifies the current directory
from . import views

urlpatterns = [
    
    #call views home function
    path('',views.test),
    path('repository/upload/',views.upload),
    
    path('index/',views.index),
]
