from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage


@receiver(post_save, sender=ContactMessage)
def send_contact_emails(sender, instance, created, **kwargs):
    if created:  # Only on new messages

        # --- Admin email ---
        admin_subject = f"New contact message from {instance.name}"
        admin_body = (
            f"Name: {instance.name}\n"
            f"Email: {instance.email}\n"
            f"Phone: {instance.phone}\n"
            f"Reason: {instance.reason.label if instance.reason else '—'}\n"
            f"Source: {instance.source.label if instance.source else '—'}\n\n"
            f"Message:\n{instance.message}"
        )
        send_mail(
            subject=admin_subject,
            message=admin_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.DEFAULT_FROM_EMAIL],  # or settings.ADMINS
            fail_silently=False,
        )

        # --- User thank-you email ---
        user_subject = "Thanks for contacting us"
        user_body = (
            f"Hello {instance.name},\n\n"
            "Thanks for reaching out to us. We’ve received your message and "
            "our team will get back to you soon.\n\n"
            "Best regards,\nReetha's Portfolio"
        )
        send_mail(
            subject=user_subject,
            message=user_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[instance.email],
            fail_silently=False,
        )



#newsletterfrom django.db.models.signals import post_save

from .models import NewsletterSubscriber

@receiver(post_save, sender=NewsletterSubscriber)
def send_newsletter_thankyou(sender, instance, created, **kwargs):
    if created:
        # --- Admin notification (optional) ---
        admin_subject = f"New newsletter subscription: {instance.email}"
        admin_body = f"New subscriber: {instance.email}\nSubscribed at: {instance.subscribed_at}"
        send_mail(
            subject=admin_subject,
            message=admin_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.DEFAULT_FROM_EMAIL],
            fail_silently=False,
        )

        # --- User thank-you email ---
        user_subject = "Thanks for subscribing to our newsletter"
        user_body = (
            f"Hello,\n\n"
            "Thanks for subscribing to our newsletter! You'll receive updates from Reetha's Portfolio.\n\n"
            "Best regards,\nReetha's Portfolio"
        )
        send_mail(
            subject=user_subject,
            message=user_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[instance.email],
            fail_silently=False,
        )
