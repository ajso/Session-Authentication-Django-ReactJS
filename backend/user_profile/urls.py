from django.urls import path
from .views import *

urlpatterns = [
     path('user', GetUserProfileView.as_view(), name='user'),
     path('update', UpdateUserProfileView.as_view(), name='update'),
    
]
