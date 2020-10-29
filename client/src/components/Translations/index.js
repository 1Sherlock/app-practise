import {LANG} from 'constant';

export default ({
  get news() {
    return LANG === 'uz' ? "Yangiliklar" : LANG === 'ru' ? "Новосты" : "Янгиликлар"
  },
  get home1() {
    return LANG === 'uz' ? "Bizning mobil dastur bilan barchasi yanada oson." : LANG === 'ru' ? "Это намного проще с нашим мобильным приложением." : "Бизнинг мобил дастур билан барчаси янада осон."
  },
  get allOperators() {
    return LANG === 'uz' ? "Barcha_operator" : LANG === 'ru' ? "Все_оператори" : "Барча_оператор"
  },
  get inputSearch() {
    return LANG === 'uz' ? "Xizmatlar bo’yicha izlash" : LANG === 'ru' ? "Сервисы поиска" : "Хизматлар бўйича излаш"
  },
  get operators() {
    return LANG === 'uz' ? "CALL CENTER" : LANG === 'ru' ? "CALL CENTER" : "CALL CENTER"
  },
  get personalCabinet() {
    return LANG === 'uz' ? "Shaxsiy kabinet" : LANG === 'ru' ? "Личный кабинет" : "Шахсий кабинет"
  },
  get downloadApp() {
    return LANG === 'uz' ? "Mobil ilovani yuklab olish" : LANG === 'ru' ? "Скачать мобильное приложение" : "Мобил иловани юклаб олиш"
  },
  get operatorText() {
    return LANG === 'uz' ? "Aloqa operatori xizmatlari" : LANG === 'ru' ? "Услуги оператори" : "Алоқа оператори хизматлари"
  },
  get network() {
    return LANG === 'uz' ? "Internet" : LANG === 'ru' ? "Интернет" : "Интернет"
  },
  get ussd() {
    return LANG === 'uz' ? "USSD kodlar" : LANG === 'ru' ? "USSD коды" : "Ussd кодлар"
  },
  get tarif() {
    return LANG === 'uz' ? "Tariflar" : LANG === 'ru' ? "Тарифы" : "Тарифлар"
  },
  get service() {
    return LANG === 'uz' ? "Xizmatlar" : LANG === 'ru' ? "Услуги" : "Хизматлар"
  },
  get daqiqa() {
    return LANG === 'uz' ? "Daqiqalar" : LANG === 'ru' ? "Минут" : "Дақиқа"
  },
  get sms() {
    return LANG === 'uz' ? "SMS" : LANG === 'ru' ? "СМС" : "СМС"
  },
  get networkText() {
    return LANG === 'uz' ? "Aloqa operatori internet paketlari" : LANG === 'ru' ? "Интернет пакеты" : "Алоқа оператори интернет пакетлари"
  },
  get tarifText() {
    return LANG === 'uz' ? "Aloqa operatori tariflari" : LANG === 'ru' ? "Тарифы на оператор" : "Алоқа оператори тарифлари"
  },
  get ussdText() {
    return LANG === 'uz' ? "Aloqa operatori ussd kodlari" : LANG === 'ru' ? "Ussd коды для оператора связи" : "Алоқа оператори Ussd кодлари"
  },
  get serviceText() {
    return LANG === 'uz' ? "Aloqa operatori xizmatlari" : LANG === 'ru' ? "Услуги оператор" : "Алоқа оператори хизматлари"
  },
  get moreText() {
    return LANG === 'uz' ? "Batafsil" : LANG === 'ru' ? "Узнать больше" : "Батафсил"
  },
})
