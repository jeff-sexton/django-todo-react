"""Module providingFunction defining ToDo Model Class"""
from django.db import models


class Todo(models.Model):
    """Class representing a ToDo"""

    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title
