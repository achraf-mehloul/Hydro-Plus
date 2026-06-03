# 💧 Hydro Plus+ 

> **شبكة وطنية حية لرصد المياه، توقع الأزمات، وإدارة الطوارئ — مبنية بقوة المجتمع والذكاء الاصطناعي.**

[![PWA](https://img.shields.io/badge/PWA-Ready-3b82f6)]() [![React](https://img.shields.io/badge/React-18-61dafb)]() [![Supabase](https://img.shields.io/badge/Supabase-Cloud-3ecf8e)]() [![Realtime](https://img.shields.io/badge/Realtime-Live-22d3ee)]() [![i18n](https://img.shields.io/badge/i18n-AR%20%C2%B7%20FR%20%C2%B7%20EN-f59e0b)]()

---

## 🌐 الرؤية

**Hydro Plus+** ليس مجرد تطبيق لتتبع المياه — بل **نظام تشغيل مدني** للبنية التحتية المائية.
كل مواطن يصبح **مستشعر بشري**، وكل بلدية تحصل على **مركز قيادة ذكي**، وكل ولاية تتحول إلى **نسخة رقمية حية** يمكن محاكاتها والتنبؤ بسلوكها.

> *"نحن نبني الجهاز العصبي للبنية التحتية للمياه، حيث المواطنون مستشعرات والذكاء الاصطناعي طبقة القرار."*

---

## ✨ الميزات الكاملة (نسخة محدثة)

### 🧠 1. Crisis Forecast AI — توقع الأزمات
- نموذج ذكاء اصطناعي يحلل البلاغات والأنماط الزمنية والجغرافية.
- يتنبأ باحتمالية الانقطاع خلال 24 / 72 ساعة.
- سرد ذكي طبيعي بثلاث لغات (عربي / فرنسي / إنجليزي).
- مدعوم بـ **Lovable AI Gateway** بدون مفاتيح API خارجية.

### 🧬 2. Digital Twin — النسخة الرقمية الحية
- محاكاة لحظية لشبكة المياه في كل ولاية وحي.
- مؤشر **Health Index** (0–100) يحسب من البلاغات الحية.
- حالات الضغط: منخفض / طبيعي / مرتفع / حرج.
- خط زمني مرئي للأحداث الستة الأخيرة.
- **Realtime**: متصل عبر مدير القنوات المركزي — يتحرك المؤشر فورياً مع كل بلاغ جديد.
- جدول `digital_twins` في قاعدة البيانات للحفظ الدائم.

### 🛰️ 3. Satellite Fusion — دمج بيانات الأقمار الصناعية
- يدمج رطوبة التربة، الحرارة السطحية، تقدير الخزانات، وخطر الجفاف.
- يقرأ من جدول `satellite_data` عند توفر بيانات حقيقية.
- يستخدم خوارزمية تقدير حتمية كاحتياط عند غياب البيانات.
- جاهز لربط APIs خارجية (NASA SMAP, Copernicus, Sentinel).

### 📡 4. Water Signal Index (WSI) — مؤشر إشارة المياه
- مقياس واحد (0–100) يلخص "صحة المياه" في المنطقة.
- **Orb gauge** بصري مع تأثيرات Glow متحركة وتوهج تدريجي.
- اتجاه أسبوعي: تحسّن / مستقر / تراجع.
- محسوب من نسبة البلاغات المستقرة + معامل التحقق المجتمعي.
- **Realtime** مرتبط بنفس قناة `water_reports` المشتركة (لا قناة مكررة).

### 🚨 5. Emergency Mode — وضع الطوارئ
- جدول `emergency_zones` للأزمات النشطة.
- عرض بصري قوي مع تدرج أحمر متموج وأيقونة Siren متذبذبة.
- 4 مستويات شدة: low / medium / high / critical.
- تعليمات نصية لكل منطقة + عدد السكان المتأثرين.
- **Realtime instant banner**: عند إدراج منطقة طوارئ جديدة، يظهر toast فوري لكل المستخدمين بدون reload.
- اشتراك مشترك مع SmartAlerts عبر `useSharedRealtime` — قناة واحدة فقط.

### 🔔 6. Smart Alert Engine — محرك التنبيهات الذكي
- تنبيهات شخصية مرتبة حسب الأولوية (1=الأعلى).
- 4 أنواع: info / warning / critical / prediction.
- اشتراك Realtime: يظهر التنبيه فوراً دون إعادة تحميل.
- شريط تنبيه قابل للإغلاق مع تدرج لوني حسب النوع.

### 📶 7. Offline Mesh Sync — المزامنة دون اتصال (Conflict-Safe)
- طابور محلي `localStorage` مع **client_uuid مستقر** لكل عنصر.
- **منع التكرار** على مستوى قاعدة البيانات بفهرس فريد `(user_id, client_uuid)`.
- **ترتيب زمني**: الأقدم أولاً للحفاظ على السببية.
- **حماية من re-entrancy**: لا يمكن تشغيل drain متوازي.
- **معالجة Postgres `23505`** كنجاح + عدّاد مكررات.
- **Offline Sync Drawer** — درج كامل في الهيدر يعرض:
  - عدد العناصر المعلقة
  - عدد المكررات المكتشفة
  - إجمالي ما تمت مزامنته
  - وقت آخر مزامنة
  - زر **Retry now** يدوي
  - قائمة الأحداث مع `client_uuid` ووقت الإنشاء وعدد المحاولات وآخر خطأ.

### 🏛️ 8. Multi-Tenant — نظام متعدد المؤسسات
- جدول `organizations` يدعم: بلدية / ولاية / شركة مياه / منظمة.
- مفتاح API تلقائي لكل مؤسسة (api_key مولّد).
- صفحة إدارة `/admin/multi-tenant` مع: بحث، فلترة بالنوع، KPIs.
- جميع العمليات (create / update / toggle / delete) تكتب تلقائياً في **audit_logs**.

### 📜 9. Audit Trail — سجل التدقيق الإداري
- جدول `audit_logs` يخزن كل عملية إدارية مع actor + target + metadata.
- صفحة `/admin/audit` تعرض السجل مع:
  - المنفذ (المسؤول)
  - الوقت والتاريخ
  - المنظمة المتأثرة
  - تفاصيل المنظمة (الاسم، النوع، الولاية)
- RLS: قراءة للمشرفين فقط، إدراج فقط بـ `actor_id = auth.uid()`.

### 🗺️ 10. Smart Map — الخريطة الذكية مع Performance Mode
- **3 أوضاع**: Markers / Heatmap / Risk zones.
- **Marker Clustering ذاتي** (بدون مكتبة خارجية) — يجمع البلاغات في خلايا حسب الـ zoom.
- **Throttling**: التحديث الواحد كل 200ms (طبيعي) أو 800ms (perf).
- **Auto Performance Mode** عند:
  - الجهاز ضعيف (`hardwareConcurrency ≤ 4` أو `deviceMemory ≤ 2`)
  - الاتصال 2G/3G أو `Save-Data` مفعل
  - وضع Offline
- **Light tiles** (Maps Styles JSON) في perf mode بدلاً من Vector Map ID — أسرع مرتين.
- زر toggle يدوي لتفعيل/إيقاف Performance Mode.
- بحث عن 58 ولاية + التركيز التلقائي.
- تحديث Realtime عند ورود بلاغات جديدة.

### 👥 11. Trust Graph & Reputation
- نظام تصويت ⬆️⬇️ على البلاغات.
- شارات ثقة: جديد / نشط / موثوق.
- جدول `report_votes` مع منع التصويت المكرر.

### 🏆 12. Gamification — التحفيز
- 5 شارات قابلة للفتح: أول بلاغ، مبلّغ دقيق، حارس المجتمع، كاشف مبكر، قائد موثوق.
- شريط تقدم للشارة التالية.

### 📜 13. Water Passport — جواز المياه
- تاريخ مفصل لكل ولاية.
- Score (0–100) + اتجاه أسبوعي.
- عداد البلاغات المستقرة مقابل الانقطاعات.

### 🛡️ 14. Admin Dashboard
- إحصائيات حية للنظام بأكمله.
- تصدير PDF احترافي للوزارات (`jspdf` + `jspdf-autotable`).
- جدول البلاغات الأخيرة مع التصفية.

### 🔐 15. Auth & Security
- تسجيل بريد + كلمة مرور.
- **Google OAuth** + **Apple OAuth** (مُفعّل عبر Lovable Cloud Managed Social Login).
- استرجاع كلمة المرور عبر بريد إلكتروني + صفحة `/reset-password`.
- HIBP — حماية من كلمات المرور المسربة.
- RLS على جميع الجداول (12 جدولاً).
- نظام أدوار منفصل (`user_roles` + `has_role`) لمنع تصعيد الامتيازات.

### 🔗 16. Communications Layer
- زر الاتصال يفتح الهاتف فوراً عبر `tel:` protocol.
- زر الواتساب يفتح المحادثة عبر `wa.me/` protocol.
- اتصال فعلي حقيقي وليس واجهة فقط.

---

## 🏗️ المعمارية التقنية

### Frontend
- **React 18** + **TypeScript 5** + **Vite 5**
- **Tailwind CSS 3** مع نظام تصميم كامل (HSL semantic tokens)
- **Framer Motion** للحركات السائلة
- **Zustand** + **persist** لإدارة الحالة
- **TanStack Query** للتخزين المؤقت + Realtime invalidation
- **React Router** + **Lazy loading** لكل الصفحات + كل الـ widgets الثقيلة

### Realtime Manager (Centralized)
- **`src/lib/realtimeManager.ts`** — قناة واحدة مشتركة لكل جدول.
- Reference-counted: تُفتح القناة عند أول مشترك، وتُغلق عند آخر إلغاء.
- يستخدمها: `DigitalTwin`, `WaterSignalIndex`, `EmergencyMode`, `SmartAlertEngine`, `useReportsRealtime`.
- بدون قنوات مكررة → بدون listeners مكررة → بدون invalidations مكررة.

### Backend (Lovable Cloud / Supabase)
- **PostgreSQL** + **RLS** كاملة على 12 جدولاً.
- **Realtime subscriptions** على: `water_reports`, `report_votes`, `digital_twins`, `emergency_zones`, `smart_alerts`, `water_signal_index`, `audit_logs`.
- **Edge Functions** بـ Deno: `water-ai-predict`, `grant-admin`.
- **Storage buckets**: `avatars`, `report-images`.
- **Auth**: email/password + recovery + Google + Apple.
- **Lovable AI Gateway**: `google/gemini-2.5-flash` للتنبؤ.

### نظام التصميم — Design System
- **Glassmorphism** متعدد المستويات (`.glass`, `.glass-card`, `.glass-strong`, `.glass-panel`).
- **Liquid ripple** على التفاعلات.
- **Breathing UI** — تنفس حي لطيف.
- **Aurora mesh** — خلفية تدرج متحركة.
- **Scan line** — خط مسح كمراكز التحكم.
- **Pulse glow** للأيقونات الحرجة.
- **Tabular numerals** (`.nums`) للبيانات الكثيفة.
- **Fluid typography** (`clamp()`) للتصغير/التكبير حسب الشاشة.
- **Full RTL** — flip للأيقونات + `unicode-bidi: isolate` للأرقام والإيميل.
- خط **Cairo** (عربي) + **Inter** (لاتيني) + **JetBrains Mono** (بيانات).

### i18n Quality Gate
- **`scripts/i18n-check.mjs`** — يفحص ar/fr/en تلقائياً.
- يكتشف **مفاتيح ناقصة** عبر اللغات.
- يكتشف **مفاتيح مكررة** داخل اللغة.
- يُربط بـ `prebuild` في `package.json` → **يكسر البناء** إذا فشل.
- 253 مفتاح × 3 لغات = 759 ترجمة موزونة.

---

## 🗄️ مخطط قاعدة البيانات (12 جدول)

```
profiles            → ملفات المستخدمين + ولاية/بلدية/حي + مستوى الثقة
water_reports       → البلاغات (نوع، صور، إحداثيات، client_uuid للأوفلاين)
report_votes        → نظام التصويت ⬆️⬇️
user_roles          → الأدوار (admin / moderator / user)
audit_logs          → سجل العمليات الإدارية الكامل

— الميزات المتقدمة —
organizations       → Multi-tenant (بلديات + شركات + منظمات + API key)
digital_twins       → نسخة رقمية لكل ولاية/بلدية + health score
water_signal_index  → مؤشر WSI لكل ولاية مع تاريخ
emergency_zones     → مناطق الطوارئ النشطة
smart_alerts        → تنبيهات شخصية للمستخدمين
satellite_data      → بيانات الأقمار الصناعية
offline_sync_queue  → طابور المزامنة عبر الأجهزة
```

كل الجداول محمية بـ RLS — لا يستطيع أحد الكتابة في بيانات الآخرين.
`audit_logs` للقراءة بـ admin فقط.
`water_reports` بفهرس فريد `(user_id, client_uuid)` لمنع تكرار الأوفلاين.

---

## 🚀 التشغيل

```bash
npm install
npm run dev          # http://localhost:8080
npm run i18n:check   # فحص يدوي للترجمات
npm run build        # يشغل i18n:check تلقائياً قبل البناء
```

---

## ⚡ تحسينات الأداء المنفذة

- **Lazy loading** لكل الصفحات + كل الـ widgets الثقيلة (DigitalTwin, WSI, Satellite, Emergency, Crisis Forecast).
- **Suspense fallbacks** بـ skeleton-shimmer.
- **Realtime channel pooling** — قناة واحدة لكل جدول مهما كان عدد المشتركين.
- **Map clustering + throttling** — استهلاك CPU ينخفض حتى 80% على الأجهزة الضعيفة.
- **Light tiles offline** — Maps Styles بدلاً من Vector tiles.
- **TanStack Query caching** + Realtime invalidation بدلاً من polling.

---

## 🛣️ خارطة الطريق

### ✅ تم الإنجاز
- جميع الميزات المذكورة أعلاه (16 ميزة)
- Realtime مركزي بدون قنوات مكررة
- Offline conflict-safe sync
- Audit trail كامل لكل العمليات الإدارية
- Map performance mode + clustering
- i18n checker يكسر البناء عند الأخطاء

### 🔜 الإصدار التالي
- ربط فعلي بـ Sentinel-2 / NASA SMAP للأقمار الصناعية
- إشعارات Push عبر Service Worker
- IoT Gateway للاستشعار الذكي
- تطبيق سطح المكتب (Tauri)
- API عام B2B للحكومات والشركات

---

## 👨‍💻 الفريق

**By Mehloul Achraf**
**Framing by V Tech Club**

---

> _Hydro Plus+ — حيث يلتقي المواطن بالذكاء الاصطناعي لإنقاذ كل قطرة._



````
┌──(achraf㉿kali)-[~/Desktop/2/hydro-pulse]
└─$ tree
.
├── admin-dashboard
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── src
│   │   ├── api
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── components
│   │   │   ├── DataTable.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── contexts
│   │   │   └── AuthContext.tsx
│   │   ├── index.css
│   │   ├── layouts
│   │   │   └── AdminLayout.tsx
│   │   ├── main.tsx
│   │   ├── pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Reports.tsx
│   │   │   ├── Settings.tsx
│   │   │   ├── Users.tsx
│   │   │   └── WaterReadings.tsx
│   │   └── types
│   │       └── index.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend
│   ├── app
│   │   ├── config.py
│   │   ├── core
│   │   │   ├── exceptions.py
│   │   │   ├── __init__.py
│   │   │   ├── __pycache__
│   │   │   │   ├── __init__.cpython-312.pyc
│   │   │   │   ├── __init__.cpython-313.pyc
│   │   │   │   ├── security.cpython-312.pyc
│   │   │   │   └── security.cpython-313.pyc
│   │   │   └── security.py
│   │   ├── database
│   │   │   ├── __init__.py
│   │   │   ├── __pycache__
│   │   │   │   ├── __init__.cpython-312.pyc
│   │   │   │   ├── __init__.cpython-313.pyc
│   │   │   │   ├── seed.cpython-312.pyc
│   │   │   │   ├── seed.cpython-313.pyc
│   │   │   │   ├── session.cpython-312.pyc
│   │   │   │   └── session.cpython-313.pyc
│   │   │   ├── seed.py
│   │   │   └── session.py
│   │   ├── dependencies
│   │   │   ├── auth.py
│   │   │   ├── __init__.py
│   │   │   ├── __pycache__
│   │   │   │   ├── auth.cpython-312.pyc
│   │   │   │   ├── auth.cpython-313.pyc
│   │   │   │   ├── __init__.cpython-312.pyc
│   │   │   │   ├── __init__.cpython-313.pyc
│   │   │   │   ├── rls.cpython-312.pyc
│   │   │   │   └── rls.cpython-313.pyc
│   │   │   └── rls.py
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── middleware
│   │   │   ├── __init__.py
│   │   │   ├── __pycache__
│   │   │   │   ├── __init__.cpython-312.pyc
│   │   │   │   ├── __init__.cpython-313.pyc
│   │   │   │   ├── rate_limit.cpython-312.pyc
│   │   │   │   ├── rate_limit.cpython-313.pyc
│   │   │   │   ├── request_logger.cpython-312.pyc
│   │   │   │   ├── request_logger.cpython-313.pyc
│   │   │   │   ├── security_headers.cpython-312.pyc
│   │   │   │   ├── security_headers.cpython-313.pyc
│   │   │   │   ├── waf.cpython-312.pyc
│   │   │   │   └── waf.cpython-313.pyc
│   │   │   ├── rate_limit.py
│   │   │   ├── request_logger.py
│   │   │   ├── security_headers.py
│   │   │   └── waf.py
│   │   ├── models
│   │   │   ├── __init__.py
│   │   │   ├── notification.py
│   │   │   ├── __pycache__
│   │   │   │   ├── __init__.cpython-312.pyc
│   │   │   │   ├── __init__.cpython-313.pyc
│   │   │   │   ├── notification.cpython-312.pyc
│   │   │   │   ├── notification.cpython-313.pyc
│   │   │   │   ├── report.cpython-312.pyc
│   │   │   │   ├── report.cpython-313.pyc
│   │   │   │   ├── user.cpython-312.pyc
│   │   │   │   ├── user.cpython-313.pyc
│   │   │   │   ├── water_reading.cpython-312.pyc
│   │   │   │   └── water_reading.cpython-313.pyc
│   │   │   ├── report.py
│   │   │   ├── user.py
│   │   │   └── water_reading.py
│   │   ├── __pycache__
│   │   │   ├── config.cpython-312.pyc
│   │   │   ├── config.cpython-313.pyc
│   │   │   ├── __init__.cpython-312.pyc
│   │   │   ├── __init__.cpython-313.pyc
│   │   │   ├── main.cpython-312.pyc
│   │   │   └── main.cpython-313.pyc
│   │   ├── routers
│   │   │   ├── admin.py
│   │   │   ├── auth.py
│   │   │   ├── government.py
│   │   │   ├── __init__.py
│   │   │   ├── notifications.py
│   │   │   ├── __pycache__
│   │   │   │   ├── admin.cpython-312.pyc
│   │   │   │   ├── admin.cpython-313.pyc
│   │   │   │   ├── auth.cpython-312.pyc
│   │   │   │   ├── auth.cpython-313.pyc
│   │   │   │   ├── government.cpython-312.pyc
│   │   │   │   ├── government.cpython-313.pyc
│   │   │   │   ├── __init__.cpython-312.pyc
│   │   │   │   ├── __init__.cpython-313.pyc
│   │   │   │   ├── notifications.cpython-312.pyc
│   │   │   │   ├── notifications.cpython-313.pyc
│   │   │   │   ├── reports.cpython-312.pyc
│   │   │   │   ├── reports.cpython-313.pyc
│   │   │   │   ├── users.cpython-312.pyc
│   │   │   │   ├── users.cpython-313.pyc
│   │   │   │   ├── water.cpython-312.pyc
│   │   │   │   └── water.cpython-313.pyc
│   │   │   ├── reports.py
│   │   │   ├── users.py
│   │   │   └── water.py
│   │   ├── schemas
│   │   │   ├── auth.py
│   │   │   ├── __init__.py
│   │   │   ├── __pycache__
│   │   │   │   ├── auth.cpython-312.pyc
│   │   │   │   ├── auth.cpython-313.pyc
│   │   │   │   ├── __init__.cpython-312.pyc
│   │   │   │   ├── __init__.cpython-313.pyc
│   │   │   │   ├── report.cpython-312.pyc
│   │   │   │   ├── report.cpython-313.pyc
│   │   │   │   ├── user.cpython-312.pyc
│   │   │   │   └── user.cpython-313.pyc
│   │   │   ├── report.py
│   │   │   └── user.py
│   │   ├── services
│   │   │   ├── auth_service.py
│   │   │   ├── __init__.py
│   │   │   ├── notification_service.py
│   │   │   ├── report_service.py
│   │   │   └── water_service.py
│   │   └── utils
│   │       ├── crypto.py
│   │       ├── geo.py
│   │       ├── sanitizer.py
│   │       └── validators.py
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── nginx
│   │   ├── crs
│   │   │   └── rules.conf
│   │   ├── modsecurity.conf
│   │   └── nginx.conf
│   ├── requirements-dev.txt
│   ├── requirements.txt
│   ├── run.py
│   ├── uploads
│   │   └── avatars
│   └── water_app.db
├── docker-compose.prod.yml
├── docs
│   ├── API.md
│   ├── DEPLOYMENT.md
│   ├── SECURITY.md
│   └── THREAT_MODEL.md
├── frontend
│   ├── bun.lock
│   ├── bun.lockb
│   ├── components.json
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── logs
│   │   └── security.log
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── favicon.ico
│   │   ├── logo.jpg
│   │   ├── manifest.json
│   │   ├── placeholder.svg
│   │   └── robots.txt
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   └── logo.jpg
│   │   ├── components
│   │   │   ├── BottomNav.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── GoogleMap.tsx
│   │   │   ├── ImageUpload.tsx
│   │   │   ├── InstallPrompt.tsx
│   │   │   ├── LiveStatusBanner.tsx
│   │   │   ├── NavLink.tsx
│   │   │   ├── OfflineBanner.tsx
│   │   │   ├── ReportCard.tsx
│   │   │   ├── SkeletonCard.tsx
│   │   │   ├── TrustBadge.tsx
│   │   │   ├── ui
│   │   │   │   ├── accordion.tsx
│   │   │   │   ├── alert-dialog.tsx
│   │   │   │   ├── alert.tsx
│   │   │   │   ├── aspect-ratio.tsx
│   │   │   │   ├── avatar.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── breadcrumb.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── calendar.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── carousel.tsx
│   │   │   │   ├── chart.tsx
│   │   │   │   ├── checkbox.tsx
│   │   │   │   ├── collapsible.tsx
│   │   │   │   ├── command.tsx
│   │   │   │   ├── context-menu.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── drawer.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   ├── hover-card.tsx
│   │   │   │   ├── input-otp.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── menubar.tsx
│   │   │   │   ├── navigation-menu.tsx
│   │   │   │   ├── pagination.tsx
│   │   │   │   ├── popover.tsx
│   │   │   │   ├── progress.tsx
│   │   │   │   ├── radio-group.tsx
│   │   │   │   ├── resizable.tsx
│   │   │   │   ├── scroll-area.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── separator.tsx
│   │   │   │   ├── sheet.tsx
│   │   │   │   ├── sidebar.tsx
│   │   │   │   ├── skeleton.tsx
│   │   │   │   ├── slider.tsx
│   │   │   │   ├── sonner.tsx
│   │   │   │   ├── switch.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── textarea.tsx
│   │   │   │   ├── toaster.tsx
│   │   │   │   ├── toast.tsx
│   │   │   │   ├── toggle-group.tsx
│   │   │   │   ├── toggle.tsx
│   │   │   │   ├── tooltip.tsx
│   │   │   │   └── use-toast.ts
│   │   │   └── WaterInsights.tsx
│   │   ├── data
│   │   │   └── wilayas.ts
│   │   ├── hooks
│   │   │   ├── use-mobile.tsx
│   │   │   ├── useOffline.ts
│   │   │   ├── use-toast.ts
│   │   │   └── useTranslation.ts
│   │   ├── i18n
│   │   │   └── translations.ts
│   │   ├── index.css
│   │   ├── lib
│   │   │   ├── api.ts
│   │   │   ├── sanitize.ts
│   │   │   └── utils.ts
│   │   ├── main.tsx
│   │   ├── pages
│   │   │   ├── CreateReport.tsx
│   │   │   ├── GovernmentMode.tsx
│   │   │   ├── Index.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── MapPage.tsx
│   │   │   ├── NotFound.tsx
│   │   │   ├── Notifications.tsx
│   │   │   ├── Onboarding.tsx
│   │   │   ├── ProfileSetup.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Settings.tsx
│   │   │   └── Signup.tsx
│   │   ├── stores
│   │   │   └── appStore.ts
│   │   ├── test
│   │   │   ├── example.test.ts
│   │   │   └── setup.ts
│   │   ├── types
│   │   │   └── google-maps.d.ts
│   │   └── vite-env.d.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   └── vitest.config.ts
├── README.md
├── scripts
│   ├── backup_db.sh
│   ├── deploy.sh
│   ├── generate_jwt_secret.py
│   └── security_audit.sh
├── tests
│   ├── conftest.py
│   ├── e2e
│   │   ├── create_report.spec.ts
│   │   ├── government_mode.spec.ts
│   │   └── login.spec.ts
│   ├── integration
│   │   ├── test_auth_flow.py
│   │   ├── test_notifications.py
│   │   └── test_report_crud.py
│   ├── payloads
│   │   ├── jwt_attack_payloads.json
│   │   ├── path_traversal.txt
│   │   ├── sqli_payloads.txt
│   │   └── xss_payloads.txt
│   ├── reports
│   │   └── penetration_test_report.md
│   ├── requirements-test.txt
│   ├── security
│   │   ├── jwt_attacks.py
│   │   ├── rate_limit_bypass.py
│   │   ├── rls_tests.py
│   │   ├── sql_injection.py
│   │   └── xss_tests.py
│   └── unit
│       ├── test_rls.py
│       ├── test_sanitizer.py
│       ├── test_validators.py
│       └── test_waf.py
└── waf
    ├── cloudflare
    │   └── rulesets.json
    ├── custom_waf
    │   └── waf_middleware.py
    └── nginx
        ├── crs
        │   └── rules.conf
        ├── modsecurity.conf
        └── nginx.conf

61 directories, 294 files
````

