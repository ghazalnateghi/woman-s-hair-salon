export type Lang = 'fa' | 'en'
export type T = { fa: string; en: string }
const t = (fa: string, en: string): T => ({ fa, en })

export const img = (name: string) => `${import.meta.env.BASE_URL}img/${name}.jpg`

/* ─────────── services (home catalogue strip) ─────────── */
export const services = [
  { id: 'color', img: 's-color', title: t('رنگ و لایت', 'Color & Highlights'), from: 1_800_000 },
  { id: 'keratin', img: 's-keratin', title: t('کراتین و احیا', 'Keratin & Repair'), from: 2_500_000 },
  { id: 'facial', img: 's-facial', title: t('فیشیال و پاکسازی', 'Facial & Cleansing'), from: 950_000 },
  { id: 'makeup', img: 's-makeup', title: t('میکاپ و شینیون', 'Makeup & Updo'), from: 3_200_000 },
  { id: 'nails', img: 's-nails', title: t('ناخن و ژلیش', 'Nails & Gel Polish'), from: 450_000 },
  { id: 'cut', img: 's-hair', title: t('کوپ و براشینگ', 'Cut & Blow-dry'), from: 600_000 },
  { id: 'spa', img: 's-massage', title: t('اسپا و ماساژ', 'Spa & Massage'), from: 1_200_000 },
]

/* ─────────── shop ─────────── */
export const categories = [
  { id: 'skin', img: 'p1', title: t('مراقبت پوست', 'Skin care') },
  { id: 'hair', img: 'p2', title: t('مراقبت مو', 'Hair care') },
  { id: 'oil', img: 'p3', title: t('روغن‌های گیاهی', 'Botanical oils') },
  { id: 'body', img: 'p10', title: t('مراقبت بدن', 'Body care') },
  { id: 'makeup', img: 'p13', title: t('آرایشی', 'Makeup') },
  { id: 'scent', img: 'p12', title: t('عطر', 'Fragrance') },
]

export type Product = {
  id: string
  cat: string
  img: string
  gallery: string[]
  name: T
  brand: string
  price: number
  sizes: string[]
  rating: number
  tag?: T
  desc: T
  use: T
}

const P = (
  id: string, cat: string, imgName: string, gallery: string[], name: T, brand: string,
  price: number, sizes: string[], rating: number, desc: T, use: T, tag?: T,
): Product => ({ id, cat, img: imgName, gallery: [imgName, ...gallery], name, brand, price, sizes, rating, desc, use, tag })

const NEW = t('جدید', 'New')
const BEST = t('پرفروش', 'Bestseller')

