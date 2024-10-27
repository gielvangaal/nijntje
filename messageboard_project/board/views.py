from django.shortcuts import render, redirect
from django.contrib import messages  # Voor flash messages
from .models import Message
from rest_framework import generics
from .serializers import MessageSerializer
from django.utils import timezone

def message_list(request):
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        content = request.POST.get('content', '').strip()
        
        if username and content:  # Basisvalidatie
            Message.objects.create(username=username, content=content)
            messages.success(request, "Bericht succesvol geplaatst!")  # Feedback aan de gebruiker
        else:
            messages.error(request, "Zorg ervoor dat je een naam en een bericht invoert.")
        
        return redirect('message_list')
    
    # Haal alle berichten op en formatteer de datum en tijd
    messages = Message.objects.all().order_by('-created_at')
    formatted_messages = []
    for message in messages:
        formatted_messages.append({
            'username': message.username,
            'content': message.content,
            'formatted_date': message.created_at.strftime('%d-%m-%Y'),
            'formatted_time': message.created_at.strftime('%H:%M')
        })
    
    return render(request, 'board/message_list.html', {'messages': formatted_messages})

# API 
class MessageListCreate(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer