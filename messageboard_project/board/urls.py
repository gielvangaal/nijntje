from django.urls import path
from . import views
from .views import MessageListCreate

urlpatterns = [
    path('', views.message_list, name='message_list'),
    path('api/messages/', MessageListCreate.as_view(), name='message-list-create'),
]
