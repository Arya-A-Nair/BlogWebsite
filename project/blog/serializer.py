from rest_framework import serializers
from .models import Blog

class BlogShortSerializer(serializers.ModelSerializer):
    class Meta:
        model= Blog
        fields=['title','authorName','description','category','content','views','id']

class BlogDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Blog
        fields='__all__'