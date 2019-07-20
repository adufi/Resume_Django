from django.shortcuts import render

# Create your views here.

def index(request):
	return render(request, 'www/index.html', {})


def test(request):
	return render(request, 'www/test.html', {})