# صفحة هبوط ودليل النباتات على mahmoudelkousy.online

- الدليل التفاعلي: `https://www.mahmoudelkousy.online/products/plant`
- صفحة الشراء: `https://www.mahmoudelkousy.online/buydoctorplant`
- الأدمن: `https://www.mahmoudelkousy.online/admin`

التعديل الأساسي على ريبو المتجر `mahmoud3061993/1000`.

## طبّق الباتش على ريبو 1000

من فرع `cursor/plant-care-guide-424f` في `mahmoud3061993/plant`:

```bash
curl -L -o mahmoudelkousy-storefront.patch \
  https://raw.githubusercontent.com/mahmoud3061993/plant/cursor/plant-care-guide-424f/mahmoudelkousy-storefront.patch
git am mahmoudelkousy-storefront.patch
```

النتيجة المتوقعة:

- صفحة البيع على `/buydoctorplant` بسعر 449 جنيه، نفس دفع كانفا (Kashier + Instapay)
- إعادة توجيه `/products/plant` و `/products/plant/:path*` إلى تطبيق الدليل عبر `PLANT_APP_ORIGIN`
- `/` و `/products/1000` يفضلوا زي ما هم (منتج كانفا)
- `/admin` يبقى على المتجر، مع قمع: فتح الصفحة / سكرول / الوصول للدفع / ملء الفورم / مشتريات، وفلتر منتج `all | plant | 1000`

## متغيرات Vercel على مشروع المتجر (1000)

- `PLANT_APP_ORIGIN` = رابط نشر دليل النباتات (مشروع `plant` على Vercel)
- `PLANT_DELIVERY_URL` = `https://www.mahmoudelkousy.online/products/plant`
- `PLANT_PRODUCT_PRICE` = `449`
