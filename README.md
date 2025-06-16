# 🎬 XAd - منصة البث العصرية

منصة بث متطورة تدعم مصادر متعددة لمشاهدة الأفلام والمسلسلات مع واجهة عصرية وسهلة الاستخدام.

## ✨ المميزات

- 🎯 **مصادر متعددة**: دعم أكثر من 12 مصدر بث مختلف
- 🔄 **تبديل المصادر**: إمكانية تغيير مصدر الفيديو بسهولة
- 📱 **تصميم متجاوب**: يعمل على جميع الأجهزة (كمبيوتر، جوال، تابلت)
- 🎨 **واجهة عصرية**: تصميم جذاب مع تأثيرات بصرية متطورة
- 🔍 **بحث ذكي**: البحث عن الأفلام والمسلسلات
- 📺 **دعم المسلسلات**: اختيار الموسم والحلقة
- ⌨️ **اختصارات لوحة المفاتيح**: تحكم سريع
- 🌙 **وضع ليلي**: تصميم مريح للعين

## 🎥 المصادر المدعومة

### المصادر الأساسية
1. **VidSrc** - `https://vidsrc.net/` <mcreference link="https://vidsrc.net/" index="3">3</mcreference>
2. **Embed.su** - `https://embed.su/` <mcreference link="https://embed.su/" index="1">1</mcreference>
3. **2Embed** - `https://www.2embed.cc/` <mcreference link="https://www.2embed.cc/" index="2">2</mcreference>
4. **GoDrivePlayer** - `https://godriveplayer.com/` <mcreference link="https://godriveplayer.com/" index="0">0</mcreference>

### المصادر الإضافية
5. **SuperEmbed** - `https://multiembed.mov/` <mcreference link="https://www.superembed.stream/" index="1">1</mcreference>
6. **VidSrc.to** - `https://vidsrc.to/` <mcreference link="https://vidsrc.to/" index="1">1</mcreference>
7. **FSApi** - `https://fsapi.xyz/` <mcreference link="https://github.com/AdvithGopinath/LetMeWatch/issues/4" index="2">2</mcreference>
8. **CurtStream** - `https://curtstream.com/` <mcreference link="https://github.com/AdvithGopinath/LetMeWatch/issues/4" index="2">2</mcreference>
9. **MovieWP** - `https://moviewp.com/` <mcreference link="https://github.com/AdvithGopinath/LetMeWatch/issues/4" index="2">2</mcreference>
10. **ApiMDB** - `https://v2.apimdb.net/` <mcreference link="https://github.com/AdvithGopinath/LetMeWatch/issues/4" index="2">2</mcreference>
11. **Gomo** - `https://gomo.to/` <mcreference link="https://github.com/AdvithGopinath/LetMeWatch/issues/4" index="2">2</mcreference>
12. **VidCloud** - `https://vidcloud.stream/` <mcreference link="https://github.com/AdvithGopinath/LetMeWatch/issues/4" index="2">2</mcreference>

## 🚀 كيفية الاستخدام

### التشغيل المحلي
1. قم بتحميل جميع الملفات في مجلد واحد
2. افتح ملف `index.html` في المتصفح
3. ابدأ بالبحث عن المحتوى المطلوب

### البحث عن المحتوى
1. اكتب اسم الفيلم أو المسلسل في مربع البحث
2. اختر نوع المحتوى (فيلم أو مسلسل)
3. اضغط على زر البحث أو Enter

### تشغيل المحتوى
1. بعد العثور على المحتوى، سيظهر مشغل الفيديو
2. اختر المصدر المفضل من القائمة المنسدلة
3. للمسلسلات: اختر الموسم والحلقة
4. اضغط "تغيير المصدر" لتحديث الفيديو

## ⌨️ اختصارات لوحة المفاتيح

- `Escape`: إغلاق مشغل الفيديو
- `Ctrl + F`: تفعيل/إلغاء وضع ملء الشاشة
- `Enter`: تنفيذ البحث (عند التركيز على مربع البحث)

## 🛠️ التقنيات المستخدمة

- **HTML5**: هيكل الصفحة
- **CSS3**: التصميم والتأثيرات البصرية
- **JavaScript**: الوظائف التفاعلية
- **Font Awesome**: الأيقونات
- **Google Fonts**: خط Cairo العربي

