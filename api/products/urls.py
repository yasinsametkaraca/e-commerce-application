from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.getProducts, name="products"),
    path('products/<str:id>/', views.getProduct, name="product"),
]