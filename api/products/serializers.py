from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product


class ProductSerializer(serializers.ModelSerializer):  # ModelSerializer kullanarak modelimizi çağırıyoruz. ProductSerializerin amacı modelimizi json formatına çevirmek.
    class Meta:
        model = Product
        fields = '__all__'  # or fields = ('id', 'name', 'price', 'image', 'description', 'brand', 'category', 'countInStock', 'rating', 'numReviews', 'createdAt', 'updatedAt') diyerek istediğin alanları çağırabiliriz.
