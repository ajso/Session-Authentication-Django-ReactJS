from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, serializers
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

from django.contrib.auth.models import User
from django.contrib import auth

from user_profile.models import UserProfile
from .serializers import UserSerializer

# Create your views here.

# Checking if the user is authenticated
# @method_decorator(csrf_protect,name='dispatch') #makes sure its csrf protected.
class CheckAuthenticated(APIView):
    def get(self, request, format=None):
        user = self.request.user #getting an instance of a user
        try:
            isAuthenticated = user.is_authenticated
            if isAuthenticated:
                return Response({'isAuthenticated':'Success.'})
            else:
                return Response({'isAuthenticated':'Failed.'}) 
        except:
            return Response({'error':'Something went wrong while checking Authentication status.'})


@method_decorator(csrf_protect,name='dispatch')
class SignUpView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']
        re_password = data['re_password']

        try:
            if password == re_password:
                    if User.objects.filter(username=username).exists():
                        return Response({'error':'Username already exists.'})
                    else:
                        if len(password) < 6:
                            return Response({'error':'Password must be atleast 6 Characters.'})
                        else:
                            #creat_user() already saves the items 
                            user = User.objects.create_user(username=username, password=password)
                            # user.save(), not required
                            # creating a profile
                            user = User.objects.get(id=user.id) #getting the instance of the user
                            UserProfile.objects.create(user=user, first_name='', last_name='', phone='', city='')
                            # user_profile.save()

                            return Response({'success':'User created successfully.'})
            else:     
                return Response({'error':'Password do not match'})

        except:
            
            return Response({'error':'Something went wrong while creating an account.'})

#the login view
@method_decorator(csrf_protect,name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        # login, see if the username and password match
        try:
            user = auth.authenticate(username=username,password=password)
            if user is not None:
                auth.login(request, user)
                return Response({'success':'User successfully authenticated'})
            else:
                return Response({'error':'Error Authenticating user'})
        except:
            return Response({'error':'Something went wrong while logging in.'})


class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success':'User successfully logged Out'})
        except:
            return Response({'error':'Something went wrong while logging out'})


class DeleteAccountView(APIView):
    def delete(self, request, format=None):
        try:
            user = self.request.user
            #getting the user
            user = User.objects.filter(id=user.id).delete()
            return Response({'success':'User deleted successfully!'})
        except:
            return Response({'error':'Something went wrong while deleting User'})

# This will define ways of getting the csrf_token in the front end
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({'success':'CSRF cookie set.'})



class GetUserView(APIView):
    permission_classes =( permissions.AllowAny, )

    def get(self, request, format=None):
        users = User.objects.all()
        users = UserSerializer(users, many=True)
        return Response(users.data)