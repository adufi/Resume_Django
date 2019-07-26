import json

from rest_framework import viewsets, generics

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from .models import *
from .serializers import *


default_local = 'fr'

# Create your views here.

def index(request):
	return index_local(request, default_local)


def index_local(request, local):
	if local not in  ['en', 'fr']:
		local = default_local


	bio = ''
	bio_o = Biography.objects.get(slug = 'biography')

	messages = []
	messages_o = MessagesBox.objects.order_by('index')

	social = Social.objects.order_by('index')

	skills = ''
	skills_o = Biography.objects.get(slug = 'skills')


	if local == 'en':
		bio = bio_o.content.en
		skills = skills_o.content.en

		for message in messages_o:
			messages.append(message.message.en)


	elif local == 'fr':
		bio = bio_o.content.fr
		skills = skills_o.content.fr

		for message in messages_o:
			messages.append(message.message.fr)



	template_name = 'www/index_' + local + '.html'

	return render(request, template_name, {'bio': bio, 'local': local, 'skills': skills, 'social': social, 'messages': messages})


def test(request):
	return render(request, 'www/test.html', {})



class ProjectViewSet(generics.ListAPIView):
	queryset = Project.objects.all().order_by('index')
	serializer_class = ProjectSerializer


class SkillViewSet(generics.ListAPIView):
	queryset = Skill.objects.all()
	serializer_class = SkillSerializer


class TargetViewSet(generics.ListAPIView):
	queryset = Target.objects.all()
	serializer_class = TargetSerializer


# Old - not used anymore
def api_skill(request):
	skills = {'data': [
		{'name': 'HTML', 		'level': {'en': 'high', 	'fr': 'elevé'}, 'targets': [{'en': 'web', 'fr': 'web'}]},
		{'name': 'CSS', 		'level': {'en': 'high', 	'fr': 'elevé'}, 'targets': [{'en': 'web', 'fr': 'web'}]},
		{'name': 'Javascript', 	'level': {'en': 'high', 	'fr': 'elevé'}, 'targets': [{'en': 'web', 'fr': 'web'}]},
		{'name': 'Python', 		'level': {'en': 'medium', 	'fr': 'moyen'}, 'targets': [{'en': 'web', 'fr': 'web'}, {'en': 'desktop', 'fr': 'bureau'}]},
		{'name': 'C++', 		'level': {'en': 'medium', 	'fr': 'moyen'}, 'targets': [{'en': 'desktop', 'fr': 'bureau'}]},
		{'name': 'React', 		'level': {'en': 'low', 		'fr': 'faible'}, 'targets': [{'en': 'web', 'fr': 'web'}]},
	]}

	return JsonResponse(skills)


def api_projects(request):
	projects = {'data': [
		{'title': 'Adapei', 'image': 'static/img/projects/adapei972.png', 
			'description': {
				'en': 'English', 
				'fr': 'Francais'
			}, 
			'tags': ['HTML', 'PHP'], 'links': [{'type': 'www', 'src': 'http://adapei972.fr/'}]},

		{'title': 'Tetris', 'image': 'static/img/projects/tetris.jpg', 
			'description': {
				'en': 'English', 
				'fr': 'Francais'
			}, 
			'tags': ['Python'], 'links': [{'type': 'github', 'src': 'https://github.com/adufi/Simple-Tetris-Python'}]},

		{'title': 'FreeMacGyver', 'image': 'static/img/projects/freemacgyver.png', 
			'description': {
				'en': "Project 3 by OpenClassrooms. Game coded in Python with pygame.", 
				'fr': "Projet 3 du parcous Python par OpenClassrooms. Jeu codé en Python avec pygame."
			}, 
			'tags': ['Python'], 'links': [{'type': 'github', 'src': 'https://github.com/adufi/FreeMacGyver'}]},

		{'title': 'Air-runaway', 'image': 'static/img/projects/air-runaway.png',
			'description': {
				'en': 'Air-runaway fut un petit projet d\'équipe réalisé à Supinfo. Le but était de promouvoir le parachutisme en Martinique.', 
				'fr': 'Air-runaway was a small team project made at Supinfo. The goal was to promote skydiving in Martinique.'
			}, 
			'tags': ['HTML', 'Javascript'], 'links': [{'type': 'github', 'src': 'https://github.com/adufi/air-runaway.com'}]},

		{'title': 'WindowSwitcher', 'image': 'static/img/projects/windowswitcher.PNG', 
			'description': {
				'en': "This program was originally used to navigate through several windows of a game I was using with an 18-button mouse. Now it allows to assign any process to a keyboard shortcut to restore them.", 
				'fr': "Ce programme servait à l'origine à naviguer parmis plusieurs fenêtres d'un jeu que j'utilisais avec une souris 18 bouttons. Maintenant il permet d'assigner n'importe quels processus à un raccourci clavier pour les restaurer."
			}, 
			'tags': ['Csharp'], 'links': [{'type': 'github', 'src': 'https://github.com/adufi/WindowSwitcher'}]},

		{'title': 'Eric-art', 'image': 'static/img/projects/eric-art.PNG', 
			'description': {
				'en': "Eric-art is a portfolio for my sister painter. The theme used is Sonar by Joefrer on Colorlib. Then was adapted in Python with the Flask framework. The site is still unfinished, it still lacks biographical texts.", 
				'fr': "Eric-art est un portfolio pour ma soeur peintre. Le thème utilisé est Sonar par Joefrer sur Colorlib. Puis a été adapté en Python avec le framework Flask. Le site est encore inaché, il manque encore des textes biographiques."
			}, 
			'tags': ['HTML', 'Javascript', 'Python'], 'links': [{'type': 'www', 'src': 'https://eric-art.herokuapp.com/'}, {'type': 'github', 'src': 'https://github.com/adufi/eric-art'}]},
	]}

	return JsonResponse(projects)

