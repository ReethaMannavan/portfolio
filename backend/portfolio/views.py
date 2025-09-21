from rest_framework import viewsets
from .models import HeroSection, NavbarConfig
from .serializers import HeroSectionSerializer, NavbarConfigSerializer

#herosection
class HeroSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroSection.objects.filter(is_active=True).order_by("-id")[:1]
    serializer_class = HeroSectionSerializer

#navbar
class NavbarConfigViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NavbarConfig.objects.all()[:1]
    serializer_class = NavbarConfigSerializer


#footer
from rest_framework import viewsets
from .models import Footer
from .serializers import FooterSerializer

class FooterViewSet(viewsets.ModelViewSet):
    queryset = Footer.objects.all()
    serializer_class = FooterSerializer


#slider
from rest_framework import viewsets
from .models import HeroSlide
from .serializers import HeroSlideSerializer

class HeroSlideViewSet(viewsets.ModelViewSet):
    queryset = HeroSlide.objects.filter(is_active=True)
    serializer_class = HeroSlideSerializer



#contact
# home/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ContactInfo, ContactReason, ContactSource, ContactMessage
from .serializers import (
    ContactInfoSerializer, ContactReasonSerializer,
    ContactSourceSerializer, ContactMessageSerializer
)

class ContactConfigView(APIView):
    """
    GET -> returns contact info, reasons, sources
    """
    def get(self, request):
        info = ContactInfo.objects.first()
        info_ser = ContactInfoSerializer(info, context={"request": request}) if info else {}
        reasons = ContactReasonSerializer(ContactReason.objects.all(), many=True).data
        sources = ContactSourceSerializer(ContactSource.objects.all(), many=True).data
        return Response({
            "contact_info": info_ser.data if info else {},
            "reasons": reasons,
            "sources": sources
        })

class ContactSubmitView(APIView):
    """
    POST -> accepts form submission, validates, saves
    (emails are handled by signals.py)
    """
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()  # ✅ this triggers post_save signal

        return Response(
            {"detail": "Message received. We'll contact you soon."},
            status=status.HTTP_201_CREATED,
        )



#projectpage
# portfolio/views.py
from rest_framework import generics
from .models import Project
from .serializers import ProjectSerializer

class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer




#skillspage
from rest_framework import viewsets
from .models import Skill, PortfolioStat
from .serializers import SkillSerializer, PortfolioStatSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class PortfolioStatViewSet(viewsets.ModelViewSet):
    queryset = PortfolioStat.objects.all()
    serializer_class = PortfolioStatSerializer


#newsletter
from rest_framework import generics, status
from rest_framework.response import Response
from .models import NewsletterSubscriber
from .serializers import NewsletterSerializer

class NewsletterSubscribeView(generics.CreateAPIView):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({"detail": "Subscribed successfully. Check your email!"}, status=status.HTTP_201_CREATED)
