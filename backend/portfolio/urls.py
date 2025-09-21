from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    HeroSectionViewSet, NavbarConfigViewSet, FooterViewSet, HeroSlideViewSet,
    ContactConfigView, ContactSubmitView, ProjectListView
)
from .views import SkillViewSet, PortfolioStatViewSet
from .views import NewsletterSubscribeView

router = DefaultRouter()
router.register(r'hero', HeroSectionViewSet, basename='hero')
router.register(r'navbar', NavbarConfigViewSet, basename='navbar')
router.register(r'footer', FooterViewSet, basename='footer')
router.register(r'hero-slides', HeroSlideViewSet, basename='hero-slides')
router.register(r"skills", SkillViewSet, basename="skills")
router.register(r"stats", PortfolioStatViewSet, basename="stats")


urlpatterns = router.urls + [
    path("contact/config/", ContactConfigView.as_view(), name="contact-config"),
    path("contact/submit/", ContactSubmitView.as_view(), name="contact-submit"),
    path("projects/", ProjectListView.as_view(), name="project-list"), 
     path("newsletter/subscribe/", NewsletterSubscribeView.as_view(), name="newsletter-subscribe"),
]
