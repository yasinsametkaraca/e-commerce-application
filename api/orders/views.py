from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Order, ShippingAddress, OrderItem
from .serializers import OrderSerializer
from products.models import Product


@api_view(['POST', ])
@permission_classes([IsAuthenticated], )
def addOrder(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']
    if orderItems and len(orderItems) == 0:  # orderda order item yoksa hata ver.
        return Response({'detail': 'No order items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1. Create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )
        # 2. Create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
            shippingPrice=data['shippingPrice'],
        )

        # 3. Create order items and set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                quantity=i['quantity'],
                price=i['price'],
                image=product.image.url
            )
            # 4. Update stock
            if (product.countInStock - item.quantity) < 0:
                product.countInStock = 0
            else:
                product.countInStock -= item.quantity
            product.save()

    shipping.save()
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)  # OrderSerializerdaki tanımladığımız gibi dönüyoruz.


@api_view(['GET', ])
@permission_classes([IsAuthenticated, IsAdminUser])
def getALlOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET', ])
@permission_classes([IsAuthenticated], )
def getOrderById(request, pk):  # id'ye göre tek order getir.
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_403_FORBIDDEN)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', ])
@permission_classes([IsAuthenticated], )
def getOrdersByUser(request):  # user'a ait orderları getir.
    user = request.user
    orders = Order.objects.filter(user=user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

