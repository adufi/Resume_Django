from django.db import models
from tinymce.models import HTMLField

# Create your models here.

class Test(models.Model):
	test = models.CharField(max_length = 20)


class Local(models.Model):
	en = HTMLField()
	fr = HTMLField()

	slug = models.CharField(max_length = 50, default = '')

	def __str__(self):
		return self.slug
		# return self.en[:20]


class MessagesBox(models.Model):
	active = models.BooleanField(default = True)
	message = models.ForeignKey(Local, related_name = 'message', on_delete = models.CASCADE)
	index = models.IntegerField(default = 0)

	def __str__(self):
		return self.message.en


class Social(models.Model):
	img = models.CharField(max_length = 200, default = '')
	src = models.CharField(max_length = 200, default = '')
	index = models.IntegerField(default = 0)

	def __str__(self):
		return self.src


class Biography(models.Model):
	slug = models.CharField(max_length = 50, default = '')
	active = models.BooleanField(default = True)
	content = models.ForeignKey(Local, related_name = 'content', on_delete = models.CASCADE)

	def __str__(self):
		return self.slug


# Project
#
class Tag(models.Model):
	tag = models.CharField(max_length = 50, default = '')

	def __str__(self):
		return self.tag


class Link(models.Model):
	src = models.CharField(max_length = 200, default = '')
	type = models.CharField(max_length = 200, default = '')

	def __str__(self):
		return self.src


class Project(models.Model):
	title = models.CharField(max_length = 50, default = '')
	image = models.CharField(max_length = 200, default = '')
	
	description = models.ForeignKey(Local, related_name = 'description', on_delete = models.CASCADE)
	
	links = models.ManyToManyField(Link)
	tags = models.ManyToManyField(Tag)

	index = models.IntegerField(default = 0)

	def __str__(self):
		return self.title


# Skill
#
class Target(models.Model):
	target = models.ForeignKey(Local, related_name = 'target', on_delete = models.CASCADE)

	def __str__(self):
		return self.target.en


class Skill(models.Model):
	name = models.CharField(max_length = 50, default = '')
	level = models.ForeignKey(Local, related_name = 'level', on_delete = models.CASCADE)
	targets = models.ManyToManyField(Target)

	def __str__(self):
		return self.name


# To remove
# class SkillTarget(models.Model):
# 	target = HTMLField()
# 	skill = models.ForeignKey(Skill, on_delete = models.CASCADE)

# 	def __str__(self):
# 		return self.target


# # To remove
# class ProjectLink(models.Model):
# 	src = models.CharField(max_length = 200, default = '')
# 	type = models.CharField(max_length = 200, default = '')
# 	project = models.ForeignKey(Project, on_delete = models.CASCADE)

# 	def __str__(self):
# 		return self.src


# # To remove
# class ProjectTag(models.Model):
# 	tag = models.CharField(max_length = 50, default = '')
# 	project = models.ForeignKey(Project, on_delete = models.CASCADE)

# 	def __str__(self):
# 		return self.tag
