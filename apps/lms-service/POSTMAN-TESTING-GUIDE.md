# 🎓 LMS Service — Postman Testing Guide

## 📥 Import the Collection

1. Open **Postman**
2. Click **Import** (top-left)
3. Select `LMS-Service-Postman-Collection.json` from this directory
4. Done! The collection "🎓 LMS Service API" will appear in your sidebar.

---

## ⚙️ Collection Variables (Pre-configured)

The collection uses variables so you don't have to update URLs manually.
After importing, go to the collection → **Variables** tab to review:

| Variable | Default | Description |
|---|---|---|
| `baseUrl` | `http://localhost:3002` | LMS service URL |
| `teacherUserId` | `1` | Teacher's numeric ID |
| `teacherRole` | `teacher` | Role for teacher header |
| `adminRole` | `admin` | Role for admin header |
| `courseId` | `1` | Updated automatically after Create Course |
| `sectionId` | `1` | Updated automatically after Create Section |
| `lessonId` | `1` | Updated automatically after Create Lesson |
| `bunnyVideoId` | `your-bunny-video-guid` | Updated automatically after Upload Session |

> ✅ **Pro Tip:** Many requests have **Tests** scripts that auto-save IDs (courseId, sectionId, etc.) into variables after a successful create. Just run them in order!

---

## 🔑 Authentication Model

This service uses **gateway-style header authentication** — no JWT needed in Postman:

```
x-user-id:   <numeric user ID>
x-user-role: teacher | admin | user
```

The `RolesGuard` validates these headers. Only `POST /course` currently enforces role checking (`teacher` role required).

### Role Reference

| Role Value | Access Level |
|---|---|
| `teacher` | Create courses, access protected endpoints |
| `admin` | Admin access to protected endpoints |
| `user` | Regular user (will get 403 on protected endpoints) |

---

## 🗺️ All API Endpoints

### 🏥 Health Check
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/lms` | None | Basic health check |
| GET | `/lms/lms` | Teacher/Admin headers | Secure LMS check |

### 👩‍🏫 Teacher (`/teacher`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/teacher/create` | None | Create teacher profile |
| GET | `/teacher` | None | Get all teachers |
| GET | `/teacher/:id` | None | Get teacher by ID |
| PATCH | `/teacher/:id` | None | Update teacher |
| DELETE | `/teacher/:id` | None | Delete teacher |

### 👨‍🎓 Student (`/student`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/student/create` | None | Create student profile |
| GET | `/student` | None | Get all students |
| GET | `/student/:id` | None | Get student by ID |
| PATCH | `/student/:id` | None | Update student |
| DELETE | `/student/:id` | None | Delete student |

### 📚 Course (`/course`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/course` | **x-user-id + x-user-role: teacher** | Create course |
| GET | `/course` | None | Get all courses |
| GET | `/course/teacher-created` | x-user-id header | Get teacher's courses |
| GET | `/course/:id` | None | Get course by ID |
| PATCH | `/course/:id` | None | Update course |
| DELETE | `/course/:id` | None | Delete course |

### 📂 Section (`/section`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/section` | None | Create section |
| GET | `/section` | None | Get all sections |
| GET | `/section/teacher-created` | x-user-id header | Get teacher's sections |
| GET | `/section/:id` | None | Get section by ID |
| PATCH | `/section/:id` | None | Update section |
| DELETE | `/section/:id` | None | Delete section |

### 🎬 Lesson (`/lessons`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/lessons` | None | Create lesson (manual) |
| POST | `/lessons/upload-session` | None | Start Bunny upload session |
| POST | `/lessons/:id/replace-video` | None | Replace lesson video |
| POST | `/lessons/bunny-webhook` | None (webhook) | Bunny.net status webhook |
| GET | `/lessons` | None | Get all lessons |
| GET | `/lessons/:id` | None | Get lesson by ID |
| PATCH | `/lessons/:id` | None | Update lesson |
| DELETE | `/lessons/:id` | None | Delete lesson |

---

## 🚀 Recommended Testing Order

### Quick Test (All Working?)
1. **GET** `/lms` → Should return 200 "Hello LMS"
2. **GET** `/course` → Should return 200 with empty array `[]`

### Full Manual Flow
Follow the **🔁 End-to-End Flow** folder in Postman — it runs steps in order and auto-saves variables.

Or manually:

```
Step 1: POST /teacher/create          → Creates teacher
Step 2: POST /course                  → Creates course (use teacher headers!)
Step 3: POST /section                 → Creates section (use courseId from step 2)
Step 4: POST /lessons                 → Creates article lesson
Step 5: POST /lessons/upload-session  → Gets Bunny upload URL
Step 6: [Upload video to Bunny TUS URL externally]
Step 7: POST /lessons/bunny-webhook   → Simulate encoding finished
Step 8: GET /lessons/:id              → Verify status = 'published' and fileUrl is set
```

---

## 📡 Bunny.net Webhook Testing

The webhook simulates what Bunny.net sends after encoding:

```json
{
  "VideoGuid": "<bunny-video-guid>",
  "Status": 3
}
```

**Status codes:**
- `0` → queued
- `1` → processing  
- `2` → encoding → triggers `bunnyStatus: 'processing'`
- `3` → **finished** → sets `fileUrl` + `status: 'published'` ✅
- `4` → resolution finished → same as finished
- `5` → failed → sets `bunnyStatus: 'failed'`

> 💡 To test real webhooks via ngrok, your webhook URL is:  
> `https://<your-ngrok-id>.ngrok.io/lessons/bunny-webhook`

---

## ❌ Error Cases to Test

The collection has a **🛡️ Auth & Error Cases** folder with pre-built tests:

| Test | Expected Response |
|---|---|
| Create course without headers | `401 Unauthorized` |
| Create course with `user` role | `403 Forbidden` |
| Get course with ID `99999` | `404 Not Found` |
| Create lesson with `type: "invalid_type"` | `400 Bad Request` (validation error) |
| Create course without `title`/`description` | `400 Bad Request` (validation error) |
| Upload session with invalid `sectionId` | `404 Not Found` |

---

## 🌐 Remote Testing via ngrok

Your ngrok tunnel is running at `https://<ngrok-url>.ngrok.io`.

To test with ngrok:
1. Open the collection in Postman
2. Go to **Variables** tab
3. Change `baseUrl` from `http://localhost:3002` to your ngrok URL
4. All requests will now hit the public URL

This is especially useful for:
- Testing **Bunny.net webhooks** (Bunny needs a public URL to call)
- Sharing the API with teammates

---

## 📋 Request Body Reference

### Create Course
```json
{
  "title": "string (required)",
  "description": "string (required)",
  "thumbnail": "string (optional, URL)"
}
```

### Create Section
```json
{
  "courseId": 1,
  "title": "string (required)",
  "description": "string (required)",
  "duration": 120
}
```

### Create Lesson
```json
{
  "sectionId": 1,
  "title": "string (required)",
  "type": "video | audio | pdf | doc | text | article | quiz",
  "fileUrl": "string (optional)",
  "bunnyVideoId": "string (optional)",
  "bunnyStatus": "string (optional)",
  "status": "published | draft (optional)"
}
```

### Create Teacher
```json
{
  "id": 1,
  "fullName": "string",
  "email": "user@email.com",
  "mobileNumber": "string (optional)",
  "teachingExpert": "string (optional)",
  "shortBio": "string (optional)",
  "socialLinks": "string (optional)",
  "profilePicture": "string (optional)"
}
```

### Create Student
```json
{
  "id": 100,
  "fullName": "string",
  "email": "student@email.com",
  "mobileNumber": "string (optional)"
}
```
