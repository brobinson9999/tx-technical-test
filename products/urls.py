from django.urls import path
from . import views

urlpatterns = [
    path('api/product/', views.ProductListCreate.as_view() ),
    path('api/product/<int:pk>', views.ProductRetrieveUpdateDestroy.as_view() ),
]