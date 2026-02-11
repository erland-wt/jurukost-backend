from django.urls import path
from .views import KostListAPIView, PredictPriceAPIView, KostMapListAPIView

urlpatterns = [
    path('kosts/', KostListAPIView.as_view(), name='kost-list'),
    path('kosts/map/', KostMapListAPIView.as_view(), name='kost-map'),
    path('predict/', PredictPriceAPIView.as_view(), name='predict-price'),
]