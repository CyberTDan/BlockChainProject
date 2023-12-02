from django.shortcuts import render

def index(request):
    template = "marketplace/index.html"

    context = {}

    return render(request, template, context)
