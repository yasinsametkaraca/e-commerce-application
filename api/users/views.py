from typing import Dict, Any
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, UserSerializerWithToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes


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
    return Response(serializer.data)

    """ böyle return oluyor profil.
        "id": 3,
        "_id": 3,
        "username": "hatice",
        "email": "",
        "name": "",
        "isAdmin": true
    """
