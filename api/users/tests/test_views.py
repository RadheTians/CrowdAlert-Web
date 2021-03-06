import json
import uuid

from django.conf import settings
from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate

from api.firebase_auth.users import FirebaseUser
from api.users.models import User
from api.users.views import UserView
from api.utils.firebase_utils import delete_collection, get_authenticated_user_token

db = settings.FIRESTORE


class UserViewTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.auth_token = get_authenticated_user_token()
        self.test_uuid = str(uuid.uuid4())
        firebase_data = {
            'uid': self.test_uuid,
            'user_id': self.test_uuid,
            'name': 'display name',
            'picture': '',
            'email_verified': True
        }
        self.user = FirebaseUser(firebase_data)
        u = User(self.test_uuid, 'display name', photo_url='')
        u.save(db)

    def test_get(self):
        request = self.factory.get('/api/users/user?key=home_location', data=None)
        force_authenticate(request, user=self.user, token=self.auth_token)
        response = UserView.as_view()(request)
        self.assertEqual(response.status_code, 200)

    def test_post(self):
        data = json.dumps({"userData": '{ "displayName": "display name" }'})
        request = self.factory.post('/api/users/user', data=data, content_type='application/json')
        force_authenticate(request, self.user, self.auth_token)
        response = UserView.as_view()(request)
        self.assertEqual(response.status_code, 200)

    def tearDown(self):
        print('Cleaning up users')
        delete_collection(db.collection(User.collection_name))
