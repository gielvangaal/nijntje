from django.shortcuts import render, redirect
from .models import Message

def message_list(request):
    if request.method == 'POST':
        username = request.POST['username']
        content = request.POST['content']
        Message.objects.create(username=username, content=content)
        return redirect('message_list')
    
    messages = Message.objects.all().order_by('-created_at')
    return render(request, 'board/message_list.html', {'messages': messages})
