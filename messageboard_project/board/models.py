from django.db import models

class Message(models.Model):
    username = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def formatted_date(self):
        return self.created_at.strftime('%d-%m-%Y')

    @property
    def formatted_time(self):
        return self.created_at.strftime('%H:%M')

    def __str__(self):
        return f"{self.username}: {self.content[:30]}"
