from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('id', 'product_id', 'start_date', 'end_date', 'returned_at', 'used_mileage', 'created_at')
