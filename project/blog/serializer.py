from rest_framework import serializers
from .models import Blog,Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=['name']

class BlogShortSerializer(serializers.ModelSerializer):
    category=CategorySerializer(read_only=True,many=True) 
    class Meta:
        model= Blog
        fields=['title','authorName','description','category','content','views','id']

class BlogDetailSerializer(serializers.ModelSerializer):
    category=CategorySerializer(read_only=True,many=True) 

    class Meta:
        model=Blog
        fields='__all__'