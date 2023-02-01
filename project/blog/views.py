from django.shortcuts import render

from rest_framework import permissions, viewsets
from rest_framework.response import Response
from .models import Blog
from .serializer import BlogShortSerializer

class get_Blogs(viewsets.ModelViewSet):
    permission_classes=[permissions.IsAuthenticated]
    queryset=Blog.objects.all()
    serializer_class=BlogShortSerializer

    def get_queryset(self):
        # print(Blog.objects.all())
        return self.queryset
    


