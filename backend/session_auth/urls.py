from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('users/', include('users.urls')),
    path('profile/', include('user_profile.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# all react routes to caught here (*)
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
