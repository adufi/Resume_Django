# Generated by Django 2.2.3 on 2019-07-25 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('www', '0008_auto_20190725_1137'),
    ]

    operations = [
        migrations.AddField(
            model_name='local',
            name='slug',
            field=models.CharField(default='', max_length=50),
        ),
    ]