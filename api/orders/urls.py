from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.getOrders, name='orders'),
    path('/add', views.addOrder, name='add_order'),

]