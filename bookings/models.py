from django.db import models

class Booking(models.Model):
    product_id = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    used_mileage = models.IntegerField(null=True)
    returned_at = models.DateField(null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)