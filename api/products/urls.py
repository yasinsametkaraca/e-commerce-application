from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.getProducts, name="products"),
    path('<str:id>/', views.getProduct, name="product"),
]