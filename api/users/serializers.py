from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)  # SerializerMethodField ile name alanını oluşturuyoruz. Burası bizim tanımladığımız bir isim.
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):  # get__id diyerek id alanını döndürüyoruz.
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name


class UserSerializerWithToken(UserSerializer):  # UserSerializerdan miras aldık.
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):  # get_token diyerek token alanını döndürüyoruz.
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    """       
        "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4MDUzMzMyOCwiaWF0IjoxNjgwNDQ2OTI4LCJqdGkiOiI0M2U3NjY3ZjZjZmU0MWQ0YjBlNzNhY2IxNmJlNzM3YSIsInVzZXJfaWQiOjF9.fKbzZs4gReqA8yCZaiVcenLyJfm43_KmRNOVczzTiy0",
        "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwNDQ3MjI4LCJpYXQiOjE2ODA0NDY5MjgsImp0aSI6ImVlMDIzNDU1MWNiODQ1MWQ4ZTFlMTIzMWVkNjI2MzljIiwidXNlcl9pZCI6MX0.rGVOhbpDwE5bRwQdqZZHk72eVbw8vXTcX3sShj7hjAo",
        "id": 1,
        "_id": 1,
        "username": "ysk",
        "email": "ysk@gmail.com",
        "name": "ysk@gmail.com",
        "isAdmin": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwNDQ3MjI4LCJpYXQiOjE2ODA0NDY5MjgsImp0aSI6Ijc5NGUyZTJkN2NhZDQwZjRhZDRlZDM0NzQzYTNhOTgzIiwidXNlcl9pZCI6MX0.lyGm30lHqm13bmRl5O03drjIiy_5857q6Ins9aHAeQ4"
    """