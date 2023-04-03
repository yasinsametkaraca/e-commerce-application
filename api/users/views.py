from typing import Dict, Any

from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, UserSerializerWithToken
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET', ])
@permission_classes([IsAuthenticated, ])
def getUserProfile(request):
    user = request.user  # verilen tokena göre user bilgilerini alıyoruz.
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)     # böyle return oluyor profil = "id": 3,"_id": 3, "username": "hatice","email": "", "name": "","isAdmin": true


@api_view(['PUT'])
@permission_classes([IsAuthenticated, ])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['username']
    user.email = data['email']
    user.save()
    return Response(serializer.data)


@api_view(['GET', ])
@permission_classes([IsAdminUser, ])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST', ])
def registerUser(request):
    data = request.data  # requestten gelen datayı alıyoruz.
    try:
        user = User.objects.create_user(
            first_name=data['name'],
            username=data['username'],
            email=data['email'],
            password=data['password'],
        )

        serializer = UserSerializerWithToken(user, many=False)  # serializer ile datayı dönüyoruz. Token oluşması için UserSerializerWithToken kullanıyoruz.
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

