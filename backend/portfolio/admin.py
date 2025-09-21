# portfolio/admin.py
from django.contrib import admin
from .models import (
    HeroSection, NavbarConfig, Footer, HeroSlide,
    ContactInfo, ContactReason, ContactSource, ContactMessage,
    Project
)
from django.utils.html import format_html

# --- Hero Section ---
@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active", "preview_image")
    list_editable = ("is_active",)
    search_fields = ("title",)

    def preview_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width:100px; height:auto;" />', obj.image.url)
        return "-"
    preview_image.short_description = "Image Preview"


# --- Navbar ---
@admin.register(NavbarConfig)
class NavbarConfigAdmin(admin.ModelAdmin):
    list_display = ("text", "phone", "email", "logo_preview")

    def logo_preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" style="width:80px; height:auto;" />', obj.logo.url)
        return "-"
    logo_preview.short_description = "Logo"


# --- Footer (singleton-ish) ---
@admin.register(Footer)
class FooterAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "email", "github", "linkedin", "twitter")

    def has_add_permission(self, request):
        # Allow only one instance
        if Footer.objects.exists():
            return False
        return True


# --- Hero Slides ---
@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "is_active", "preview_image")
    list_editable = ("order", "is_active")
    ordering = ("order",)

    def preview_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width:100px; height:auto;" />', obj.image.url)
        return "-"
    preview_image.short_description = "Image Preview"


# --- Contact ---
@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ("address", "phone", "website", "map_preview")

    def map_preview(self, obj):
        if obj.map_image:
            return format_html('<img src="{}" style="width:120px; height:auto;" />', obj.map_image.url)
        return "-"
    map_preview.short_description = "Map Preview"

@admin.register(ContactReason)
class ContactReasonAdmin(admin.ModelAdmin):
    list_display = ("label", "order")
    ordering = ("order",)

@admin.register(ContactSource)
class ContactSourceAdmin(admin.ModelAdmin):
    list_display = ("label", "order")
    ordering = ("order",)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "reason", "source", "handled", "created_at")
    list_editable = ("handled",)
    list_filter = ("handled", "created_at")
    search_fields = ("name", "email", "message")


# --- Projects ---
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "created_at", "preview_image", "github_link", "deployed_link")
    list_filter = ("category",)
    search_fields = ("title", "description")

    def preview_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width:100px; height:auto;" />', obj.image.url)
        return "-"
    preview_image.short_description = "Image Preview"




#skillspage
from django.contrib import admin
from .models import Skill, PortfolioStat

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ["name", "proficiency", "order"]
    list_editable = ["proficiency", "order"]
    ordering = ["order"]

@admin.register(PortfolioStat)
class PortfolioStatAdmin(admin.ModelAdmin):
    list_display = ["label", "value", "order"]
    list_editable = ["value", "order"]
    ordering = ["order"]
