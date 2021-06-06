from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'code', 'name', 'type', 'availability', 'needing_repair', 'durability', 'max_durability', 'mileage', 'price', 'minimum_rent_period', 'created_at')
