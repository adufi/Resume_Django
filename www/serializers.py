from rest_framework import serializers

from .models import *

class LocalSerializer(serializers.ModelSerializer):

	class Meta:
		model = Local
		fields = ('slug', 'en', 'fr')


class TagSerializer(serializers.ModelSerializer):

	# tag = models.CharField(max_length = 50, default = '')

	class Meta:
		model = Tag
		fields = '__all__'


class LinkSerializer(serializers.ModelSerializer):

	# src = models.CharField()
	# type = models.CharField()

	class Meta:
		model = Link
		fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):

		# title = models.CharField()
		# image = models.CharField()
		
		# description = models.ForeignKey()
		
		# links = models.ManyToManyField()
		# tags = models.ManyToManyField()

		# index = models.IntegerField()

	# description = serializers.RelatedField(many = True, read_only = True)
	description = LocalSerializer()
	links = LinkSerializer(many = True)
	tags = serializers.StringRelatedField(many = True)

	class Meta:
		model = Project
		# fields = '__all__'
		fields = ['title', 'image', 'description', 'links', 'tags', 'index']


class TargetSerializer(serializers.ModelSerializer):

	target = LocalSerializer()

	class Meta:
		model = Target
		fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):

	# name = models.CharField(max_length = 50, default = '')
	# level = models.ForeignKey(Local, related_name = 'level', on_delete = models.CASCADE)
	# targets = models.ManyToManyField(Target)

	level = LocalSerializer()
	targets = TargetSerializer(many = True)
	# targets = serializers.StringRelatedField(many = True)

	class Meta:
		model = Skill
		fields = '__all__'