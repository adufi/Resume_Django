from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(Local)
admin.site.register(Social)
admin.site.register(Biography)
admin.site.register(MessagesBox)

admin.site.register(Tag)
admin.site.register(Link)
admin.site.register(Target)

admin.site.register(Skill)
admin.site.register(Project)

# admin.site.register(ProjectTag)
# admin.site.register(ProjectLink)
# admin.site.register(SkillTarget)