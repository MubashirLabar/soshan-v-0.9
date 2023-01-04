const data = [
  {
    _id: 1,
    name: "WESTERN SHIRT",
    slug: "western-shirt",
    bread_crums: "HANUKKA82",
    front_image: "pic-3.jpeg",
    back_image: "pic-4.jpeg",
    price: "1200.00",
    description: {
      line_1: "American grown supima cotton in white twill ",
      line_2: "with natural stretch, woven in Italy by Albini",
    },
    size: [
      { label: "Small" },
      { label: "Medium" },
      { label: "Large" },
      { label: "XLarge" },
    ],
    corner: [
      { label: "One hole" },
      //{ label: "Two hole" }
    ],
    tzStyle: [
      { label: "Arizal" },
      { label: "Ashkenaz" },
      // { label: "Rambam 7" },
      // { label: "Rambam 13" },
      { label: "Sephard" },
      { label: "Untied" },
    ],
    tzColor: [
      //{ label: "Techelet (₪100)" },
      { label: "White" },
    ],
    features: [
      { point: "Kosher per leading halachic authorities" },
      { point: "Western spread collar with barrel cuff" },
      { point: "Tailored double yoke & corner facings" },
      { point: "Handwash warm or eco dryclean only" },
      { point: "Design by Shoshan, product of Israel" },
    ],
  },
  {
    _id: 2,
    name: "EASTERN SHIRT",
    slug: "eastern-shirt",
    bread_crums: "HANUKKA82",
    front_image: "est-side-pic.jpg",
    back_image: "est-back-pic.jpg",
    price: "1200.00",
    description: {
      line_1: "American grown supima cotton in white twill",
      line_2: "with natural stretch, woven in Italy by Albini",
    },
    size: [
      { label: "Small" },
      { label: "Medium" },
      { label: "Large" },
      { label: "XLarge" },
    ],
    corner: [
      { label: "One hole" },
      //{ label: "Two hole" }
    ],
    tzStyle: [
      { label: "Arizal" },
      { label: "Ashkenaz" },
      // { label: "Rambam 7" },
      // { label: "Rambam 13" },
      { label: "Sephard" },
      { label: "Untied" },
    ],
    tzColor: [
      //{ label: "Techelet (₪100)" },
      { label: "White" },
    ],
    features: [
      { point: "Kosher per leading halachic authorities" },
      { point: "Eastern band collar with barrel cuff", eastern: true },
      { point: "Tailored double yoke & corner facings" },
      { point: "Handwash warm or eco dryclean only" },
      { point: "Design by Shoshan, product of Israel" },
    ],
  },
];

export default data;
