# صفحة هبوط ودليل النباتات على mahmoudelkousy.online

- الدليل التفاعلي: `https://www.mahmoudelkousy.online/products/plant`
- صفحة الشراء: `https://www.mahmoudelkousy.online/buydoctorplant`
- الأدمن: `https://www.mahmoudelkousy.online/admin`

التعديل الأساسي على ريبو المتجر `mahmoud3061993/1000`. طبّق الباتش:

```bash
cd 1000
git am mahmoudelkousy-storefront.patch
```

بعدها في Vercel Environment Variables:

- `PLANT_APP_ORIGIN` = رابط نشر دليل النباتات (المشروع ده) عشان `/products/plant` يتوجّه للدليل
- `PLANT_DELIVERY_URL` = `https://www.mahmoudelkousy.online/products/plant`
- `PLANT_PRODUCT_PRICE` = `449`
