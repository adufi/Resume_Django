from . import views
from django.urls import path, include

app_name = 'www'

urlpatterns = [
	path('', views.index, name='index'),
]
