# 💧 Hydro Plus+ — Smart Water Tracking Community

## 🇩🇿 نظرة عامة | Overview | Vue d'ensemble

### العربية
**Hydro Plus+** هو تطبيق ويب تقدمي (PWA) يساعد سكان الأحياء الجزائرية على معرفة أوقات توزيع المياه ومتابعتها بشكل جماعي. يعتمد على مشاركة المجتمع حيث يصرّح المستخدمون بحالة المياه في مناطقهم.

### English
**Hydro Plus+** is a Progressive Web App (PWA) that helps Algerian residents track water availability in their neighborhoods through community-powered reporting. Citizens report water status, view an interactive map, and receive notifications.

### Français
**Hydro Plus+** est une application web progressive (PWA) qui aide les résidents algériens à suivre la disponibilité de l'eau dans leurs quartiers grâce aux signalements communautaires.

---

## ✨ المميزات | Features | Fonctionnalités

### 🏠 الصفحة الرئيسية | Home
- **Live Status Banner** — بانر حي يعرض حالة المياه (مستقرة / جزئية / نقص)
- **Water Intelligence Dashboard** — لوحة ذكية بإحصائيات التوفر والتوقعات
- **Smart Insights** — إحصائيات المنطقة مع مؤشرات الاتجاه
- **Recent Reports Feed** — آخر البلاغات المجتمعية

### 🗺️ الخريطة | Map
- **Google Maps Integration** — خريطة تفاعلية مركزة على الجزائر
- **Markers/Heatmap Toggle** — التبديل بين عرض العلامات والخريطة الحرارية
- **Wilaya Search** — البحث عن ولاية من بين 58 ولاية
- **Custom Map Styling** — تصميم خريطة مخصص وأنيق

### 📝 إنشاء بلاغ | Create Report
- **3 Report Types** — مياه متوفرة / للبيع / غير متوفرة
- **Image Upload** — رفع صور مع معاينة وسحب وإفلات
- **Well Status** — إمكانية الإشارة لوجود بئر
- **Auto Location** — كشف الموقع التلقائي

### 👤 الملف الشخصي | Profile
- **Trust Badge System** — نظام شارات الثقة (جديد / نشط / موثوق)
- **User Reports History** — سجل بلاغات المستخدم
- **Profile Photo** — صورة شخصية مع رفع مباشر

### 🔔 التنبيهات | Notifications
- **Persistent Notifications** — تنبيهات محفوظة مع عداد غير المقروء
- **Mark as Read** — تحديد كمقروء فردياً أو جماعياً
- **3 Types** — معلومات / نجاح / تحذير

### ⚙️ الإعدادات | Settings
- **Language Switcher** — العربية / الفرنسية / الإنجليزية
- **Dark Mode** — الوضع الداكن الاحترافي
- **Privacy Policy / Terms / Contact** — أماكن محجوزة للسياسات

### 🏛️ الوضع الحكومي | Government Mode
- لوحة إحصائيات رسمية بتصميم يليق بالمؤسسات الحكومية

---

## 🛠️ التقنيات | Tech Stack

| التقنية | الاستخدام |
|---------|----------|
| React 18 + TypeScript | Frontend framework |
| Vite 5 | Build tool |
| TailwindCSS 3 | Styling + Design system |
| Zustand | State management |
| Framer Motion | Animations |
| Google Maps JS API | Interactive map |
| DOMPurify | XSS sanitization |
| Zod-style validation | Input security |

---

## 📁 هيكل المشروع | Project Structure

```
src/
├── assets/          # الشعار والصور
├── components/      # المكونات القابلة لإعادة الاستخدام
│   ├── ui/          # مكونات shadcn/ui
│   ├── BottomNav.tsx
│   ├── EmptyState.tsx
│   ├── GoogleMap.tsx
│   ├── ImageUpload.tsx
│   ├── InstallPrompt.tsx
│   ├── LiveStatusBanner.tsx
│   ├── OfflineBanner.tsx
│   ├── ReportCard.tsx
│   ├── SkeletonCard.tsx
│   ├── TrustBadge.tsx
│   └── WaterInsights.tsx
├── data/
│   └── wilayas.ts   # بيانات 58 ولاية جزائرية
├── hooks/
│   ├── useTranslation.ts
│   └── useOffline.ts
├── i18n/
│   └── translations.ts  # ترجمات AR/FR/EN
├── lib/
│   ├── utils.ts
│   └── sanitize.ts  # وظائف الحماية والتطهير
├── pages/
│   ├── Index.tsx          # الصفحة الرئيسية
│   ├── Onboarding.tsx     # شاشات الترحيب
│   ├── Login.tsx          # تسجيل الدخول
│   ├── Signup.tsx         # إنشاء حساب
│   ├── ProfileSetup.tsx   # إعداد الملف الشخصي
│   ├── MapPage.tsx        # صفحة الخريطة
│   ├── CreateReport.tsx   # إنشاء بلاغ
│   ├── Notifications.tsx  # التنبيهات
│   ├── Profile.tsx        # الملف الشخصي
│   ├── Settings.tsx       # الإعدادات
│   └── GovernmentMode.tsx # الوضع الحكومي
├── stores/
│   └── appStore.ts  # Zustand store
└── types/
    └── google-maps.d.ts
```