export const products: Product[] = [
  P('hydra-serum', 'skin', 'p1', ['p7', 's-facial'], t('سرم آبرسان هیالورونیک', 'Hyaluronic Hydrating Serum'), 'Velora Lab', 480_000, ['30ml', '50ml'], 5,
    t('سرم سبک با هیالورونیک اسید و نیاسینامید که آب پوست را حفظ می‌کند و درخشش طبیعی می‌دهد؛ مناسب انواع پوست، حتی پوست حساس.', 'A light serum with hyaluronic acid and niacinamide that locks in moisture and adds a natural glow — for all skin types, even sensitive.'),
    t('صبح و شب، ۲ تا ۳ قطره روی پوست تمیز و کمی مرطوب.', 'Morning and night, 2–3 drops on clean, slightly damp skin.'), BEST),
  P('repair-mask', 'hair', 'p2', ['s-keratin', 's-hair'], t('ماسک احیاکننده مو', 'Restorative Hair Mask'), 'Act+Acre', 360_000, ['200ml'], 5,
    t('ماسک بدون سولفات و پارابن برای موهای رنگ‌شده و کراتینه‌شده؛ موخوره و وز را کم می‌کند و ماندگاری کراتین را بالا می‌برد.', 'Sulfate- and paraben-free mask for colored and keratin-treated hair; reduces split ends and frizz and extends keratin results.'),
    t('هفته‌ای دو بار، ۵ تا ۱۰ دقیقه روی موی شسته‌شده.', 'Twice a week, 5–10 minutes on washed hair.'), BEST),
  P('argan-oil', 'oil', 'p3', ['p14'], t('روغن آرگان خالص', 'Pure Argan Oil'), 'Velora Lab', 520_000, ['30ml', '100ml'], 4,
    t('روغن آرگان پرس سرد مراکشی برای براقیت مو، تغذیه‌ی ناخن و پوست خشک.', 'Cold-pressed Moroccan argan oil for glossy hair, nourished nails and dry skin.'),
    t('چند قطره روی سر شاخه‌های موی نم‌دار یا روی پوست.', 'A few drops on damp hair ends or on skin.')),
  P('moist-cream', 'skin', 'p4', ['p15'], t('کرم مرطوب‌کننده روزانه', 'Daily Moisturising Cream'), 'Neauthy', 410_000, ['50ml'], 4,
    t('کرم سبک با سرامید و آلوئه‌ورا؛ جذب سریع، بدون چربی و مناسب زیر آرایش.', 'A light cream with ceramides and aloe; fast-absorbing, non-greasy and makeup-friendly.'),
    t('صبح‌ها پس از سرم و پیش از ضدآفتاب.', 'Every morning after serum, before sunscreen.')),
  P('sulfate-free', 'hair', 'p5', ['s-color'], t('شامپو بدون سولفات', 'Sulfate-free Shampoo'), 'Maui', 390_000, ['385ml'], 5,
    t('شامپوی ملایم مخصوص بعد از کراتین و رنگ؛ رنگ مو را نمی‌شوید و پوست سر را خشک نمی‌کند.', 'A gentle shampoo for after keratin and color; keeps color in and scalp comfortable.'),
    t('روی پوست سر ماساژ دهید و کامل آبکشی کنید.', 'Massage into scalp and rinse well.'), NEW),
  P('gentle-cleanser', 'skin', 'p6', [], t('ژل شست‌وشوی ملایم', 'Gentle Cleansing Gel'), 'Velora Lab', 320_000, ['150ml'], 4,
    t('ژل شوینده با pH متعادل که آرایش و آلودگی را بدون کشیدگی پوست پاک می‌کند.', 'A pH-balanced gel that lifts makeup and pollution without tightness.'),
    t('صبح و شب روی پوست مرطوب، سپس آبکشی.', 'Morning and night on damp skin, then rinse.')),
  P('vitc-serum', 'skin', 'p7', ['p1'], t('سرم ویتامین C', 'Vitamin C Serum'), 'Velora Lab', 560_000, ['30ml'], 5,
    t('سرم روشن‌کننده با ویتامین C پایدار برای یکدست کردن رنگ پوست و کاهش لک.', 'A brightening serum with stable vitamin C to even tone and fade spots.'),
    t('صبح‌ها، همیشه همراه با ضدآفتاب.', 'Mornings, always with sunscreen.'), NEW),
  P('scalp-oil', 'oil', 'p8', ['p3'], t('روغن تقویت پوست سر', 'Scalp Strengthening Oil'), 'Herbal Co.', 440_000, ['100ml'], 4,
    t('ترکیب روغن رزماری و دانه‌ی کنف برای تقویت ریشه و کاهش ریزش.', 'Rosemary and hemp-seed blend to strengthen roots and reduce shedding.'),
    t('شب‌ها روی پوست سر ماساژ دهید و صبح بشویید.', 'Massage into scalp at night, wash out in the morning.')),
  P('night-cream', 'skin', 'p9', [], t('کرم شب جوان‌ساز', 'Renewing Night Cream'), 'Noir', 690_000, ['50ml'], 5,
    t('کرم شب با رتینول ملایم و پپتید برای بازسازی پوست در طول خواب.', 'A night cream with gentle retinol and peptides to renew skin overnight.'),
    t('شب‌ها روی پوست خشک؛ هفته‌ی اول یک شب در میان.', 'At night on dry skin; every other night in week one.')),
  P('body-lotion', 'body', 'p10', [], t('لوسیون بدن', 'Body Lotion'), 'Velora Lab', 350_000, ['250ml', '500ml'], 4,
    t('لوسیون آبرسان با شی‌باتر و رایحه‌ی ملایم شکوفه.', 'A hydrating lotion with shea butter and a soft blossom scent.'),
    t('بعد از دوش روی پوست کمی مرطوب.', 'After showering on slightly damp skin.')),
  P('spf50', 'skin', 'p11', [], t('ضدآفتاب SPF50', 'Sunscreen SPF50'), 'Bioglow', 470_000, ['50ml'], 5,
    t('ضدآفتاب بی‌رنگ و سبک با محافظت بالا، بدون سفیدک.', 'A sheer, light high-protection sunscreen with no white cast.'),
    t('آخرین مرحله‌ی روتین صبح؛ هر دو ساعت تمدید.', 'Last step of your morning routine; reapply every two hours.'), BEST),
  P('eau-velora', 'scent', 'p12', [], t('ادوپرفیوم ولورا', 'Eau de Velora'), 'Velora', 1_850_000, ['50ml', '100ml'], 5,
    t('رایحه‌ی گلی-چوبی با نت‌های یاس، مشک و صندل؛ ماندگاری بالا.', 'A floral-woody scent with jasmine, musk and sandalwood; long-lasting.'),
    t('روی نقاط نبض: مچ و پشت گوش.', 'On pulse points: wrists and behind the ears.'), NEW),
  P('nude-palette', 'makeup', 'p13', [], t('پالت سایه نود', 'Nude Eyeshadow Palette'), 'Too Faced', 1_250_000, ['12 colors'], 4,
    t('دوازده رنگ مات و شیمری برای آرایش روزانه تا مجلسی.', 'Twelve matte and shimmer shades from everyday to evening looks.'),
    t('با براش یا انگشت؛ از رنگ روشن به تیره.', 'With a brush or fingertip; light to dark.')),
  P('coco-oil', 'oil', 'p14', [], t('روغن نارگیل', 'Coconut Oil'), 'Cocooil', 290_000, ['250ml'], 4,
    t('روغن نارگیل تصفیه‌نشده برای پیش از حمام مو و نرمی پوست.', 'Unrefined coconut oil for pre-wash hair treatments and soft skin.'),
    t('۳۰ دقیقه پیش از شست‌وشو روی مو.', '30 minutes before washing, on hair.')),
  P('aqua-gel', 'skin', 'p15', ['p4'], t('ژل‌کرم آبرسان', 'Aqua Gel Cream'), 'Velora Lab', 430_000, ['50ml'], 5,
    t('ژل‌کرم خنک و سبک برای پوست چرب و مختلط؛ بدون مسدود کردن منافذ.', 'A cooling, light gel cream for oily and combination skin; non-comedogenic.'),
    t('صبح و شب پس از سرم.', 'Morning and night after serum.')),
  P('routine-set', 'skin', 'p16', ['p1', 'p4'], t('ست روتین پوست', 'Skin Routine Set'), 'Velora Lab', 1_390_000, ['set'], 5,
    t('شوینده، سرم و کرم در یک ست هدیه با جعبه‌ی ولورا.', 'Cleanser, serum and cream in one Velora gift box.'),
    t('مراحل را به ترتیب شماره روی جعبه انجام دهید.', 'Follow the numbered steps on the box.'), t('هدیه', 'Gift')),
]

