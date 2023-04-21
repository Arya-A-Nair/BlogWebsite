from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .models import Blog,Category
from .serializer import BlogShortSerializer, BlogDetailSerializer
from rest_framework.pagination import PageNumberPagination


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_TopBlogs(request):
    Blogs=Blog.objects.order_by('-views')
    serializer=BlogShortSerializer(Blogs,many=True)
    if len(serializer.data)>6:
        return Response(serializer.data[:6])
    return Response(serializer.data)
    
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_RecentBlogs(request):
    Blogs=Blog.objects.order_by('-created_at')
    serializer=BlogShortSerializer(Blogs,many=True)
    if len(serializer.data)>6:
        return Response(serializer.data[:6])
    return Response(serializer.data)


@api_view(['POST'])
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
    for i in categoryList:
        if not Category.objects.filter(name__contains=i).exists():
            Category.objects.create(name=i)
    blog=Blog.objects.create(title=request.data['title'],description=request.data['description'],authorName=user,content=request.data['content'])
    category=Category.objects.filter(name__in=categoryList)
    blog.category.set(category)
    blog.save()
    serializer=BlogDetailSerializer(blog,many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def updateBlog(request):
    user=request.user
    blog_id=request.data['blog_id']
    blog=Blog.objects.get(id=blog_id)
    if blog.authorName==user:    
        blog.title=request.data['title']
        blog.description=request.data['description']
        blog.content=request.data['content']
        blog.save()
        return Response({"status":True})
    else:
        return Response({"message":"You are not authorized to access this team"},status=401)




class BlogPagination(PageNumberPagination):
    page_size = 1
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def BlogList(request):
    blogs=Blog.objects.order_by('created_at')
    paginator=BlogPagination()
    paginated_blogs=paginator.paginate_queryset(blogs, request)
    serializer=BlogShortSerializer(paginated_blogs,many=True)
    return paginator.get_paginated_response(serializer.data)

