from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
from .serializers import ProductSerializer


@api_view(('GET',))
def getProducts(request):
    products = Product.objects.all()
    serializers = ProductSerializer(products, many=True)  # many=True diyerek birden fazla veri döndürüleceğini belirtiyoruz.
    return Response(serializers.data)  # serializers.data diyerek verileri döndürüyoruz.


@api_view(('GET',))
def getProduct(request, id):  # id parametresini url'den alıyoruz. Örneğin: http://127.0.0.1:8000/api/products/1/ şeklinde bir url oluşturduğumuzda id=1 olan ürünü döndürür.
    product = Product.objects.get(_id=id)
    serializers = ProductSerializer(product, many=False)
    return Response(serializers.data)