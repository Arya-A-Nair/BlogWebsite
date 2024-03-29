from django.db import models
from django.contrib.auth import get_user_model

User=get_user_model()
# Create your models here.

class Category(models.Model):
    name=models.TextField(unique=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural="categories"


class Blog(models.Model):
    title=models.TextField(name="title")
    created_at=models.DateTimeField(auto_now_add=True,name="created_at")
    authorName=models.ForeignKey(User,related_name="created_by",on_delete=models.DO_NOTHING)
    description=models.TextField()
    category=models.ManyToManyField(Category,related_name='categories')
    content=models.TextField()
    views=models.IntegerField(default=0)
    image=models.ImageField(upload_to='title_image/')
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering=['-created_at']
    