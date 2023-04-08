from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.getALlOrders, name='orders'),
    path('add', views.addOrder, name='add_order'),
    path('user', views.getOrdersByUser, name='get_orders_by_user'),
    path('<str:pk>', views.getOrderById, name='order'),
]