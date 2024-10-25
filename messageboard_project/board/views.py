from django.shortcuts import render, redirect
from .models import Message
from rest_framework import generics
from .serializers import MessageSerializer

# UNCLEAR
def message_list(request):
    if request.method == 'POST':
        username = request.POST['username']
        content = request.POST['content']
        Message.objects.create(username=username, content=content)
        return redirect('message_list')
    
    messages = Message.objects.all().order_by('-created_at')
    return render(request, 'board/message_list.html', {'messages': messages})

# API 
class MessageListCreate(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer