# Generated by Django 2.2.3 on 2019-07-25 16:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('www', '0009_local_slug'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='projecttag',
            name='project',
        ),
        migrations.RemoveField(
            model_name='skilltarget',
            name='skill',
        ),
        migrations.DeleteModel(
            name='ProjectLink',
        ),
        migrations.DeleteModel(
            name='ProjectTag',
        ),
        migrations.DeleteModel(
            name='SkillTarget',
        ),
    ]
