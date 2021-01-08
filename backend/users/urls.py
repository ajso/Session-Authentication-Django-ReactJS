from django.urls import path
from .views import *


urlpatterns = [
    path('authenticated', CheckAuthenticated.as_view(), name='authenticated'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('register', SignUpView.as_view(), name='register'),
    path('users', GetUserView.as_view(), name='all_users'),
    path('delete_account', DeleteAccountView.as_view(), name='delete_account'),
    path('csrf_cookie', GetCSRFToken.as_view(), name='csrf_cookie')
]
