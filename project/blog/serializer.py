from rest_framework import serializers
from .models import Blog,Category
from django.contrib.auth import get_user_model

User=get_user_model()

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=['name']

class BlogShortSerializer(serializers.ModelSerializer):
    category=CategorySerializer(read_only=True,many=True) 
    authorName=serializers.CharField(source="authorName.username")
    class Meta:
        model= Blog
        fields=['title','authorName','description','category','views','id','image']

class BlogDetailSerializer(serializers.ModelSerializer):
    category=CategorySerializer(read_only=True,many=True) 
    image = serializers.ImageField(max_length=None,allow_empty_file=False, allow_null=True, required=False)
    authorName=serializers.CharField(source="authorName.username")

    class Meta:
        model=Blog
        fields='__all__'