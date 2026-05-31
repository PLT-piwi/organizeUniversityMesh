export const INITIAL_COURSES = [
  {
    "id": "c1780019511162",
    "name": "Cálculo I",
    "code": "MAT1610",
    "credits": 10,
    "category": "ciencias",
    "prereqs": []
  },
  {
    "id": "c1780019553098",
    "name": "Algebra Lineal",
    "code": "MAT1203",
    "credits": 10,
    "category": "ciencias",
    "prereqs": [],
    "coreqs": []
  },
  {
    "id": "c1780019581569",
    "name": "Desafíos de la Ingeniería",
    "code": "ING1004",
    "credits": 10,
    "category": "cat_1780268634615",
    "prereqs": [],
    "coreqs": []
  },
  {
    "id": "c1780019624444",
    "name": "Filosofía ¿Para Qué?",
    "code": "FIL2001",
    "credits": 10,
    "category": "cat_1780018257707",
    "prereqs": [],
    "coreqs": []
  },
  {
    "id": "c1780019650998",
    "name": "Química para la Ingenería",
    "code": "QUIM100E",
    "credits": 10,
    "category": "ciencias",
    "prereqs": [],
    "coreqs": []
  },
  {
    "id": "c1780019808694",
    "name": "Cálculo II",
    "code": "MAT1620",
    "credits": 10,
    "category": "ciencias",
    "prereqs": [
      "c1780019511162"
    ]
  },
  {
    "id": "c1780019835743",
    "name": "Cálculo III",
    "code": "MAT1630",
    "credits": 10,
    "category": "ciencias",
    "prereqs": [
      "c1780019808694",
      "c1780019553098"
    ],
    "coreqs": []
  },
  {
    "id": "c1780019909680",
    "name": "Termodinámica",
    "code": "FIS1523",
    "credits": 10,
    "category": "ciencias",
    "prereqs": [
      "c1780019808694"
    ],
    "coreqs": [
      "c1780020320104",
      "c1780019835743"
    ]
  },
  {
    "id": "c1780020166076",
    "name": "Dinámica",
    "code": "FIS1514",
    "credits": 10,
    "category": "ciencias",
    "prereqs": [
      "c1780019511162"
    ],
    "coreqs": [
      "c1780020231467",
      "c1780019553098"
    ]
  },
  {
    "id": "c1780020187706",
    "name": "Ecuaciones Diferenciales",
    "code": "MAT1640",
    "credits": 10,
    "category": "ciencias",
    "prereqs": [
      "c1780019808694",
      "c1780019553098"
    ]
  },
  {
    "id": "c1780020231467",
    "name": "Laboratorio de Dinámica",
    "code": "FIS0154",
    "credits": 0,
    "category": "ciencias",
    "prereqs": [
      "c1780019511162"
    ],
    "coreqs": [
      "c1780020166076"
    ]
  },
  {
    "id": "c1780020320104",
    "name": "Laboratorio de Termodinámica",
    "code": "FIS0152",
    "credits": 0,
    "category": "ciencias",
    "prereqs": [
      "c1780019808694"
    ],
    "coreqs": [
      "c1780019909680"
    ]
  },
  {
    "id": "c1780020360924",
    "name": "Optativo de Exploración de Major",
    "code": "0",
    "credits": 10,
    "category": "cat_1780268634615",
    "prereqs": [],
    "coreqs": []
  },
  {
    "id": "c1780020385388",
    "name": "Minor I",
    "code": "0",
    "credits": 10,
    "category": "gestion",
    "prereqs": []
  },
  {
    "id": "c1780020393369",
    "name": "Minor II",
    "code": "0",
    "credits": 10,
    "category": "gestion",
    "prereqs": []
  },
  {
    "id": "c1780020413451",
    "name": "Minor III",
    "code": "0",
    "credits": 10,
    "category": "gestion",
    "prereqs": []
  },
  {
    "id": "c1780020431719",
    "name": "Minor IV",
    "code": "o",
    "credits": 10,
    "category": "gestion",
    "prereqs": []
  },
  {
    "id": "c1780020444781",
    "name": "Minor V",
    "code": "0",
    "credits": 10,
    "category": "gestion",
    "prereqs": []
  },
  {
    "id": "c1780020474195",
    "name": "Pensamiento Visual",
    "code": "IDI1015",
    "credits": 10,
    "category": "diseno",
    "prereqs": [
      "c1780021111767",
      "c1780019581569"
    ],
    "coreqs": []
  },
  {
    "id": "c1780020485015",
    "name": "Antro Diseño",
    "code": "IDI2015",
    "credits": 10,
    "category": "diseno",
    "prereqs": [
      "c1780020474195",
      "c1780019581569"
    ],
    "coreqs": []
  },
  {
    "id": "c1780020497761",
    "name": "Laboratorio de Diseño",
    "code": "IDI2004",
    "credits": 10,
    "category": "diseno",
    "prereqs": [
      "c1780020485015",
      "c1780019581569"
    ],
    "coreqs": []
  },
  {
    "id": "c1780020507589",
    "name": "Laboratorio de Experimentación y Prototipado",
    "code": "DNO1032",
    "credits": 10,
    "category": "diseno",
    "prereqs": [],
    "coreqs": []
  },
  {
    "id": "c1780020519284",
    "name": "Diseño y Manufactura Digital Cad/Cam",
    "code": "DNO016",
    "credits": 10,
    "category": "diseno",
    "prereqs": []
  },
  {
    "id": "c1780020535337",
    "name": "Fundamentos Sociales y Técnicos de la Innovación",
    "code": "IDI2996",
    "credits": 10,
    "category": "diseno",
    "prereqs": [
      "c1780020474195"
    ],
    "coreqs": []
  },
  {
    "id": "c1780020585627",
    "name": "Optativo de Área I",
    "code": "0",
    "credits": 10,
    "category": "diseno",
    "prereqs": []
  },
  {
    "id": "c1780020597697",
    "name": "Optativo de Área II",
    "code": "0",
    "credits": 10,
    "category": "diseno",
    "prereqs": []
  },
  {
    "id": "c1780020648690",
    "name": "Tecnología, Emprendimiento y Diseño",
    "code": "IDI2025",
    "credits": 10,
    "category": "diseno",
    "prereqs": [
      "c1780020497761",
      "c1780020485015"
    ],
    "coreqs": []
  },
  {
    "id": "c1780020682948",
    "name": "Optativo de Major",
    "code": "0",
    "credits": 10,
    "category": "diseno",
    "prereqs": []
  },
  {
    "id": "c1780020718570",
    "name": "Teológico",
    "code": "0",
    "credits": 10,
    "category": "cat_1780018257707",
    "prereqs": []
  },
  {
    "id": "c1780020729628",
    "name": "Salud y Bienestar",
    "code": "0",
    "credits": 10,
    "category": "cat_1780018257707",
    "prereqs": []
  },
  {
    "id": "c1780020755565",
    "name": "Humanidades",
    "code": "0",
    "credits": 10,
    "category": "cat_1780018257707",
    "prereqs": []
  },
  {
    "id": "c1780020788581",
    "name": "Sustentabilidad",
    "code": "0",
    "credits": 10,
    "category": "cat_1780018257707",
    "prereqs": []
  },
  {
    "id": "c1780020836821",
    "name": "Formación General Libre",
    "code": "0",
    "credits": 10,
    "category": "cat_1780018257707",
    "prereqs": []
  },
  {
    "id": "c1780020860741",
    "name": "Ciencias Sociales",
    "code": "0",
    "credits": 10,
    "category": "cat_1780018257707",
    "prereqs": []
  },
  {
    "id": "c1780020888364",
    "name": "Artes",
    "code": "0",
    "credits": 10,
    "category": "cat_1780018257707",
    "prereqs": []
  },
  {
    "id": "c1780020962035",
    "name": "Optativo Biológico",
    "code": "0",
    "credits": 10,
    "category": "ciencias",
    "prereqs": []
  },
  {
    "id": "c1780021006719",
    "name": "Electricidad y Magnetismo",
    "code": "FIS1533",
    "credits": 10,
    "category": "ciencias",
    "prereqs": [
      "c1780019835743"
    ],
    "coreqs": [
      "c1780021071943"
    ]
  },
  {
    "id": "c1780021055442",
    "name": "Probabilidades y estadísticas",
    "code": "EYP1113",
    "credits": 10,
    "category": "ciencias",
    "prereqs": [
      "c1780019835743"
    ],
    "coreqs": []
  },
  {
    "id": "c1780021071943",
    "name": "Laboratorio de Electricidad y Magnetismo",
    "code": "FIS0153",
    "credits": 0,
    "category": "ciencias",
    "prereqs": [],
    "coreqs": [
      "c1780021006719"
    ]
  },
  {
    "id": "c1780021111767",
    "name": "Introducción a la Programación",
    "code": "IIC1103",
    "credits": 10,
    "category": "cat_1780268634615",
    "prereqs": [],
    "coreqs": []
  },
  {
    "id": "c1780021150169",
    "name": "Introducción a la Economía",
    "code": "ICS1513",
    "credits": 10,
    "category": "cat_1780268634615",
    "prereqs": [],
    "coreqs": [
      "c1780019808694"
    ]
  },
  {
    "id": "c1780021184944",
    "name": "Investigación, Innovación y Emprendimiento",
    "code": "ING2030",
    "credits": 10,
    "category": "cat_1780268634615",
    "prereqs": [],
    "coreqs": []
  },
  {
    "id": "c1780021230418",
    "name": "Optativo de Fundamentos  de Ciencias de Ingenería",
    "code": "0",
    "credits": 10,
    "category": "cat_1780268634615",
    "prereqs": [],
    "coreqs": []
  }
];
