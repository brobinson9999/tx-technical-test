from django.urls import path
from . import views

urlpatterns = [
    path('api/booking/', views.BookingListCreate.as_view() ),
    path('api/booking/<int:pk>', views.BookingRetrieveUpdateDestroy.as_view() ),
]