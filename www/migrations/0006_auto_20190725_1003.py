# Generated by Django 2.2.3 on 2019-07-25 14:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('www', '0005_auto_20190725_0932'),
    ]

    operations = [
        migrations.RenameField(
            model_name='projectlink',
            old_name='image',
            new_name='type',
        ),
    ]
