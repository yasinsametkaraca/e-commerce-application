from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('myproducts/', views.getMyProducts, name="products"),
    path('myproducts/<str:pk>/', views.getMyProduct, name="product"),
]