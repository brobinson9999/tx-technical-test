from django.db import models

class Product(models.Model):
    # Example input data:
    # {
    #   "code":"p1",
    #   "name":"Air Compressor 12 GAS",
    #   "type":"plain",
    #   "availability":true,
    #   "needing_repair":false,
    #   "durability":3000,
    #   "max_durability":3000,
    #   "mileage":null,
    #   "price": 4500,
    #   "minimum_rent_period":1
    # }

    # For the first version, I'll just copy the example input data:
    code = models.CharField(max_length=255,default="")
    name = models.CharField(max_length=255,default="")
    type = models.CharField(max_length=255,default="plain") # Could probably be shorter
    availability = models.BooleanField(default=True)
    needing_repair = models.BooleanField(default=False)
    durability = models.IntegerField()
    max_durability = models.IntegerField()
    mileage = models.IntegerField(null=True) # Used IntegerField here because all the sample data was in integers; it could easily be a float or decimal field
    price = models.IntegerField() # Used IntegerField here because all the sample data was in integers; it could easily be a float or decimal field
    minimum_rent_period = models.IntegerField() # In days

    created_at = models.DateTimeField(auto_now_add=True)