```
├── bun.lock
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── logs
│   └── security.log
├── package.json
├── package-lock.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   ├── logo.jpg
│   ├── manifest.json
│   ├── placeholder.svg
│   └── robots.txt
├── README.md
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── logo.jpg
│   ├── components
│   │   ├── BottomNav.tsx
│   │   ├── EmptyState.tsx
│   │   ├── GoogleMap.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── InstallPrompt.tsx
│   │   ├── LiveStatusBanner.tsx
│   │   ├── NavLink.tsx
│   │   ├── OfflineBanner.tsx
│   │   ├── ReportCard.tsx
│   │   ├── SkeletonCard.tsx
│   │   ├── TrustBadge.tsx
│   │   ├── ui
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── command.tsx
│   │   │   ├── context-menu.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── input-otp.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── menubar.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── resizable.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   ├── toggle.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── use-toast.ts
│   │   └── WaterInsights.tsx
│   ├── data
│   │   └── wilayas.ts
│   ├── hooks
│   │   ├── use-mobile.tsx
│   │   ├── useOffline.ts
│   │   ├── use-toast.ts
│   │   └── useTranslation.ts
│   ├── i18n
│   │   └── translations.ts
│   ├── index.css
│   ├── lib
│   │   ├── sanitize.ts
│   │   └── utils.ts
│   ├── main.tsx
│   ├── pages
│   │   ├── CreateReport.tsx
│   │   ├── GovernmentMode.tsx
│   │   ├── Index.tsx
│   │   ├── Login.tsx
│   │   ├── MapPage.tsx
│   │   ├── NotFound.tsx
│   │   ├── Notifications.tsx
│   │   ├── Onboarding.tsx
│   │   ├── ProfileSetup.tsx
│   │   ├── Profile.tsx
│   │   ├── Settings.tsx
│   │   └── Signup.tsx
│   ├── stores
│   │   └── appStore.ts
│   ├── test
│   │   ├── example.test.ts
│   │   └── setup.ts
│   ├── types
│   │   └── google-maps.d.ts
│   └── vite-env.d.ts
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.config.ts

15 directories, 112 files
```

---

## 🔧 الدوال الرئيسية | Core Functions

### State Management (Zustand)
- `useAppStore` — المخزن الرئيسي للتطبيق
- `setLanguage(lang)` — تغيير اللغة
- `setDarkMode(dark)` — تبديل الوضع الداكن
- `login(user)` / `logout()` — إدارة الجلسة
- `addReport(report)` — إضافة بلاغ جديد
- `addNotification(notif)` — إضافة تنبيه
- `markNotificationRead(id)` — تحديد تنبيه كمقروء
- `markAllNotificationsRead()` — تحديد الكل كمقروء
- `updateProfile(data)` — تحديث الملف الشخصي

### Hooks
- `useTranslation()` — returns `{ t, language, dir }` for i18n
- `useOffline()` — monitors online/offline state and sync status

### Security Functions (sanitize.ts)
- `sanitizeInput(input)` — تطهير المدخلات من XSS
- `sanitizePhone(phone)` — تنظيف رقم الهاتف
- `escapeHtml(str)` — تشفير HTML entities
- `validateName(name)` — التحقق من صحة الاسم
- `validatePhone(phone)` — التحقق من رقم الهاتف
- `validatePassword(pass)` — التحقق من كلمة المرور

---

## 🔒 الحماية | Security

- ✅ Input sanitization via DOMPurify (XSS prevention)
- ✅ HTML entity escaping
- ✅ Phone number sanitization
- ✅ Form validation with length limits
- ✅ No unsafe `dangerouslySetInnerHTML`
- ✅ No direct rendering of user content
- ✅ SQL injection patterns blocked at input level

---

## 🚀 التشغيل | How to Run

```bash
npm install
npm run dev
```

---

## 📱 PWA

The app includes a `manifest.json` for installability on mobile devices. It works offline with sync indicators.

---

By Mehloul Achraf

Framing by V Tech Club
