from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)  # if user is deleted, set this field to null
    name = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/default.png')
    brand = models.CharField(max_length=100, null=True, blank=True)
    category = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    reviewsCount = models.IntegerField(null=True, blank=True, default=0)
    price = models.FloatField(null=True, blank=True, )
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class Comment(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)
