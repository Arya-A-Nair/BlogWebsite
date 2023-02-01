from django.contrib import admin
from django.urls import path,include
from .views import get_Blogs
from rest_framework import routers


router=routers.DefaultRouter()
router.register('',get_Blogs)

urlpatterns = router.urls