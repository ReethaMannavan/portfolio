from rest_framework import serializers
from .models import HeroSection, NavbarConfig

#herosection
class HeroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = "__all__"

#navbar
class NavbarConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavbarConfig
        fields = "__all__"


#footer
from rest_framework import serializers
from .models import Footer

class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footer
        fields = "__all__"


#slider
from rest_framework import serializers
from .models import HeroSlide

class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = "__all__"



#contactpage

# home/serializers.py
from rest_framework import serializers
from .models import ContactInfo, ContactReason, ContactSource, ContactMessage
import re

PHONE_RE = re.compile(r"^\+?\d{7,15}$")  # flexible international; change to stricter if you want

class ContactReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactReason
        fields = ["id", "label"]

class ContactSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSource
        fields = ["id", "label"]

class ContactInfoSerializer(serializers.ModelSerializer):
    map_image_url = serializers.SerializerMethodField()

    class Meta:
        model = ContactInfo
        fields = ["address", "website", "phone", "map_image_url"]

    def get_map_image_url(self, obj):
        request = self.context.get("request")
        if obj.map_image:
            url = obj.map_image.url
            return request.build_absolute_uri(url) if request else url
        return ""

class ContactMessageSerializer(serializers.ModelSerializer):
    # serializer for creating messages with validation
    reason = serializers.PrimaryKeyRelatedField(queryset=ContactReason.objects.all())
    source = serializers.PrimaryKeyRelatedField(queryset=ContactSource.objects.all())

    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "phone", "reason", "source", "message", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Name cannot be empty.")
        if len(value) < 2:
            raise serializers.ValidationError("Name is too short.")
        return value

    def validate_email(self, value):
        return value.lower()

    def validate_phone(self, value):
        v = value.strip()
        if not PHONE_RE.match(v):
            raise serializers.ValidationError("Phone must be numeric, between 7 and 15 digits, and can include leading +.")
        return v

    def validate_message(self, value):
        v = value.strip()
        if len(v) < 10:
            raise serializers.ValidationError("Message is too short (minimum 10 characters).")
        if len(v) > 5000:
            raise serializers.ValidationError("Message too long.")
        return v

    def validate(self, data):
        # ensure reason and source exist (PrimaryKeyRelatedField does)
        return data






#projectpage
# portfolio/serializers.py
from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ["id", "title", "description", "image_url", "github_link", "deployed_link", "category"]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image:
            url = obj.image.url
            return request.build_absolute_uri(url) if request else url
        return ""



#skillspage
from rest_framework import serializers
from .models import Skill, PortfolioStat

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name", "icon_class", "proficiency", "order"]

class PortfolioStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioStat
        fields = ["id", "label", "value", "order"]


#serializer
from rest_framework import serializers
from .models import NewsletterSubscriber

class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ["id", "email", "subscribed_at"]
        read_only_fields = ["id", "subscribed_at"]
