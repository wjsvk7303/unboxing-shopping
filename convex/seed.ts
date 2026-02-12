import { mutation } from "./_generated/server";

const categories = [
  { name: "스마트폰", slug: "smartphones" },
  { name: "노트북", slug: "laptops" },
  { name: "태블릿", slug: "tablets" },
  { name: "이어폰/헤드폰", slug: "audio" },
  { name: "스마트워치", slug: "smartwatches" },
];

const products = [
  // 스마트폰
  {
    name: "Galaxy S25 Ultra",
    description: "삼성 최신 플래그십 스마트폰. AI 기능 강화, S펜 내장, 2억 화소 카메라로 어떤 순간도 선명하게 담아냅니다.",
    price: 1650000,
    category: "smartphones",
    imageUrl: "https://images.unsplash.com/photo-1738830251513-a7bfef4b53c6?auto=format&fit=crop&q=80&w=800",
    stock: 50,
    longDescription: `
      <h3>갤럭시 S25 울트라, AI 폰의 새로운 기준</h3>
      <p>갤럭시 S25 울트라는 단순한 스마트폰 그 이상입니다. 티타늄 프레임으로 완성된 견고한 디자인, 2억 화소의 초고해상도 카메라, 그리고 일상을 혁신하는 Galaxy AI 기능을 경험해보세요.</p>
      <p>강력한 스냅드래곤 8 4세대 프로세서는 게이밍과 멀티태스킹에서 압도적인 성능을 발휘하며, 내장된 S펜은 당신의 창의성을 언제 어디서나 발휘할 수 있게 도와줍니다.</p>
    `,
    features: [
      "티타늄 프레임의 세련된 디자인과 내구성",
      "2억 화소 광각 카메라 및 100배 스페이스 줌",
      "Galaxy AI: 실시간 통역, 서클 투 서치, 노트 어시스트",
      "내장 S펜으로 정교한 필기와 드로잉",
      "5,000mAh 대용량 배터리와 45W 초고속 충전"
    ],
    specs: [
      { label: "프로세서", value: "Snapdragon 8 Gen 4 for Galaxy" },
      { label: "디스플레이", value: "6.8인치 Dynamic AMOLED 2X (120Hz)" },
      { label: "RAM/저장공간", value: "12GB / 256GB, 512GB, 1TB" },
      { label: "카메라", value: "200MP 광각 + 50MP 망원 + 12MP 초광각" },
      { label: "배터리", value: "5,000mAh" },
      { label: "무게", value: "232g" }
    ]
  },
  {
    name: "iPhone 16 Pro",
    description: "Apple A18 Pro 칩셋 탑재. 카메라 컨트롤 버튼과 48MP 메인 카메라로 프로급 촬영이 가능합니다.",
    price: 1550000,
    category: "smartphones",
    imageUrl: "https://images.unsplash.com/photo-1727099820362-b5bd5cd5a075?auto=format&fit=crop&q=80&w=800",
    stock: 30,
    longDescription: "iPhone 16 Pro는 티타늄 디자인과 획기적인 A18 Pro 칩을 탑재했습니다. 새로운 카메라 컨트롤 버튼으로 순간을 놓치지 않고 포착하세요.",
    features: ["A18 Pro 칩", "카메라 컨트롤 버튼", "48MP Fusion 카메라", "최대 120Hz ProMotion"],
    specs: [
      { label: "칩", value: "A18 Pro" }
    ]
  },
  {
    name: "Galaxy Z Flip 6",
    description: "삼성 폴더블 스마트폰. 3.4인치 커버 디스플레이와 가벼운 무게로 스타일과 실용성을 모두 갖췄습니다.",
    price: 1350000,
    category: "smartphones",
    imageUrl: "https://images.unsplash.com/photo-1676121228785-f1dcd462025f?auto=format&fit=crop&q=80&w=800",
    stock: 25,
    longDescription: `
      <h3>콤팩트한 디자인, 거대한 임팩트</h3>
      <p>Galaxy Z Flip 6는 작게 접혀 주머니에 쏙 들어가는 콤팩트한 디자인을 자랑합니다. 하지만 펼치면 6.7인치의 대화면이 펼쳐져 몰입감 넘치는 경험을 선사합니다.</p>
      <p>새로워진 3.4인치 플렉스 윈도우에서는 폰을 열지 않고도 메시지를 확인하고, 셀피를 찍고, 다양한 위젯을 활용할 수 있습니다. AI 기반의 프로 비주얼 엔진은 야간 촬영에서도 선명한 결과물을 보장합니다.</p>
    `,
    features: [
      "주머니에 쏙 들어가는 아이코닉한 디자인",
      "3.4인치 대화면 플렉스 윈도우",
      "50MP 광각 카메라와 AI 기반 프로 비주얼 엔진",
      "플렉스 힌지로 완성된 완벽한 접힘",
      "IPX8 방수 등급과 아머 알루미늄 프레임"
    ],
    specs: [
      { label: "메인 화면", value: "6.7인치 Dynamic AMOLED 2X (120Hz)" },
      { label: "커버 화면", value: "3.4인치 Super AMOLED (60Hz)" },
      { label: "프로세서", value: "Snapdragon 8 Gen 3 for Galaxy" },
      { label: "RAM", value: "12GB" },
      { label: "배터리", value: "4,000mAh" },
      { label: "무게", value: "187g" }
    ]
  },
  {
    name: "Pixel 9 Pro",
    description: "Google AI 기능 탑재. 최고 수준의 카메라 성능과 순수 안드로이드 경험을 제공합니다.",
    price: 1290000,
    category: "smartphones",
    imageUrl: "https://images.unsplash.com/photo-1724322637761-1fef6ca8c8b3?auto=format&fit=crop&q=80&w=800",
    stock: 20,
    longDescription: `
      <h3>Google AI의 정점, Pixel 9 Pro</h3>
      <p>Pixel 9 Pro는 Google의 최신 Tensor G4 칩을 탑재하여 더욱 스마트하고 빠른 AI 기능을 제공합니다. Gemini Nano가 기기 내에서 실행되어 인터넷 연결 없이도 요약, 번역 등의 작업을 수행합니다.</p>
      <p>전문가급 트리플 카메라 시스템은 어떤 조명에서도 놀라운 사진과 동영상을 촬영하며, Super Actua 디스플레이는 직사광선 아래에서도 선명한 화면을 보여줍니다.</p>
    `,
    features: [
      "Google Tensor G4 칩과 Gemini Nano 내장",
      "50MP 메인, 48MP 초광각, 48MP 망원 카메라",
      "Super Actua 디스플레이 (1-120Hz LTPO)",
      "7년 OS 업그레이드 및 보안 업데이트 보장",
      "온도 측정 센서 탑재"
    ],
    specs: [
      { label: "칩셋", value: "Google Tensor G4" },
      { label: "메모리", value: "16GB LPDDR5X RAM" },
      { label: "저장공간", value: "128GB / 256GB / 512GB / 1TB" },
      { label: "디스플레이", value: "6.3인치 LTPO OLED (1280 x 2856)" },
      { label: "배터리", value: "4,700mAh" },
      { label: "운영체제", value: "Android 15" }
    ]
  },

  // 노트북
  {
    name: "MacBook Pro 16 M4 Pro",
    description: "Apple M4 Pro 칩 탑재. 16인치 Liquid Retina XDR 디스플레이와 최대 24시간 배터리로 전문가를 위한 성능을 제공합니다.",
    price: 3290000,
    category: "laptops",
    imageUrl: "https://images.unsplash.com/photo-1639087595550-e9770a85f8c0?auto=format&fit=crop&q=80&w=800",
    stock: 15,
    longDescription: `
      <h3>전문가를 위한 궁극의 도구, MacBook Pro</h3>
      <p>M4 Pro 칩셋으로 무장한 MacBook Pro 16인치는 상상을 현실로 만드는 강력한 성능을 제공합니다. 수백 개의 오디오 트랙을 믹싱하거나 8K 동영상을 편집하는 작업도 거침없이 처리합니다.</p>
      <p>Liquid Retina XDR 디스플레이는 1,000 니트의 지속 밝기와 1,600 니트의 부분 최대 밝기로 생생한 컬러와 디테일을 보여줍니다. 최대 22시간 지속되는 배터리로 하루 종일 작업에 몰입하세요.</p>
    `,
    features: [
      "M4 Pro 칩의 압도적인 CPU 및 GPU 성능",
      "16.2인치 Liquid Retina XDR 디스플레이 (ProMotion 120Hz)",
      "최대 22시간의 배터리 사용 시간",
      "다양한 포트: Thunderbolt 5, HDMI, SDXC, MagSafe 3",
      "1080p FaceTime HD 카메라와 6 스피커 사운드 시스템"
    ],
    specs: [
      { label: "칩", value: "Apple M4 Pro (12코어 CPU, 18코어 GPU)" },
      { label: "메모리", value: "36GB 통합 메모리" },
      { label: "저장장치", value: "1TB SSD" },
      { label: "디스플레이", value: "16.2인치 (3456 x 2234)" },
      { label: "무게", value: "2.14kg" }
    ]
  },
  {
    name: "Galaxy Book4 Ultra",
    description: "Intel Core Ultra 9 프로세서와 NVIDIA RTX 4070 그래픽. 16인치 3K AMOLED 디스플레이와 창작 작업에 최적화되었습니다.",
    price: 3190000,
    category: "laptops",
    imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800",
    stock: 10,
    longDescription: `
      <h3>크리에이티브의 한계를 넘다</h3>
      <p>Galaxy Book4 Ultra는 단순히 강력한 노트북이 아닙니다. AI 퍼포먼스를 극대화한 Intel® Core™ Ultra 9 프로세서와 NVIDIA® GeForce RTX™ 4070 그래픽을 탑재하여 고사양 게임, 영상 편집, 3D 렌더링 등 어떤 작업도 완벽하게 수행합니다.</p>
      <p>Dynamic AMOLED 2X 터치 디스플레이는 실제와 가까운 색감과 깊은 명암비를 제공하며, 터치스크린 기능으로 더욱 직관적인 작업이 가능합니다.</p>
    `,
    features: [
      "Intel® Core™ Ultra 9 프로세서 (NPU 탑재)",
      "NVIDIA® GeForce RTX™ 4070 Laptop GPU",
      "16인치 WQXGA+ Dynamic AMOLED 2X 터치 디스플레이",
      "반사 방지 패널 및 Vision Booster",
      "AKG 쿼드 스피커 (Woofer Max 5W x 2, Tweeter 2W x 2)"
    ],
    specs: [
      { label: "CPU", value: "Intel® Core™ Ultra 9 185H" },
      { label: "GPU", value: "NVIDIA® GeForce RTX™ 4070 (8GB GDDR6)" },
      { label: "RAM", value: "32GB LPDDR5X" },
      { label: "SSD", value: "1TB NVMe SSD" },
      { label: "무게", value: "1.86kg" }
    ]
  },
  {
    name: "LG Gram 17 (2025)",
    description: "초경량 17인치 노트북. Intel Core Ultra 7 프로세서와 1.35kg의 무게로 휴대성과 성능을 동시에 잡았습니다.",
    price: 2190000,
    category: "laptops",
    imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800",
    stock: 20,
    longDescription: `
      <h3>더 가볍게, 더 강력하게, LG gram Pro</h3>
      <p>17인치의 대화면을 가졌음에도 무게는 단 1,350g에 불과합니다. LG gram 17은 Intel® Core™ Ultra 7 프로세서를 탑재하여 강력한 성능과 놀라운 휴대성을 동시에 제공합니다.</p>
      <p>WQXGA 고해상도 IPS 패널은 144Hz 주사율을 지원하여 부드러운 화면 전환을 제공하며, 하루 종일 지속되는 대용량 배터리로 어댑터 없이도 자유롭게 사용할 수 있습니다.</p>
    `,
    features: [
      "17인치 대화면에도 1,350g의 초경량 디자인",
      "Intel® Core™ Ultra 7 프로세서",
      "WQXGA (2560 x 1600) 고해상도 IPS 디스플레이 (144Hz)",
      "Dolby Atmos 지원 스테레오 스피커",
      "미국 국방성 밀리터리 스펙 테스트 통과"
    ],
    specs: [
      { label: "CPU", value: "Intel® Core™ Ultra 7 155H" },
      { label: "디스플레이", value: "17인치 WQXGA IPS LCD" },
      { label: "메모리", value: "16GB LPDDR5X" },
      { label: "저장장치", value: "512GB NVMe SSD + 확장 슬롯 1" },
      { label: "배터리", value: "77Wh" }
    ]
  },
  {
    name: "ASUS ROG Zephyrus G16",
    description: "프리미엄 게이밍 노트북. RTX 4080 그래픽과 16인치 240Hz OLED 디스플레이로 최상의 게이밍 경험을 선사합니다.",
    price: 2890000,
    category: "laptops",
    imageUrl: "https://images.unsplash.com/photo-1649269234528-6cf263c06ccc?auto=format&fit=crop&q=80&w=800",
    stock: 12,
    longDescription: `
      <h3>게이밍 노트북의 미학을 완성하다</h3>
      <p>ROG Zephyrus G16은 알루미늄 유니바디 섀시로 제작되어 세련되고 견고합니다. 최신 Intel® Core™ Ultra 9 프로세서와 NVIDIA® GeForce RTX™ 4080 GPU는 최신 AAA 게임을 풀옵션으로 구동할 수 있는 강력한 성능을 자랑합니다.</p>
      <p>세계 최초의 240Hz OLED 게이밍 패널인 Nebula Display는 0.2ms의 응답 속도와 무한대에 가까운 명암비로 숨 막히는 비주얼을 선사합니다.</p>
    `,
    features: [
      "16인치 2.5K OLED Nebula Display (240Hz, 0.2ms)",
      "NVIDIA® GeForce RTX™ 4080 Laptop GPU",
      "슬림하고 세련된 알루미늄 CNC 유니바디",
      "ROG Intelligent Cooling: 2세대 Arc Flow Fans",
      "6스피커 시스템과 돌비 애트모스 지원"
    ],
    specs: [
      { label: "CPU", value: "Intel® Core™ Ultra 9 185H" },
      { label: "GPU", value: "NVIDIA® GeForce RTX™ 4080 (12GB GDDR6)" },
      { label: "디스플레이", value: "16인치 2.5K (2560 x 1600) OLED" },
      { label: "메모리", value: "32GB LPDDR5X" },
      { label: "두께", value: "1.49cm" }
    ]
  },

  // 태블릿
  {
    name: "iPad Pro M4 13인치",
    description: "Apple M4 칩과 Ultra Retina XDR OLED 디스플레이. Apple Pencil Pro 지원으로 창작의 한계를 넘어섭니다.",
    price: 1790000,
    category: "tablets",
    imageUrl: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&q=80&w=800",
    stock: 25,
    longDescription: `
      <h3>역대 가장 얇은 Apple 제품, iPad Pro</h3>
      <p>새로운 iPad Pro는 놀랍도록 얇고 가볍지만 성능은 그 어느 때보다 강력합니다. M4 칩의 힘으로 3D 렌더링, 영상 편집 등 고성능 작업을 가볍게 처리하세요.</p>
      <p>Ultra Retina XDR 디스플레이는 탠덤 OLED 기술을 적용하여 극강의 밝기와 명암비를 제공합니다. Apple Pencil Pro와 함께라면 당신의 아이패드는 완벽한 캔버스가 됩니다.</p>
    `,
    features: [
      "최첨단 M4 칩 탑재 (최대 10코어 CPU, 10코어 GPU)",
      "Ultra Retina XDR (탠덤 OLED) 디스플레이",
      "5.1mm의 놀라운 두께와 579g의 가벼운 무게",
      "Apple Pencil Pro의 스퀴즈, 배럴 롤 기능 지원",
      "스튜디오급 마이크와 4 스피커 오디오 시스템"
    ],
    specs: [
      { label: "칩", value: "Apple M4" },
      { label: "디스플레이", value: "13인치 Ultra Retina XDR" },
      { label: "저장용량", value: "256GB / 512GB / 1TB / 2TB" },
      { label: "카메라", value: "12MP 와이드 (4K 영상 촬영)" },
      { label: "커넥터", value: "Thunderbolt / USB 4" }
    ]
  },
  {
    name: "Galaxy Tab S10 Ultra",
    description: "삼성 플래그십 태블릿. 14.6인치 Dynamic AMOLED 디스플레이와 S펜으로 업무와 엔터테인먼트를 모두 만족시킵니다.",
    price: 1590000,
    category: "tablets",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
    stock: 18,
    longDescription: `
      <h3>압도적인 대화면, 무한한 가능성</h3>
      <p>14.6인치의 광활한 Dynamic AMOLED 2X 디스플레이는 노트북을 능가하는 작업 영역과 몰입감을 제공합니다. 멀티 윈도우 기능으로 3개의 앱을 동시에 실행하며 진정한 멀티태스킹을 경험하세요.</p>
      <p>기본 제공되는 S펜은 실제 펜과 같은 필기감을 제공하며, IP68 방수 방진 등급으로 야외에서도 안심하고 사용할 수 있습니다.</p>
    `,
    features: [
      "14.6인치 Dynamic AMOLED 2X (120Hz)",
      "실제 펜 같은 반응속도의 S펜 기본 포함",
      "태블릿 최초 IP68 방수 방진 지원",
      "11,200mAh 대용량 배터리와 45W 초고속 충전",
      "Galaxy AI: 노트 어시스트, 서클 투 서치 탑재"
    ],
    specs: [
      { label: "프로세서", value: "MediaTek Dimensity 9300+" },
      { label: "디스플레이", value: "14.6인치 (2960 x 1848)" },
      { label: "RAM", value: "12GB / 16GB" },
      { label: "두께", value: "5.4mm" },
      { label: "무게", value: "718g" }
    ]
  },
  {
    name: "iPad Air M2",
    description: "Apple M2 칩과 11인치 Liquid Retina 디스플레이. 합리적인 가격에 고성능을 경험할 수 있는 태블릿입니다.",
    price: 899000,
    category: "tablets",
    imageUrl: "https://images.unsplash.com/photo-1648806030599-c963fd14a22f?auto=format&fit=crop&q=80&w=800",
    stock: 30,
    longDescription: `
      <h3>가볍게, 하지만 강력하게</h3>
      <p>iPad Air가 M2 칩을 만나 더욱 강력해졌습니다. 이전 세대 대비 50% 빨라진 성능으로 고사양 게임이나 창작 앱도 부드럽게 실행됩니다.</p>
      <p>Liquid Retina 디스플레이는 P3 넓은 색영역과 True Tone 기술로 자연스럽고 아름다운 화면을 보여줍니다. 센터 스테이지 기술이 적용된 가로형 전면 카메라는 화상 통화 시 당신을 항상 화면 중앙에 잡아줍니다.</p>
    `,
    features: [
      "강력한 성능의 Apple M2 칩",
      "11인치 Liquid Retina 디스플레이",
      "12MP 가로형 초광각 전면 카메라 (센터 스테이지 지원)",
      "초고속 Wi-Fi 6E 지원",
      "Touch ID로 빠르고 안전한 인증"
    ],
    specs: [
      { label: "칩", value: "Apple M2 (8코어 CPU, 10코어 GPU)" },
      { label: "디스플레이", value: "11인치 Liquid Retina" },
      { label: "저장용량", value: "128GB / 256GB / 512GB / 1TB" },
      { label: "카메라", value: "12MP 와이드 후면, 12MP 초광각 전면" },
      { label: "무게", value: "462g" }
    ]
  },

  // 이어폰/헤드폰
  {
    name: "AirPods Pro 2 (USB-C)",
    description: "Apple H2 칩 탑재. 적응형 노이즈 캔슬링과 공간 음향으로 몰입감 넘치는 사운드를 제공합니다.",
    price: 349000,
    category: "audio",
    imageUrl: "https://images.unsplash.com/photo-1587523459887-e669248cf666?auto=format&fit=crop&q=80&w=800",
    stock: 100,
    longDescription: `
      <h3>재설계된 사운드, 압도적인 몰입감</h3>
      <p>H2 칩으로 구동되는 AirPods Pro 2는 이전 모델 대비 2배 강력한 액티브 노이즈 캔슬링을 제공합니다. 적응형 오디오 기능은 주변 환경에 맞춰 소음 제어 수준을 자동으로 조절해줍니다.</p>
      <p>대화 인지 기능은 말을 시작하면 자동으로 미디어 볼륨을 낮추고 배경 소음을 줄여주어, 이어폰을 빼지 않고도 대화가 가능합니다.</p>
    `,
    features: [
      "Apple H2 헤드폰 칩",
      "최대 2배 강력해진 액티브 노이즈 캔슬링",
      "적응형 오디오 및 대화 인지 기능",
      "개인 맞춤형 공간 음향과 동적 머리 추적",
      "USB-C 충전 케이스 (MagSafe 지원)"
    ],
    specs: [
      { label: "칩", value: "Apple H2" },
      { label: "배터리", value: "최대 6시간(이어버드), 최대 30시간(케이스 포함)" },
      { label: "방수", value: "IP54 (이어버드 및 케이스)" },
      { label: "연결", value: "Bluetooth 5.3" },
      { label: "무게", value: "5.3g (이어버드)" }
    ]
  },
  {
    name: "Galaxy Buds3 Pro",
    description: "삼성 프리미엄 무선 이어폰. 블레이드 라이트 디자인과 AI 노이즈 캔슬링으로 새로운 청취 경험을 선사합니다.",
    price: 289000,
    category: "audio",
    imageUrl: "https://images.unsplash.com/photo-1618213520536-ce37aabcd9e5?auto=format&fit=crop&q=80&w=800",
    stock: 80,
    longDescription: `
      <h3>AI로 완성되는 Hi-Fi 사운드</h3>
      <p>새로운 블레이드 디자인의 Galaxy Buds3 Pro는 착용감과 제어 편의성을 혁신했습니다. 2-way 스피커는 섬세하고 풍부한 사운드를 들려주며, AI 기반의 소음 제어 최적화 기능은 주변 소음을 실시간으로 분석하여 최적의 청취 환경을 제공합니다.</p>
      <p>실시간 통역 기능으로 외국어 대화를 듣고, 음성 명령으로 기능을 제어하는 새로운 AI 경험을 만나보세요.</p>
    `,
    features: [
      "세련된 블레이드 디자인과 블레이드 라이트",
      "2-way 스피커와 듀얼 앰프로 구현한 Hi-Fi 사운드",
      "AI 소음 제어 최적화 (사이렌/음성 감지)",
      "실시간 통역 기능 지원",
      "최대 24비트/96kHz 고해상도 오디오 (SSC 코덱)"
    ],
    specs: [
      { label: "오디오", value: "2-way 스피커 (10.5mm 우퍼 + 6.1mm 트위터)" },
      { label: "배터리", value: "최대 7시간 (NC Off)" },
      { label: "마이크", value: "3 High-SNR 마이크 + VPU" },
      { label: "방수", value: "IP57" },
      { label: "연결", value: "Bluetooth 5.4" }
    ]
  },
  {
    name: "Sony WH-1000XM5",
    description: "소니 프리미엄 헤드폰. 업계 최고 수준의 노이즈 캔슬링과 30시간 배터리로 하루 종일 음악을 즐기세요.",
    price: 419000,
    category: "audio",
    imageUrl: "https://images.unsplash.com/photo-1624978960894-bed9218acd39?auto=format&fit=crop&q=80&w=800",
    stock: 40,
    longDescription: `
      <h3>몰입의 즐거움, Sony WH-1000XM5</h3>
      <p>WH-1000XM5는 소니의 노이즈 캔슬링 기술을 한 단계 더 진화시켰습니다. 8개의 마이크와 2개의 프로세서가 주변 소음을 완벽하게 제어하여 오직 음악에만 집중할 수 있게 해줍니다.</p>
      <p>새로운 30mm 드라이버 유닛은 자연스럽고 풍부한 사운드를 들려주며, 부드러운 소프트 핏 가죽은 하루 종일 착용해도 편안함을 유지합니다.</p>
    `,
    features: [
      "통합 프로세서 V1과 HD 노이즈 캔슬링 프로세서 QN1",
      "업계 최고 수준의 노이즈 캔슬링 성능",
      "정교한 음성 픽업 기술로 선명한 통화 품질",
      "최대 30시간 배터리 수명 (NC 켜짐)",
      "두 대의 기기에 동시에 연결하는 멀티포인트 지원"
    ],
    specs: [
      { label: "무게", value: "250g" },
      { label: "드라이버", value: "30mm 정밀 드라이버" },
      { label: "배터리", value: "최대 30시간(NC ON), 40시간(NC OFF)" },
      { label: "충전", value: "3분 충전으로 3시간 재생(PD 충전)" },
      { label: "블루투스", value: "ver 5.2 (LDAC 지원)" }
    ]
  },
  {
    name: "Bose QuietComfort Ultra",
    description: "보스 플래그십 헤드폰. 몰입형 오디오와 최고급 노이즈 캔슬링으로 완벽한 사운드 환경을 만들어줍니다.",
    price: 449000,
    category: "audio",
    imageUrl: "https://images.unsplash.com/photo-1657223143975-d29d7959a70f?auto=format&fit=crop&q=80&w=800",
    stock: 35,
    longDescription: `
      <h3>소리는 실제와 같이, 정적은 마법과 같이</h3>
      <p>Bose QuietComfort Ultra는 혁신적인 Bose Immersive Audio 기술로 사운드를 머리 밖으로 꺼내어 공간감을 형성합니다. 마치 눈앞에서 연주를 듣는 듯한 생생함을 경험해보세요.</p>
      <p>CustomTune 기술은 사용자의 귀 형태를 분석하여 사운드와 노이즈 캔슬링 성능을 개인에게 최적화합니다. 전설적인 노이즈 캔슬링으로 세상의 소음을 지우고 오직 음악에만 집중하세요.</p>
    `,
    features: [
      "획기적인 Bose Immersive Audio (공간 음향)",
      "세계 최고 수준의 노이즈 캔슬링 (콰이어트 모드)",
      "CustomTune 기술로 개인 맞춤형 사운드 제공",
      "하루 종일 편안한 착용감과 고급스러운 디자인",
      "선명한 통화 품질과 윈드 블록 기능"
    ],
    specs: [
      { label: "재생시간", value: "최대 24시간 (Immersive Audio 사용 시 18시간)" },
      { label: "연결", value: "Bluetooth 5.3 (Bose Music 앱 지원)" },
      { label: "충전", value: "USB-C (완충까지 3시간)" },
      { label: "마이크", value: "내장 마이크 시스템" },
      { label: "케이스", value: "휴대용 하드 케이스 포함" }
    ]
  },

  // 스마트워치
  {
    name: "Apple Watch Ultra 2",
    description: "Apple 최강 스마트워치. 티타늄 케이스와 이중 주파수 GPS로 극한 환경에서도 정확한 추적이 가능합니다.",
    price: 1149000,
    category: "smartwatches",
    imageUrl: "https://images.unsplash.com/photo-1713056878930-c5604da9acfd?auto=format&fit=crop&q=80&w=800",
    stock: 20,
    longDescription: `
      <h3>극한을 정복하다, Apple Watch Ultra 2</h3>
      <p>가장 거친 환경에서도 견딜 수 있도록 설계되었습니다. 49mm 티타늄 케이스, 100m 방수 등급, 그리고 최대 3,000 니트의 밝기를 자랑합니다.</p>
      <p>새로운 S9 SiP 칩은 더블 탭 제스처와 온디바이스 Siri를 가능하게 하며, 정밀 이중 주파수 GPS는 도심 숲에서도 정확한 위치를 찾아냅니다.</p>
    `,
    features: [
      "49mm 항공우주 등급 티타늄 케이스",
      "최대 36시간(일반 사용), 저전력 모드 시 72시간 배터리",
      "3,000 니트 밝기의 올웨이즈온 Retina 디스플레이",
      "수심 40m 레크리에이션 다이빙 지원 및 수심 앱",
      "정밀 이중 주파수 GPS (L1 및 L5)"
    ],
    specs: [
      { label: "칩", value: "S9 SiP" },
      { label: "케이스", value: "49mm 티타늄" },
      { label: "방수", value: "100m (WR100)" },
      { label: "디스플레이", value: "상시표시 Retina (최대 3000니트)" },
      { label: "센서", value: "혈중 산소, 심전도, 수온 감지, 수심 게이지" }
    ]
  },
  {
    name: "Galaxy Watch7 Ultra",
    description: "삼성 프리미엄 스마트워치. 티타늄 프레임과 듀얼 주파수 GPS로 건강 관리와 운동 추적을 완벽하게 지원합니다.",
    price: 899000,
    category: "smartwatches",
    imageUrl: "https://images.unsplash.com/photo-1553545204-4f7d339aa06a?auto=format&fit=crop&q=80&w=800",
    stock: 25,
    longDescription: `
      <h3>한계를 넘어서는 성능, Galaxy Watch Ultra</h3>
      <p>극한의 환경에서도 견디는 티타늄 쿠션 프레임과 10ATM 방수 성능을 갖췄습니다. 최대 100시간 지속되는 배터리로 장거리 산행이나 트라이애슬론도 문제없습니다.</p>
      <p>최신 3nm 프로세서와 듀얼 주파수 GPS는 더욱 빠르고 정확한 반응 속도와 위치 추적을 제공합니다. AI 기반의 에너지 점수 기능으로 매일의 컨디션을 체크하세요.</p>
    `,
    features: [
      "충격에 강한 티타늄 쿠션 프레임",
      "최대 100시간 지속되는 강력한 배터리 (절전 모드)",
      "10ATM 방수 등급 및 영하/고온 환경 작동",
      "듀얼 주파수 GPS (L1+L5)로 정밀한 위치 추적",
      "FTP(기능적 임계 파워) 측정 등 전문적인 사이클링 기능"
    ],
    specs: [
      { label: "프로세서", value: "3nm Exynos W1000 (5코어)" },
      { label: "디스플레이", value: "1.5인치 Super AMOLED (3,000니트)" },
      { label: "배터리", value: "590mAh (고속 충전 지원)" },
      { label: "내구성", value: "티타늄 등급 4, 10ATM+IP68, MIL-STD-810H" },
      { label: "센서", value: "바이오액티브 센서(광학심박+전기심박+생체전기임피던스)" }
    ]
  },
  {
    name: "Apple Watch Series 10",
    description: "가장 얇은 Apple Watch. 광각 OLED 디스플레이와 수심 측정 기능으로 일상과 스포츠를 모두 지원합니다.",
    price: 599000,
    category: "smartwatches",
    imageUrl: "https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?auto=format&fit=crop&q=80&w=800",
    stock: 40,
    longDescription: `
      <h3>역대 가장 얇고, 가장 넓은 화면</h3>
      <p>Apple Watch Series 10은 역대 가장 얇은 두께에 Series 6 대비 30% 더 넓은 화면을 담았습니다. 와이드 앵글 OLED 디스플레이는 비스듬한 각도에서도 훨씬 밝게 보입니다.</p>
      <p>수면 무호흡 알림 기능으로 건강을 지키고, 수심 및 수온 센서로 수영과 스노클링을 즐기세요. 30분 만에 80%까지 충전되는 고속 충전으로 하루 종일 함께할 수 있습니다.</p>
    `,
    features: [
      "역대 가장 얇은 9.7mm 두께",
      "와이드 앵글 OLED 디스플레이",
      "수면 무호흡 징후 알림 기능",
      "수심 및 수온 센서 탑재 (수심 6m까지)",
      "더 빨라진 충전 속도 (30분에 80% 충전)"
    ],
    specs: [
      { label: "칩", value: "S10 SiP" },
      { label: "디스플레이", value: "상시표시 Retina (와이드 앵글 OLED)" },
      { label: "두께", value: "9.7mm" },
      { label: "충전", value: "고속 충전 (0-80% 30분)" },
      { label: "스피커", value: "미디어 재생 가능 스피커" }
    ]
  },
];

export const seedData = mutation({
  handler: async (ctx) => {
    // Check if data already exists
    const existingCategories = await ctx.db.query("categories").first();
    if (existingCategories) {
      return "Data already seeded";
    }

    // Insert categories
    for (const cat of categories) {
      await ctx.db.insert("categories", cat);
    }

    // Insert products
    for (const product of products) {
      await ctx.db.insert("products", product);
    }

    return "Seed data inserted successfully";
  },
});

export const clearAndSeed = mutation({
  handler: async (ctx) => {
    // Clear products
    const allProducts = await ctx.db.query("products").collect();
    for (const p of allProducts) {
      await ctx.db.delete(p._id);
    }

    // Clear categories
    const allCategories = await ctx.db.query("categories").collect();
    for (const c of allCategories) {
      await ctx.db.delete(c._id);
    }

    // Insert categories
    for (const cat of categories) {
      await ctx.db.insert("categories", cat);
    }

    // Insert products
    for (const product of products) {
      await ctx.db.insert("products", product);
    }

    return "Data cleared and re-seeded successfully";
  },
});
