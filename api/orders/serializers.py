from rest_framework import serializers
from .models import Order, OrderItem, ShippingAddress
from users.serializers import UserSerializer


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)  # This is a list of OrderItem objects
    shippingAddress = serializers.SerializerMethodField(read_only=True)  # This is a single ShippingAddress object
    user = serializers.SerializerMethodField(read_only=True)  # This is a single User object

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()  # orderda orderItems diye field yok bu yüzden orderitem_set diye yazdım.
        serializer = OrderItemSerializer(items, many=True)  # many=True because it is a list of objects
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

