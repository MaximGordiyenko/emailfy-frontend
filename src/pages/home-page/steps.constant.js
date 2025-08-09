export const steps = [
  {
    id: "step0",
    questionId: "marketingChannels",
    transitions: {
      sms: "step00",
      push: "step00",
      social: "step00",
      ads: "step00"
    }
  },
  {
    id: "step00",
    questionId: "emailTypes",
    transitions: {
      promo: "step1",
      triggers: "step1",
      news: "step1",
      welcome: "step1"
    }
  },
  {
    id: "step1",
    questionId: "companyType",
    transitions: {
      ecommerce: "step2",
      saas: "step3",
      other: "step4"
    }
  },
  {
    id: "step2",
    questionId: "ecommercePlatform",
    transitions: {
      shopify: "step4",
      woo: "step4",
      other: "step4"
    }
  },
  {
    id: "step3",
    questionId: "saasStack",
    transitions: {
      crm: "step4",
      analytics: "step4",
      other: "step4"
    }
  },
  {
    id: "step4",
    questionId: "audienceSize",
    transitions: {
      "<1k": "step5",
      "1k-10k": "step5",
      ">10k": "step5"
    }
  },
  {
    id: "step5",
    questionId: "platformExperience",
    transitions: {
      yes: "step6",
      no: "step6"
    }
  },
  {
    id: "step6",
    questionId: "emailGoals",
    transitions: {
      sales: "done",
      awareness: "done",
      retention: "done"
    }
  }
];
