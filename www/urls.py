from django.urls import path, re_path, include

from . import views

app_name = 'www'



urlpatterns = [
	path('test', views.test, name='test'),

	# path('api/skill', views.api_skill, name = 'api_skill'),
	# path('api/projects', views.api_projects, name = 'api_projects'),

	path('api/skill', views.SkillViewSet.as_view(), name = 'api_skill'),
	path('api/target', views.TargetViewSet.as_view(), name = 'api_target'),
	path('api/projects', views.ProjectViewSet.as_view(), name = 'api_projects'),

	path('', views.index, name='index'),
	re_path(r'^(?P<local>[\w-]{2})/$', views.index_local, name='index_local'),

]