export const byId = (id: string) => products.find((p) => p.id === id)

/* ─────────── blog ─────────── */
export const posts = [
  { img: 's-keratin', date: t('۲۸ آبان ۱۴۰۵', '19 Nov 2026'),
    title: t('۷ نکته‌ی طلایی مراقبت بعد از کراتین', '7 golden rules after a keratin treatment'),
    text: t('تا ۷۲ ساعت مو را نشویید و نبندید، از شامپوی بدون سولفات استفاده کنید و از آب کلردار استخر دوری کنید تا نتیجه ماه‌ها بماند.', 'Don’t wash or tie your hair for 72 hours, use sulfate-free shampoo and avoid chlorinated pools so results last for months.') },
  { img: 's-color', date: t('۱۵ آبان ۱۴۰۵', '6 Nov 2026'),
    title: t('رنگ موی مناسب پاییز و زمستان', 'Hair colors for autumn & winter'),
    text: t('شکلاتی دودی، کاراملی گرم و بالیاژ عسلی؛ رنگ‌هایی که با رنگ پوست ایرانی هماهنگ‌ترند و نیاز به رنگ ریشه را کم می‌کنند.', 'Smoky chocolate, warm caramel and honey balayage — shades that suit Iranian skin tones and need fewer root touch-ups.') },
  { img: 's-nails2', date: t('۲ آبان ۱۴۰۵', '24 Oct 2026'),
    title: t('ژلیش یا کاشت؛ کدام برای شما بهتر است؟', 'Gel polish or extensions: which suits you?'),
    text: t('ژلیش روی ناخن طبیعی و برای ۲ تا ۳ هفته است؛ کاشت طول و فرم می‌دهد و برای ناخن‌های شکننده انتخاب بهتری است.', 'Gel polish sits on natural nails for 2–3 weeks; extensions add length and shape and suit brittle nails better.') },
  { img: 's-facial2', date: t('۲۰ مهر ۱۴۰۵', '12 Oct 2026'),
    title: t('هیدرافیشیال چیست و به چه کسانی توصیه می‌شود؟', 'What is a HydraFacial, and who is it for?'),
    text: t('پاکسازی، لایه‌برداری و آبرسانی در یک جلسه‌ی ۶۰ دقیقه‌ای؛ بدون دوره‌ی نقاهت و مناسب پیش از مراسم.', 'Cleansing, exfoliation and hydration in one 60-minute session — no downtime, perfect before an event.') },
]

