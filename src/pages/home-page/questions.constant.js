export const questions = [
  {
    id: "marketingChannels",
    type: "checkbox",
    text: "Які канали маркетингу ви використовуєте крім email?",
    options: [
      { label: "SMS", value: "sms" },
      { label: "Push-сповіщення", value: "push" },
      { label: "Соцмережі (Facebook, Instagram)", value: "social" },
      { label: "Контекстна реклама", value: "ads" }
    ]
  },
  {
    id: "emailTypes",
    type: "checkbox",
    text: "Які типи email ви хочете надсилати?",
    options: [
      { label: "Промо-акції", value: "promo" },
      { label: "Тригери (покинутий кошик тощо)", value: "triggers" },
      { label: "Інформаційні розсилки", value: "news" },
      { label: "Вітальні серії", value: "welcome" }
    ]
  },
  {
    id: "companyType",
    type: "select",
    text: "Яка у вас компанія?",
    options: [
      { label: "eCommerce", value: "ecommerce" },
      { label: "SaaS", value: "saas" },
      { label: "Інше", value: "other" }
    ]
  },
  {
    id: "audienceSize",
    type: "select",
    text: "Скільки у вас підписників?",
    options: [
      { label: "До 1,000", value: "<1k" },
      { label: "1,000–10,000", value: "1k-10k" },
      { label: "10,000+", value: ">10k" }
    ]
  },
  {
    id: "platformExperience",
    type: "radio",
    text: "Ви вже використовували email-платформи?",
    options: [
      { label: "Так", value: "yes" },
      { label: "Ні", value: "no" }
    ]
  },
  {
    id: "emailGoals",
    type: "select",
    text: "Яка ваша мета?",
    options: [
      { label: "Збільшити продажі", value: "sales" },
      { label: "Підвищити впізнаваність", value: "awareness" },
      { label: "Повернути користувачів", value: "retention" }
    ]
  },
  {
    id: "ecommercePlatform",
    type: "select",
    text: "Яку платформу ви використовуєте?",
    options: [
      { label: "Shopify", value: "shopify" },
      { label: "WooCommerce", value: "woo" },
      { label: "Інше", value: "other" }
    ]
  },
  {
    id: "saasStack",
    type: "select",
    text: "Які інструменти ви використовуєте в SaaS?",
    options: [
      { label: "CRM (Hubspot, Pipedrive)", value: "crm" },
      { label: "Аналітика (GA4, Mixpanel)", value: "analytics" },
      { label: "Інше", value: "other" }
    ]
  }
];
