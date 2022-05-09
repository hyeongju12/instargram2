from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models
from django.shortcuts import resolve_url

class User(AbstractUser):
	class GenderChoices(models.TextChoices):
		MALE = "M", '남성'
		FEMALE = "F", "여성"

	follower_set = models.ManyToManyField("self", blank=True)
	following_set = models.ManyToManyField("self", blank=True)
	website_url = models.URLField(blank=True)
	bio = models.TextField(blank=True)
	phone_number = models.CharField(max_length=14, validators=[RegexValidator(r'^010-?[\d]{4}-?[\d]{4}$')])
	gender = models.CharField(max_length=5, choices=GenderChoices.choices)
	profile = models.ImageField(blank=True, upload_to='accounts/profile/%Y/%m/%d',
								help_text = "48px * 48px 크기의 png/jpg를 넣어주세요. ")

	@property
	def name(self):
		return f"{self.first_name} {self.last_name}".strip()

	@property
	def avartar_url(self):
		if self.profile:
			return self.profile.url
		else:
			return resolve_url('pydenticon_image', self.username)