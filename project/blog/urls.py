from django.contrib import admin
from django.urls import path,include
from .views import  get_RecentBlogs, get_TopBlogs,getDetailedBlog, AddBlog
from rest_framework import routers



urlpatterns=[
    path('getRecentBlog/',get_RecentBlogs),
    path('getTopBlog/',get_TopBlogs),
    path('getDetailBlog/',getDetailedBlog),
    path('addBlog/',AddBlog)
]