export const SUBSCRIBE_URL = 'https://subscribe.dtkt.ua/'
export const SUBSCRIBE_TRIAL_URL = 'https://subscribe.dtkt.ua/trial'

export const EMAIL = 'info@dtkt.ua'
export const EMAIL_SUBSCRIBE_HELP = 'peredplata@dtkt.ua'
export const EMAIL_FOR_SUBSCRIBERS = 'kucherova@dtkt.kiev.ua'
export const EMAIL_PARTNERSHIP = 'welcome@dtkt.ua'

export const SOCIAL_FACEBOOK = 'https://www.facebook.com/dtkt.ua'
export const SOCIAL_FACEBOOK_CLUB = 'https://www.facebook.com/groups/ClubOfAccountants/'
export const SOCIAL_TELEGRAM = 'https://telegram.me/dtkt_ua'
export const SOCIAL_INSTAGRAM = 'https://www.instagram.com/dtkt.ua/'
export const SOCIAL_VIBER = 'https://news.dtkt.ua/debet-kredit/portal-news/62567'
export const SOCIAL_VIBER_INVITE = 'https://invite.viber.com/?g2=AQAf9KPE%2FdXdr0uFqCcaCkI1aI%2BpjDu0rMu2%2B4uFPnUnFFkM%2FcSuDBgbdy%2FwySVR&lang=uk"'
export const SOCIAL_YOUTUBE = 'https://www.youtube.com/@dtkt_ua'
export const PHONE_CITY = '(044) 391 51 92'
export const PHONE_CITY_FOR_SUBSCRIBERS = '(044) 28 555 282'
export const PHONE_KSTR = '(067) 672 72 15'
export const PHONE_VDFN = '(095) 870 92 09'
export const PHONE_VDFN_PARTNERSHIP = '(066) 735 24 76'
export const PHONE_KSTR_PARTNERSHIP = '(067) 671 45 54'

export const NEWS_URL = 'https://news.dtkt.ua/'
export const DOCS_URL = 'https://docs.dtkt.ua/'
export const BLANK_URL = 'https://blank.dtkt.ua/'
export const CONSULTING_URL = 'https://consulting.dtkt.ua/'
export const SERVICES_URL = 'https://services.dtkt.ua/'
export const WEBINARY_URL = 'https://webinary.dtkt.ua/'
export const ONLINE_URL = 'https://online.dtkt.ua/'
export const SEMINARS_URL = 'https://seminars.dtkt.ua/'
export const MY_URL = 'https://my.dtkt.ua/'
export const MAIN_URL = 'https://dtkt.ua/'
export const CLUB_URL = 'https://club.dtkt.ua/'

export const DK_SITES_LINKS = {
    NEWS_URL,
    DOCS_URL,
    BLANK_URL,
    CONSULTING_URL,
    SERVICES_URL,
    WEBINARY_URL,
    ONLINE_URL,
    SEMINARS_URL,
    MY_URL,
    MAIN_URL,
    CLUB_URL
}

export const SOCIAL = {
    SOCIAL_FACEBOOK,
    SOCIAL_INSTAGRAM,
    SOCIAL_YOUTUBE,
    SOCIAL_TELEGRAM,
    SOCIAL_VIBER,
    SOCIAL_VIBER_INVITE,
    SOCIAL_FACEBOOK_CLUB
}

export const PHONE = {
    PHONE_CITY,
    PHONE_CITY_FOR_SUBSCRIBERS,
    PHONE_KSTR,
    PHONE_VDFN,
    PHONE_VDFN_PARTNERSHIP,
    PHONE_KSTR_PARTNERSHIP
}

export const PACKAGES = {
    'ma': {
        name: '«Мій асистент»',
        link: 'https://subscribe.dtkt.ua/checkout/ds-assistant/stand',
        linkDemo: 'https://subscribe.dtkt.ua/checkout/ds-demo/ma',
        product: 'ds-assistant',
        plan: 'stand'
    },
    'ex': {
        name: '«Експерт»',
        link: 'https://subscribe.dtkt.ua/checkout/ds-expert/stand',
        linkDemo: 'https://subscribe.dtkt.ua/checkout/ds-demo/ex',
        product: 'ds-expert',
        plan: 'stand'
    },
}

export const DK_SITES = [
    {
        title: 'Головна Дт-Кт',
        rel: 'dtkt',
        link: MAIN_URL
    },
    {
        title: 'Новини',
        rel: 'news',
        link: NEWS_URL
    },
    {
        title: 'Документи',
        rel: 'docs',
        link: DOCS_URL
    },
    {
        title: 'Бланки',
        rel: 'blank',
        link: BLANK_URL
    },
    {
        title: 'Консультації',
        rel: 'consulting',
        link: CONSULTING_URL
    },
    {
        title: 'Сервіси',
        rel: 'services',
        link: SERVICES_URL
    },
    {
        title: 'Вебінари',
        rel: 'webinary',
        link: WEBINARY_URL
    },
    {
        title: 'Семінари',
        rel: 'seminars',
        link: SEMINARS_URL
    },
    {
        title: 'Журнали',
        rel: 'online',
        link: ONLINE_URL
    },
    {
        title: 'Форум',
        rel: 'club',
        link: CLUB_URL
    },
    {
        title: 'Мій кабінет',
        rel: 'my',
        link: MY_URL
    },
]

export const LETTERS = {
    'а': 'a',
    'б': 'b',
    'в': 'v',
    'г': 'g',
    'д': 'd',
    'е': 'e',
    'є': 'ye',
    'ж': 'zh',
    'з': 'z',
    'и': 'y',
    'і': 'i',
    'ї': 'yi',
    'й': 'iy',
    'к': 'k',
    'л': 'l',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'u',
    'ф': 'f',
    'х': 'kh',
    'ц': 'ts',
    'ч': 'ch',
    'ш': 'sh',
    'щ': 'shh',
    'ю': 'iu',
    'я': 'ia',
    'a-z': 'a-z',
}

export default {
    SUBSCRIBE_URL,
    SUBSCRIBE_TRIAL_URL,
    EMAIL,
    EMAIL_SUBSCRIBE_HELP,
    EMAIL_FOR_SUBSCRIBERS,
    EMAIL_PARTNERSHIP,
    SOCIAL,
    PHONE,
    PACKAGES,
    DK_SITES,
    DK_SITES_LINKS,
    LETTERS
}