/* ─────────── faq ─────────── */
export const faqs = [
  { q: t('چطور نوبت رزرو کنم؟', 'How do I book an appointment?'),
    a: t('از طریق دکمه‌ی «رزرو نوبت» در سایت، تماس تلفنی یا دایرکت اینستاگرام. پس از هماهنگی زمان، پیامک تأیید برایتان ارسال می‌شود.', 'Use the “Book” button, call us or DM us on Instagram. Once the time is set, you’ll receive a confirmation SMS.') },
  { q: t('برای قطعی شدن نوبت بیعانه لازم است؟', 'Do I need to pay a deposit?'),
    a: t('برای خدمات بالای دو ساعت (مثل کراتین، رنگ و میکاپ عروس) ۳۰٪ بیعانه به‌صورت کارت‌به‌کارت دریافت می‌شود که از مبلغ نهایی کم می‌شود.', 'For services over two hours (keratin, color, bridal makeup) we take a 30% deposit by card transfer, deducted from the final bill.') },
  { q: t('اگر نتوانم بیایم، نوبتم را چطور لغو کنم؟', 'How can I cancel or reschedule?'),
    a: t('تا ۲۴ ساعت قبل از نوبت می‌توانید بدون هزینه آن را جابه‌جا یا لغو کنید؛ پس از آن بیعانه قابل استرداد نیست اما یک بار قابل انتقال است.', 'Up to 24 hours before, you can reschedule or cancel for free; after that the deposit is non-refundable but can be moved once.') },
  { q: t('مواد مصرفی شما اورجینال است؟', 'Are your products original?'),
    a: t('بله. همه‌ی رنگ‌ها و مواد کراتین وارداتی و دارای برچسب اصالت هستند و پیش از شروع کار، پلمپ آن‌ها جلوی شما باز می‌شود.', 'Yes. All colors and keratin products are imported with authenticity labels, and we open the seal in front of you.') },
  { q: t('ارسال محصولات فروشگاه چقدر طول می‌کشد؟', 'How long does shop delivery take?'),
    a: t('تهران: همان روز تا ۲۴ ساعت با پیک؛ سایر شهرها: ۲ تا ۴ روز کاری با پست پیشتاز. خریدهای بالای ۲ میلیون تومان ارسال رایگان دارند.', 'Tehran: same day to 24 hours by courier; other cities: 2–4 working days by express post. Free delivery over 2M Toman.') },
]