## 📱 التوافق

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ جميع المتصفحات الحديثة على الهواتف الذكية

## 🎨 المميزات التقنية

### التصميم
- تدرجات لونية عصرية
- تأثيرات الضبابية (Backdrop Filter)
- انتقالات سلسة
- تصميم متجاوب بالكامل
- شريط تمرير مخصص

### الوظائف
- تبديل المصادر الفوري
- إشعارات تفاعلية
- تحميل تدريجي
- معالجة الأخطاء
- ذاكرة تخزين محلية

## 🔧 التخصيص

### تغيير الألوان
يمكنك تعديل الألوان في ملف `style.css`:

```css
:root {
    --primary-color: #ff6b6b;
    --secondary-color: #4ecdc4;
    --accent-color: #45b7d1;
    --background-gradient: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
}
```

### إضافة مصادر جديدة
يمكنك إضافة مصادر جديدة في ملف `script.js`:

```javascript
const videoSources = {
    // المصادر الموجودة...
    newSource: {
        name: 'اسم المصدر الجديد',
        movie: (id) => `https://example.com/movie/${id}`,
        tv: (id, season, episode) => `https://example.com/tv/${id}/${season}/${episode}`
    }
};
```

## 📋 معلومات المصادر

### VidSrc
- **النوع**: مجاني
- **الجودة**: حتى 1080p <mcreference link="https://vidsrc.net/" index="3">3</mcreference>
- **الترجمة**: متوفرة <mcreference link="https://vidsrc.net/" index="3">3</mcreference>
- **الإعلانات**: قليلة

### SuperEmbed
- **النوع**: مجاني مع API <mcreference link="https://www.superembed.stream/" index="1">1</mcreference>
- **المميزات**: مشغل VIP متاح <mcreference link="https://www.superembed.stream/" index="1">1</mcreference>
- **التخصيص**: ألوان وخطوط قابلة للتخصيص <mcreference link="https://github.com/AdvithGopinath/LetMeWatch/issues/4" index="3">3</mcreference>
- **الخوادم**: خوادم متعددة <mcreference link="https://www.superembed.stream/" index="1">1</mcreference>

### 2Embed
- **النوع**: مجاني
- **المحتوى**: أفلام ومسلسلات وأنمي <mcreference link="https://www.2embed.cc/" index="2">2</mcreference>
- **الدعم**: IMDB و TMDB IDs <mcreference link="https://www.2embed.cc/" index="2">2</mcreference>
- **الجودة**: Full HD متاح <mcreference link="https://www.2embed.cc/" index="2">2</mcreference>

## 🔒 الأمان والخصوصية

- لا يتم تخزين أي بيانات شخصية
- جميع الروابط تُحمل من مصادر خارجية
- لا توجد ملفات تعريف ارتباط للتتبع
- الكود مفتوح المصدر للمراجعة

## 🐛 الإبلاغ عن المشاكل

إذا واجهت أي مشاكل:
1. تأكد من اتصال الإنترنت
2. جرب مصدر فيديو آخر
3. تأكد من صحة معرف الفيلم/المسلسل
4. امسح ذاكرة التخزين المؤقت للمتصفح

## 📈 التحديثات المستقبلية

- [ ] إضافة المزيد من مصادر البث
- [ ] دعم التحميل للمشاهدة لاحقاً
- [ ] نظام تقييم المحتوى
- [ ] قائمة المفضلة
- [ ] دعم اللغات المتعددة
- [ ] تطبيق الهاتف المحمول

## 📄 الترخيص

هذا المشروع مجاني للاستخدام الشخصي. جميع مصادر البث تخضع لشروط خدماتها الخاصة.

## 🤝 المساهمة

نرحب بالمساهمات! يمكنك:
- إضافة مصادر بث جديدة
- تحسين التصميم
- إصلاح الأخطاء
- ترجمة الواجهة

---

**تم التطوير بـ ❤️ لمجتمع البث العربي**

*ملاحظة: هذه المنصة للاستخدام التعليمي والشخصي فقط. يرجى احترام حقوق الطبع والنشر.*