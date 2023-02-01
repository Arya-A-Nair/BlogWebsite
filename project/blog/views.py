from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .models import Blog,Category
from .serializer import BlogShortSerializer, BlogDetailSerializer

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_TopBlogs(request):
    Blogs=Blog.objects.order_by('-views')
    serializer=BlogShortSerializer(Blogs,many=True)
    if len(serializer.data)>5:
        return Response(serializer.data[5])
    return Response(serializer.data)
    
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_RecentBlogs(request):
    Blogs=Blog.objects.order_by('-created_at')
    serializer=BlogShortSerializer(Blogs,many=True)
    if len(serializer.data)>5:
        return Response(serializer.data[5])
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def getDetailedBlog(request):
    Blogs=Blog.objects.get(id=request.data['blog_id'])
    Blogs.views=Blogs.views+1
    Blogs.save()
    serializer=BlogDetailSerializer(Blogs,many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def AddBlog(request):
    user=request.user
    categoryList=request.data['category']
    category=Category.objects.filter(name__in=categoryList)
    print(category)
    blog=Blog.objects.create(title=request.data['title'],description=request.data['description'],authorName=user)
    blog.category.set(category)
    blog.save()
    serializer=BlogDetailSerializer(blog,many=False)
    return Response(serializer.data)