/* ─────────── reviews ─────────── */
export const reviews = [
  { name: t('سارا م.', 'Sara M.'), service: t('بالیاژ', 'Balayage'), text: t('رنگ‌سنجی خیلی دقیق بود و بالیاژ دقیقاً همونی شد که عکسش رو برده بودم. موهام هم اصلاً آسیب ندید.', 'The color matching was spot on and my balayage looked exactly like my reference photo — with zero damage.') },
  { name: t('مریم ر.', 'Maryam R.'), service: t('کراتین', 'Keratin'), text: t('بعد از چهار ماه هنوز موهام صاف و براقه. محیط خیلی تمیز و آرومه و پلمپ مواد رو جلوی خودم باز کردن.', 'Four months later my hair is still smooth and glossy. Spotless, calm space — they opened the product seal in front of me.') },
  { name: t('نگار ش.', 'Negar Sh.'), service: t('میکاپ عروس', 'Bridal makeup'), text: t('میکاپ و شینیون تا آخر شب بی‌نقص موند. برخورد تیم فوق‌العاده گرم و حرفه‌ای بود.', 'Makeup and updo stayed flawless all night. The team was incredibly warm and professional.') },
  { name: t('الناز ک.', 'Elnaz K.'), service: t('ژلیش', 'Gel polish'), text: t('ژلیشم سه هفته بدون حتی یه پریدگی موند. ابزارها جلوی چشمم استریل شد.', 'My gel lasted three weeks without a single chip. Tools were sterilised right in front of me.') },
  { name: t('ترانه ا.', 'Taraneh A.'), service: t('هیدرافیشیال', 'HydraFacial'), text: t('پوستم بعد از یک جلسه کاملاً روشن و شاداب شد. مشاوره‌ی قبل از کار خیلی کمک کرد.', 'My skin looked bright and fresh after one session. The consultation beforehand really helped.') },
]

export const contact = {
  address: t('تهران، سعادت‌آباد، بلوار دریا، پلاک ۲۴', '24 Darya Blvd, Saadat Abad, Tehran'),
  phone: t('۰۲۱-۱۲۳۴ ۵۶۷۸', '+98 21 1234 5678'),
  tel: '+982112345678',
  insta: '@velora.beauty',
  hours: [
    [t('شنبه تا چهارشنبه', 'Sat – Wed'), t('۱۰ — ۲۰', '10 — 20')],
    [t('پنجشنبه', 'Thursday'), t('۱۰ — ۱۸', '10 — 18')],
    [t('جمعه', 'Friday'), t('تعطیل', 'Closed')],
  ] as [T, T][],
}

