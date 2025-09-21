from django.db import models

class HeroSection(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="hero/")
    button_text = models.CharField(max_length=50, blank=True, null=True)
    button_link = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class NavbarConfig(models.Model):
    logo = models.ImageField(upload_to="navbar/", blank=True, null=True)
    text = models.CharField(max_length=100, default="MyPortfolio")
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.text


#footersection
from django.db import models

class Footer(models.Model):
    name = models.CharField(max_length=100, default="MyPortfolio")
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    
    # Optional social links
    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    
    # Only one instance
    def save(self, *args, **kwargs):
        if not self.pk and Footer.objects.exists():
            raise ValueError("Only one Footer instance allowed")
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.name


#slider
from django.db import models

class HeroSlide(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="hero_slides/")
    button_text = models.CharField(max_length=50, blank=True, null=True)
    button_link = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title



#contactform

from django.db import models

class ContactInfo(models.Model):
    # singleton-ish: your address/website/phone, map image uploaded via admin
    address = models.TextField()
    website = models.URLField(blank=True, null=True)
    phone = models.CharField(max_length=30)
    map_image = models.ImageField(upload_to="contact/map_images/", blank=True, null=True)

    def __str__(self):
        return "Contact Info"

class ContactReason(models.Model):
    # dropdown options for "Reason to Contact"
    label = models.CharField(max_length=120)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label

class ContactSource(models.Model):
    # dropdown options for "How did you find out about us?"
    label = models.CharField(max_length=120)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label

class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    reason = models.ForeignKey(ContactReason, on_delete=models.SET_NULL, null=True, blank=True)
    source = models.ForeignKey(ContactSource, on_delete=models.SET_NULL, null=True, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    handled = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} <{self.email}> - {self.created_at:%Y-%m-%d %H:%M}"



#projects

# portfolio/models.py
from django.db import models

class ProjectCategory(models.TextChoices):
    DJANGO_REACT = "Django+React", "Django + React"
    REACT_ONLY = "React", "React Only"
    HTML_CSS = "HTML/CSS", "HTML/CSS"

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="projects/")
    github_link = models.URLField(blank=True, null=True)
    deployed_link = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=20, choices=ProjectCategory.choices)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return self.title



#skillspage
from django.db import models

# ------------------- Skills -------------------
class Skill(models.Model):
    name = models.CharField(max_length=50)
    icon_class = models.CharField(
        max_length=50,
        blank=True,
        help_text="Icon name or class to render on frontend"
    )
    proficiency = models.PositiveSmallIntegerField(default=50)  # 0-100
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name

# ------------------- Stats / Achievements -------------------
class PortfolioStat(models.Model):
    label = models.CharField(max_length=50)  # e.g., "Mini Projects"
    value = models.CharField(max_length=20) # e.g., "12+" (string to allow +)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.label} ({self.value})"



#newsletter
from django.db import models

class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
