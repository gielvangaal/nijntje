from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    formatted_date = serializers.SerializerMethodField()
    formatted_time = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'username', 'content', 'created_at', 'formatted_date', 'formatted_time']

    def get_formatted_date(self, obj):
        return obj.created_at.strftime('%d-%m-%Y')

    def get_formatted_time(self, obj):
        return obj.created_at.strftime('%H:%M')