/* ─────────── UI strings ─────────── */
export const ui = {
  fa: {
    nav: { home: 'خانه', shop: 'فروشگاه', services: 'خدمات', blog: 'مجله', faq: 'سوالات', contact: 'تماس' },
    book: 'رزرو نوبت',
    langSwitch: 'EN',
    toman: 'تومان',
    from: 'از',
    hero: { a: 'ما برای شما', aEm: 'می‌سازیم', b: 'با', bEm: 'عشق', text: 'سالن زیبایی تخصصی بانوان؛ مو، پوست، ناخن و میکاپ با مواد اورجینال و ابزار استریل.', cta: 'رزرو نوبت', shop: 'فروشگاه' },
    catalog: { t: 'کاتالوگ', em: 'خدمات', all: 'همه‌ی خدمات' },
    about: { t: 'درباره', em: 'ولورا', lead: 'ولورا — جایی که داستان زیبایی شما شروع می‌شود', text: 'از سال ۱۳۹۳، تیم ولورا با بیش از ۲۵ متخصص دارای مدرک فنی‌وحرفه‌ای در کنار بانوان تهرانی است. پیش از هر خدمت، مشاوره‌ی رایگان رنگ، فرم مو و نوع پوست انجام می‌دهیم تا نتیجه دقیقاً همان چیزی باشد که می‌خواهید.', more: 'بیشتر بخوانید', stats: [['+۱۲', 'سال تجربه'], ['+۸۰۰۰', 'مشتری'], ['۲۵', 'متخصص']] },
    blog: { t: 'مجله', em: 'زیبایی ولورا', read: 'ادامه‌ی مطلب' },
    faq: { t: 'پاسخ', em: 'به سوالات', text: 'سوالی دارید که اینجا نیست؟ در دایرکت اینستاگرام یا تلفنی با ما در ارتباط باشید؛ همکاران ما همه‌روزه از ۱۰ تا ۲۰ پاسخ‌گو هستند.' },
    rev: { t: 'نظرات', em: 'مشتریان', score: 'امتیاز ما', count: 'بر اساس ۱٬۲۴۰ نظر' },
    foot: { t: 'زیبایی شما', em: 'در دستان ما', cta: 'رزرو نوبت', cols: ['خریداران', 'ولورا', 'شبکه‌ها'], buyers: ['ارسال و تحویل', 'بازگشت کالا', 'پرداخت', 'سوالات متداول'], velora: ['درباره ما', 'خدمات', 'مجله', 'تماس'], social: ['اینستاگرام', 'تلگرام', 'واتساپ'], rights: '© ۱۴۰۵ ولورا — تمامی حقوق محفوظ است.', privacy: 'حریم خصوصی', terms: 'قوانین و مقررات', dev: 'طراحی ولورا' },
    shop: {
      crumbs: ['خانه', 'فروشگاه'], cats: 'دسته‌بندی', catsEm: 'محصولات', all: 'همه', catalog: 'کاتالوگ', catalogEm: 'محصولات',
      filters: 'فیلترها', sort: 'مرتب‌سازی', sorts: ['پیشنهادی', 'ارزان‌ترین', 'گران‌ترین', 'محبوب‌ترین'], more: 'نمایش بیشتر', empty: 'محصولی با این فیلترها پیدا نشد.',
      price: 'قیمت', min: 'از', max: 'تا', cat: 'دسته', brand: 'برند', rating: 'امتیاز', apply: 'اعمال فیلتر', reset: 'پاک کردن فیلترها', count: 'محصول',
      custom: 'پکیج', customEm: 'اختصاصی شما', customText: 'روتین پوست و موی خود را با مشاوره‌ی رایگان متخصصین ولورا بسازید؛ ما محصولات مناسب نوع پوست و موی شما را در یک پکیج هدیه آماده می‌کنیم.', customCta: 'درخواست مشاوره',
      deliver: ['ارسال', 'با دقت و', 'سریع'], deliverText: 'تهران همان روز با پیک · سایر شهرها ۲ تا ۴ روز · ارسال رایگان بالای ۲ میلیون تومان', deliverCta: 'شروع خرید',
    },
    product: { crumbs: 'محصول', desc: 'توضیحات', use: 'نحوه‌ی مصرف', size: 'حجم', qty: 'تعداد', add: 'افزودن به سبد', added: 'به سبد اضافه شد', brand: 'برند', related: 'همراه این محصول', relatedEm: 'پیشنهاد ما', original: 'ضمانت اصالت کالا', ship: 'ارسال رایگان بالای ۲ میلیون' },
    cart: {
      steps: ['سبد خرید', 'اطلاعات ارسال', 'تکمیل'], t: 'سبد', em: 'خرید شما', empty: 'سبد خرید شما خالی است.', go: 'رفتن به فروشگاه',
      summary: 'خلاصه سفارش', sub: 'جمع کالاها', ship: 'هزینه ارسال', free: 'رایگان', disc: 'تخفیف', total: 'مبلغ قابل پرداخت', promo: 'کد تخفیف', apply: 'اعمال', promoOk: 'کد VELORA10 اعمال شد', promoBad: 'کد نامعتبر است (امتحان کنید: VELORA10)',
      checkout: 'ادامه‌ی خرید', view: 'مشاهده سبد', remove: 'حذف', like: 'شاید', likeEm: 'دوست داشته باشید',
      news: 'در خبرنامه عضو شوید تا زودتر از همه از تخفیف‌ها و نوبت‌های خالی باخبر شوید', email: 'ایمیل شما', join: 'عضویت', thanks: 'ممنون! به‌زودی خبرتان می‌کنیم.', agree: 'با قوانین و حریم خصوصی موافقم',
    },
    co: {
      t: 'تکمیل', em: 'سفارش', buyer: 'اطلاعات خریدار', name: 'نام و نام خانوادگی', phone: 'شماره موبایل', email: 'ایمیل (اختیاری)', receiver: 'اطلاعات گیرنده', same: 'گیرنده خودم هستم', rname: 'نام گیرنده', rphone: 'موبایل گیرنده',
      callQ: 'برای هماهنگی با شما تماس بگیریم؟', callYes: 'بله، تماس بگیرید', callNo: 'نیازی نیست', delivery: 'ارسال', city: 'شهر', address: 'آدرس کامل', postal: 'کد پستی', date: 'تاریخ تحویل', note: 'توضیحات سفارش',
      method: [['courier', 'پیک تهران (همان روز)'], ['post', 'پست پیشتاز (۲ تا ۴ روز)'], ['pickup', 'تحویل حضوری از سالن']], gift: 'بسته‌بندی هدیه (+۹۰ هزار تومان)', agree: 'قوانین و مقررات را می‌پذیرم', pay: 'ثبت سفارش', back: 'بازگشت به سبد',
      doneT: 'سفارش شما', doneEm: 'ثبت شد', doneText: 'کد پیگیری سفارش برایتان پیامک می‌شود. همکاران ما برای هماهنگی ارسال با شما تماس می‌گیرند.', code: 'کد پیگیری', home: 'بازگشت به خانه',
    },
  },
  en: {
    nav: { home: 'Home', shop: 'Shop', services: 'Services', blog: 'Journal', faq: 'FAQ', contact: 'Contact' },
    book: 'Book now',
    langSwitch: 'FA',
    toman: 'Toman',
    from: 'from',
    hero: { a: 'We create', aEm: 'for you', b: 'with', bEm: 'love', text: 'A specialist women’s salon — hair, skin, nails and makeup with original products and sterilised tools.', cta: 'Book now', shop: 'Shop' },
    catalog: { t: 'Service', em: 'catalogue', all: 'All services' },
    about: { t: 'About', em: 'Velora', lead: 'Velora — where your beauty story begins', text: 'Since 2014, Velora’s team of 25+ certified specialists has cared for women in Tehran. Before every service we offer a free consultation on color, cut and skin type, so the result is exactly what you want.', more: 'Read more', stats: [['12+', 'Years'], ['8000+', 'Clients'], ['25', 'Specialists']] },
    blog: { t: 'Velora', em: 'beauty journal', read: 'Read more' },
    faq: { t: 'Answers', em: 'to questions', text: 'Can’t find your question? Message us on Instagram or call — we reply every day from 10 to 20.' },
    rev: { t: 'Client', em: 'reviews', score: 'Our rating', count: 'from 1,240 reviews' },
    foot: { t: 'Your beauty', em: 'in our hands', cta: 'Book now', cols: ['Customers', 'Velora', 'Social'], buyers: ['Shipping', 'Returns', 'Payment', 'FAQ'], velora: ['About', 'Services', 'Journal', 'Contact'], social: ['Instagram', 'Telegram', 'WhatsApp'], rights: '© 2026 Velora — All rights reserved.', privacy: 'Privacy policy', terms: 'Terms & conditions', dev: 'Designed by Velora' },
    shop: {
      crumbs: ['Home', 'Shop'], cats: 'Product', catsEm: 'categories', all: 'All', catalog: 'Product', catalogEm: 'catalogue',
      filters: 'Filters', sort: 'Sort', sorts: ['Featured', 'Price: low to high', 'Price: high to low', 'Top rated'], more: 'Show more', empty: 'No products match these filters.',
      price: 'Price', min: 'From', max: 'To', cat: 'Category', brand: 'Brand', rating: 'Rating', apply: 'Apply', reset: 'Reset filters', count: 'products',
      custom: 'Your', customEm: 'custom package', customText: 'Build your skin and hair routine with a free consultation from Velora specialists — we’ll gift-box the right products for your skin and hair type.', customCta: 'Request a consultation',
      deliver: ['We deliver', 'carefully &', 'fast'], deliverText: 'Tehran same day by courier · other cities 2–4 days · free over 2M Toman', deliverCta: 'Start shopping',
    },
    product: { crumbs: 'Product', desc: 'Description', use: 'How to use', size: 'Size', qty: 'Qty', add: 'Add to cart', added: 'Added to cart', brand: 'Brand', related: 'Goes well', relatedEm: 'with this', original: 'Authenticity guaranteed', ship: 'Free delivery over 2M' },
    cart: {
      steps: ['Cart', 'Delivery', 'Done'], t: 'Your', em: 'cart', empty: 'Your cart is empty.', go: 'Go to shop',
      summary: 'Order summary', sub: 'Subtotal', ship: 'Delivery', free: 'Free', disc: 'Discount', total: 'Total', promo: 'Promo code', apply: 'Apply', promoOk: 'VELORA10 applied', promoBad: 'Invalid code (try VELORA10)',
      checkout: 'Checkout', view: 'View cart', remove: 'Remove', like: 'You may', likeEm: 'also like',
      news: 'Join our newsletter to hear about offers and open slots first', email: 'Your email', join: 'Join', thanks: 'Thank you! We’ll keep you posted.', agree: 'I agree to the terms and privacy policy',
    },
    co: {
      t: 'Place', em: 'your order', buyer: 'Buyer details', name: 'Full name', phone: 'Mobile number', email: 'Email (optional)', receiver: 'Recipient details', same: 'I’m the recipient', rname: 'Recipient name', rphone: 'Recipient mobile',
      callQ: 'Shall we call you to confirm?', callYes: 'Yes, call me', callNo: 'No need', delivery: 'Delivery', city: 'City', address: 'Full address', postal: 'Postal code', date: 'Delivery date', note: 'Order notes',
      method: [['courier', 'Tehran courier (same day)'], ['post', 'Express post (2–4 days)'], ['pickup', 'Pick up at the salon']], gift: 'Gift wrapping (+90K Toman)', agree: 'I accept the terms & conditions', pay: 'Place order', back: 'Back to cart',
      doneT: 'Your order', doneEm: 'is placed', doneText: 'Your tracking code will be sent by SMS. Our team will call you to arrange delivery.', code: 'Tracking code', home: 'Back to home',
    },
  },
}

export type UI = (typeof ui)['fa']
