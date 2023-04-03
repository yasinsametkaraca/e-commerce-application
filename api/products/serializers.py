from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProductSerializer(serializers.ModelSerializer):  # ModelSerializer kullanarak modelimizi çağırıyoruz. ProductSerializerin amacı modelimizi json formatına çevirmek.
    categoryName = serializers.SerializerMethodField('get_categoryName')

    def get_categoryName(self, obj):
        if obj.category_id:
            return obj.category.name

    class Meta:
        model = Product
        fields = '__all__'  # or fields = ('id', 'name', 'price', 'image', 'description', 'brand', 'category', 'countInStock', 'rating', 'numReviews', 'createdAt', 'updatedAt') diyerek istediğin alanları çağırabiliriz.
