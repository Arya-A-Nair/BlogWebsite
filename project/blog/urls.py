from django.urls import path,include
from .views import  get_RecentBlogs, get_TopBlogs,getDetailedBlog, AddBlog,updateBlog,BlogList



urlpatterns=[
    path('getRecentBlog/',get_RecentBlogs),
    path('getTopBlog/',get_TopBlogs),
    path('getDetailBlog/',getDetailedBlog),
    path('addBlog/',AddBlog),
    path('updateBlog/',updateBlog),
    path('getBlogList/',BlogList)
]