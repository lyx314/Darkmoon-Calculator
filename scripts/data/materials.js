"use strict";

export const materials = [
  {
    id: 1,
    type: "common",
    enemies: [
      {
        name: "史莱姆",
        materialsPerEnemy: [0.6723, 0.1792, 0.0448],
      },
      {
        name: "大型史莱姆",
        materialsPerEnemy: [1.6808, 0.4482, 0.112],
      },
    ],
    names: ["史莱姆凝液", "史莱姆清", "史莱姆原浆"],
    keys: ["SlimeCondensate", "SlimeSecretions", "SlimeConcentrate"],
  },
  {
    id: 2,
    type: "common",
    enemies: [
      {
        name: "丘丘人",
        materialsPerEnemy: [0.4202, 0.112, 0.028],
      },
      {
        name: "丘丘萨满",
        materialsPerEnemy: [0.1681, 0.0448, 0.0112],
      },
      {
        name: "丘丘射手",
        materialsPerEnemy: [0.1681, 0.0448, 0.0112],
      },
      {
        name: "驮兽·丘丘人",
        materialsPerEnemy: [2.5212, 0.6723, 0.168],
      },
      {
        name: "丘丘暴徒",
        materialsPerEnemy: [0.5253, 0.1401, 0.035],
      },
      {
        name: "丘丘王",
        materialsPerEnemy: [0.5253, 0.1401, 0.035],
      },
    ],
    names: ["破损的面具", "污秽的面具", "不祥的面具"],
    keys: ["DamagedMask", "StainedMask", "OminousMask"],
  },
  {
    id: 3,
    type: "common",
    enemies: [
      {
        name: "丘丘萨满",
        materialsPerEnemy: [2.5212, 0.6723, 0.168],
      },
    ],
    names: ["导能绘卷", "封魔绘卷", "禁咒绘卷"],
    keys: ["DiviningScroll", "SealedScroll", "ForbiddenCurseScroll"],
  },
  {
    id: 4,
    type: "common",
    enemies: [
      {
        name: "丘丘射手",
        materialsPerEnemy: [0.8404, 0.2241, 0.056],
      },
    ],
    names: ["牢固的箭簇", "锐利的箭簇", "历战的箭簇"],
    keys: ["FirmArrowhead", "SharpArrowhead", "WeatheredArrowhead"],
  },
  {
    id: 5,
    type: "elite",
    enemies: [
      {
        name: "丘丘暴徒",
        materialsPerEnemy: [1.5758, 0.4202, 0.1051],
      },
      {
        name: "丘丘王",
        materialsPerEnemy: [5.2526, 1.4006, 0.3502],
      },
    ],
    names: ["沉重号角", "黑铜号角", "黑晶号角"],
    keys: ["HeavyHorn", "BlackBronzeHorn", "BlackCrystalHorn"],
  },
  {
    id: 6,
    type: "elite",
    enemies: [
      {
        name: "深渊法师",
        materialsPerEnemy: [2.6263, 0.7003, 0.1751],
      },
      {
        name: "深渊[使徒/咏者]",
        materialsPerEnemy: [5.2526, 1.4006, 0.3502],
      },
    ],
    names: ["地脉的旧枝", "地脉的枯叶", "地脉的新芽"],
    keys: ["DeadLeyLineBranch", "DeadLeyLineLeaves", "LeyLineSprout"],
  },
  {
    id: 7,
    type: "elite",
    enemies: [
      {
        name: "遗迹[守卫/猎者]",
        materialsPerEnemy: [3.9394, 1.0505, 0.2626],
      },
      {
        name: "遗迹重机",
        materialsPerEnemy: [6.5658, 1.7508, 0.4378],
      },
    ],
    names: ["混沌装置", "混沌回路", "混沌炉心"],
    keys: ["ChaosDevice", "ChaosCircuit", "ChaosCore"],
  },
  {
    id: 8,
    type: "elite",
    enemies: [
      {
        name: "萤术士",
        materialsPerEnemy: [5.2526, 1.4006, 0.3502],
      },
    ],
    names: ["雾虚花粉", "雾虚草囊", "雾虚灯芯"],
    keys: ["MistGrassPollen", "MistGrass", "MistGrassWick"],
  },
  {
    id: 9,
    type: "elite",
    enemies: [
      {
        name: "债务处理人",
        materialsPerEnemy: [5.2526, 1.4006, 0.3502],
      },
    ],
    names: ["猎兵祭刀", "特工祭刀", "督察长祭刀"],
    keys: [
      "HuntersSacrificialKnife",
      "AgentsSacrificialKnife",
      "InspectorsSacrificialKnife",
    ],
  },
  {
    id: 10,
    type: "common",
    enemies: [
      {
        name: "愚人众先遣队",
        materialsPerEnemy: [4.202, 1.1205, 0.28],
      },
      {
        name: "驮兽·愚人众",
        materialsPerEnemy: [8.404, 2.241, 0.56],
      },
      {
        name: "萤术士",
        materialsPerEnemy: [0.5253, 0.1401, 0.035],
      },
      {
        name: "债务处理人",
        materialsPerEnemy: [0.5253, 0.1401, 0.035],
      },
    ],
    names: ["新兵的徽记", "士官的徽记", "尉官的徽记"],
    keys: ["RecruitsInsignia", "SergeantsInsignia", "LieutenantsInsignia"],
  },
  {
    id: 11,
    type: "common",
    enemies: [
      {
        name: "驮兽·盗宝团",
        materialsPerEnemy: [5.0424, 1.3446, 0.336],
      },
      {
        name: "盗宝团",
        materialsPerEnemy: [1.2606, 0.3362, 0.084],
      },
    ],
    names: ["寻宝鸦印", "藏银鸦印", "攫金鸦印"],
    keys: [
      "TreasureHoarderInsignia",
      "SilverRavenInsignia",
      "GoldenRavenInsignia",
    ],
  },
  {
    id: 12,
    type: "common",
    enemies: [
      {
        name: "骗骗花",
        materialsPerEnemy: [4.202, 1.1205, 0.28],
      },
    ],
    names: ["骗骗花蜜", "微光花蜜", "原素花蜜"],
    keys: ["WhopperflowerNectar", "ShimmeringNectar", "EnergyNectar"],
  },
  {
    id: 13,
    type: "elite",
    enemies: [
      {
        name: "龙蜥",
        materialsPerEnemy: [5.2526, 1.4006, 0.3502],
      },
    ],
    names: ["脆弱的骨片", "结实的骨片", "石化的骨片"],
    keys: ["FragileBoneShard", "SturdyBoneShard", "FossilizedBoneShard"],
  },
  {
    id: 14,
    type: "common",
    enemies: [
      {
        name: "野伏众",
        materialsPerEnemy: [1.6808, 0.4482, 0.112],
      },
      {
        name: "海乱鬼",
        materialsPerEnemy: [3.3616, 0.8964, 0.224],
      },
    ],
    names: ["破旧的刀镡", "影打刀镡", "名刀镡"],
    keys: ["OldHandguard", "KageuchiHandguard", "FamedHandguard"],
  },
  {
    id: 15,
    type: "elite",
    enemies: [
      {
        name: "遗迹机兵",
        materialsPerEnemy: [2.6263, 0.7003, 0.1751],
      },
    ],
    names: ["混沌机关", "混沌枢纽", "混沌真眼"],
    keys: ["ChaosGear", "ChaosAxis", "ChaosOculus"],
  },
  {
    id: 16,
    type: "elite",
    enemies: [
      {
        name: "藏镜仕女",
        materialsPerEnemy: [5.2526, 1.4006, 0.3502],
      },
    ],
    names: ["黯淡棱镜", "水晶棱镜", "偏光棱镜"],
    keys: ["DismalPrism", "CrystalPrism", "PolarizingPrism"],
  },
  {
    id: 17,
    type: "common",
    enemies: [
      {
        name: "飘浮灵",
        materialsPerEnemy: [2.101, 0.5602, 0.14],
      },
    ],
    names: ["浮游干核", "浮游幽核", "浮游晶化核"],
    keys: ["SpectralHusk", "SpectralHeart", "SpectralNucleus"],
  },
  {
    id: 18,
    type: "elite",
    enemies: [
      {
        name: "兽境猎犬",
        materialsPerEnemy: [5.2526, 1.4006, 0.3502],
      },
      {
        name: "兽境幼兽",
        materialsPerEnemy: [2.6263, 0.7003, 0.1751],
      },
    ],
    names: ["隐兽指爪", "隐兽利爪", "隐兽鬼爪"],
    keys: ["ConcealedClaw", "ConcealedUnguis", "ConcealedTalon"],
  },
  {
    id: 19,
    type: "elite",
    enemies: [
      {
        name: "黑蛇众",
        materialsPerEnemy: [6.5658, 1.7508, 0.4378],
      },
      {
        name: "深渊[使徒/咏者]",
        materialsPerEnemy: [0.5253, 0.1401, 0.035],
      },
    ],
    names: ["晦暗刻像", "夤夜刻像", "幽邃刻像"],
    keys: ["GloomyStatuette", "DarkStatuette", "DeathlyStatuette"],
  },
  {
    id: 20,
    type: "common",
    enemies: [
      {
        name: "蕈兽",
        materialsPerEnemy: [0.8404, 0.2241, 0.056],
      },
      {
        name: "真蕈",
        materialsPerEnemy: [1.6808, 0.4482, 0.112],
      },
      {
        name: "[活化/枯焦]蕈兽",
        materialsPerEnemy: [0.2101, 0.056, 0.014],
      },
      {
        name: "[活化/枯焦]真蕈",
        materialsPerEnemy: [0.4202, 0.1121, 0.028],
      },
    ],
    names: ["蕈兽孢子", "荧光孢粉", "孢囊晶尘"],
    keys: ["FungalSpores", "LuminescentPollen", "CrystallineCystDust"],
  },
  {
    id: 21,
    type: "elite",
    enemies: [
      {
        name: "[活化/枯焦]蕈兽",
        materialsPerEnemy: [1.0505, 0.2801, 0.07],
      },
      {
        name: "[活化/枯焦]真蕈",
        materialsPerEnemy: [2.101, 0.5602, 0.1401],
      },
    ],
    names: ["失活菌核", "休眠菌核", "茁壮菌核"],
    keys: [
      "InactivatedFungalNucleus",
      "DormantFungalNucleus",
      "RobustFungalNucleus",
    ],
  },
  {
    id: 22,
    type: "common",
    enemies: [
      {
        name: "镀金旅团·小",
        materialsPerEnemy: [1.0505, 0.2801, 0.07],
      },
      {
        name: "镀金旅团·中",
        materialsPerEnemy: [2.101, 0.5602, 0.1401],
      },
      {
        name: "镀金旅团·大",
        materialsPerEnemy: [2.9414, 0.7844, 0.196],
      },
      {
        name: "驮兽·镀金旅团",
        materialsPerEnemy: [5.0424, 1.3446, 0.336],
      },
    ],
    names: ["褪色红绸", "镶边红绸", "织金红绸"],
    keys: ["FadedRedSatin", "TrimmedRedSilk", "RichRedBrocade"],
  },
  {
    id: 23,
    type: "elite",
    enemies: [
      {
        name: "遗迹龙兽",
        materialsPerEnemy: [3.9394, 1.0505, 0.2626],
      },
    ],
    names: ["混沌容器", "混沌模块", "混沌锚栓"],
    keys: ["ChaosStorage", "ChaosModule", "ChaosBolt"],
  },
  {
    id: 24,
    type: "elite",
    enemies: [
      {
        name: "元能构装体",
        materialsPerEnemy: [2.6263, 0.7003, 0.1751],
      },
    ],
    names: ["破缺棱晶", "混浊棱晶", "辉光棱晶"],
    keys: ["DamagedPrism", "TurbidPrism", "RadiantPrism"],
  },
  {
    id: 25,
    type: "elite",
    enemies: [
      {
        name: "圣骸兽",
        materialsPerEnemy: [6.5658, 1.7508, 0.4378],
      },
    ],
    names: ["残毁的横脊", "密固的横脊", "锲纹的横脊"],
    keys: ["DesiccatedShell", "SturdyShell", "MarkedShell"],
  },
  {
    id: 26,
    type: "elite",
    enemies: [
      {
        name: "丘丘游侠",
        materialsPerEnemy: [5.2526, 1.4006, 0.3502],
      },
    ],
    names: ["来自何处的待放之花", "何人所珍藏之花", "漫游者的盛放之花"],
    keys: ["AFlowerYetToBloom", "TreasuredFlower", "WanderersBloomingFlower"],
  },
  {
    id: 27,
    type: "common",
    enemies: [
      {
        name: "原海异种·小",
        materialsPerEnemy: [0.8404, 0.2241, 0.056],
      },
      {
        name: "原海异种·大",
        materialsPerEnemy: [1.6808, 0.4482, 0.112],
      },
    ],
    names: ["异海凝珠", "异海之块", "异色结晶石"],
    keys: ["TransoceanicPearl", "TransoceanicChunk", "XenochromaticCrystal"],
  },
  {
    id: 28,
    type: "common",
    enemies: [
      {
        name: "发条机关·小",
        materialsPerEnemy: [3.3616, 0.8964, 0.224],
      },
      {
        name: "发条机关·大",
        materialsPerEnemy: [1.2606, 0.3362, 0.084],
      },
    ],
    names: ["啮合齿轮", "机关正齿轮", "奇械机芯齿轮"],
    keys: ["MeshingGear", "MechanicalSpurGear", "ArtificedDynamicGear"],
  },
  {
    id: 29,
    type: "elite",
    enemies: [
      {
        name: "浊水幻灵",
        materialsPerEnemy: [5.2526, 1.4006, 0.3502],
      },
    ],
    names: ["浊水的一滴", "浊水的一掬", "初生的浊水幻灵"],
    keys: [
      "DropOfTaintedWater",
      "ScoopOfTaintedWater",
      "NewbornTaintedHydroPhantasm",
    ],
  },
  {
    id: 30,
    type: "elite",
    enemies: [
      {
        name: "隙境原体·大",
        materialsPerEnemy: [6.5658, 1.7508, 0.4378],
      },
      {
        name: "隙境原体·小",
        materialsPerEnemy: [3.9394, 1.0505, 0.2626],
      },
    ],
    names: ["隙间之核", "外世突触", "异界生命核"],
    keys: ["RiftCore", "ForeignSynapse", "AlienLifeCore"],
  },
  {
    id: 31,
    type: "elite",
    enemies: [
      {
        name: "役人",
        materialsPerEnemy: [5.2526, 1.4006, 0.3502],
      },
    ],
    names: ["老旧的役人怀表", "役人的制式怀表", "役人的时时刻刻"],
    keys: [
      "OldOperativesPocketWatch",
      "OperativesStandardPocketWatch",
      "OperativesConstancy",
    ],
  },
  {
    id: 32,
    type: "elite",
    enemies: [
      {
        name: "玄文兽",
        materialsPerEnemy: [3.9394, 1.0505, 0.2626],
      },
    ],
    names: ["羽状鳍翅", "月色鳍翅", "渊光鳍翅"],
    keys: ["FeatheryFin", "LunarFin", "ChasmlightFin"],
  },
  {
    id: 33,
    type: "elite",
    enemies: [
      {
        name: "魔像禁卫",
        materialsPerEnemy: [5.2526, 1.4006, 0.3502],
      },
    ],
    names: ["残毁的剑柄", "裂断的剑柄", "未熄的剑柄"],
    keys: ["RuinedHilt", "SplinteredHilt", "StillSmolderingHilt"],
  },
  {
    id: 34,
    type: "common",
    enemies: [
      {
        name: "纳塔龙众·大",
        materialsPerEnemy: [1.8489, 0.493, 0.1232],
      },
      {
        name: "纳塔龙众·小",
        materialsPerEnemy: [0.9244, 0.2465, 0.0616],
      },
    ],
    names: ["稚嫩的尖齿", "老练的坚齿", "横行霸者的利齿"],
    keys: ["JuvenileFang", "SeasonedFang", "TyrantsFang"],
  },
  {
    id: 35,
    type: "common",
    enemies: [
      {
        name: "部族龙形武士·大",
        materialsPerEnemy: [2.5212, 0.6723, 0.168],
      },
      {
        name: "部族龙形武士·小",
        materialsPerEnemy: [1.2606, 0.3362, 0.084],
      },
    ],
    names: ["卫从的木哨", "战士的铁哨", "龙冠武士的金哨"],
    keys: [
      "SentrysWoodenWhistle",
      "WarriorsMetalWhistle",
      "SaurianCrownedWarriorsGoldenWhistle",
    ],
  },
  {
    id: 36,
    type: "elite",
    enemies: [
      {
        name: "大灵显化身",
        materialsPerEnemy: [6.5658, 1.7508, 0.4378],
      },
    ],
    names: ["意志破碎的残片", "意志明晰的寄偶", "意志巡游的符像"],
    keys: [
      "ShardOfAShatteredWill",
      "LocusOfAClearWill",
      "SigilOfAStridingWill",
    ],
  },
  {
    id: 37,
    type: "elite",
    enemies: [
      {
        name: "熔岩游像",
        materialsPerEnemy: [5.2526, 1.4006, 0.3502],
      },
    ],
    names: ["聚燃的石块", "聚燃的命种", "聚燃的游像眼"],
    keys: ["IgnitedStone", "IgnitedSeedOfLife", "IgnitedSeeingEye"],
  },
  {
    id: 38,
    type: "elite",
    enemies: [
      {
        name: "秘源机兵·寻捕械",
        materialsPerEnemy: [4.596, 1.2255, 0.3064],
      },
    ],
    names: ["秘源轴", "秘源机鞘", "秘源真芯"],
    keys: [
      "AxisOfTheSecretSource",
      "SheathOfTheSecretSource",
      "HeartOfTheSecretSource",
    ],
  },
  {
    id: 39,
    type: "elite",
    enemies: [
      {
        name: "深邃拟覆叶·大",
        materialsPerEnemy: [7.8789, 2.1009, 0.5253],
      },
      {
        name: "深邃拟覆叶·中",
        materialsPerEnemy: [5.2526, 1.4006, 0.3502],
      },
      {
        name: "深邃拟覆叶·小",
        materialsPerEnemy: [3.9394, 1.0505, 0.2626],
      },
    ],
    names: ["折光的胚芽", "惑光的阔叶", "迷光的蜷叶之心"],
    keys: ["RefractiveBud", "BewilderingBroadleaf", "IllusoryLeafcoil"],
  },
  {
    id: 40,
    type: "elite",
    enemies: [
      {
        name: "炉壳山鼬",
        materialsPerEnemy: [6.5658, 1.7508, 0.4378],
      },
    ],
    names: ["冷裂壳块", "蕴热的背壳", "明燃的棱状壳"],
    keys: ["ColdCrackedShellshard", "WarmBackShell", "BlazingPrismshell"],
  },
  {
    id: 41,
    type: "common",
    enemies: [
      {
        name: "巡陆艇·大【推测】",
        materialsPerEnemy: [3.3616, 0.8964, 0.224],
      },
      {
        name: "巡陆艇·小【推测】",
        materialsPerEnemy: [1.6808, 0.4482, 0.112],
      },
    ],
    names: ["毁损机轴", "加固机轴", "精制机轴"],
    keys: ["BrokenDriveShaft", "ReinforcedDriveShaft", "PrecisionDriveShaft"],
  },
  {
    id: 42,
    type: "common",
    enemies: [
      {
        name: "愚人众特辖队·大【推测】",
        materialsPerEnemy: [2.5212, 0.6723, 0.168],
      },
      {
        name: "愚人众特辖队·小【推测】",
        materialsPerEnemy: [1.2606, 0.3362, 0.084],
      },
    ],
    names: ["磨损的执凭", "精致的执凭", "霜镌的执凭"],
    keys: ["TatteredWarrant", "ImmaculateWarrant", "FrostEtchedWarrant"],
  },
  {
    id: 43,
    type: "elite",
    enemies: [
      {
        name: "霜夜灵嗣【推测】",
        materialsPerEnemy: [6.5658, 1.7508, 0.4378],
      },
    ],
    names: ["霜夜的残照", "霜夜的柔辉", "霜夜的煌荣"],
    keys: ["FrostnightsGlimmer", "FrostnightsGlow", "FrostnightsGlory"],
  },
  {
    id: 44,
    type: "elite",
    enemies: [
      {
        name: "蕴光异兽【推测】",
        materialsPerEnemy: [6.5658, 1.7508, 0.4378],
      },
    ],
    names: ["失光块骨", "稀光遗骼", "繁光躯外骸"],
    keys: ["LightlessBone", "GlowingRemains", "RadiantExoskeleton"],
  },
  {
    id: 45,
    type: "elite",
    enemies: [
      {
        name: "荒野狂狩士【推测】",
        materialsPerEnemy: [5.2526, 1.4006, 0.3502],
      },
      {
        name: "荒野幽徒【推测】",
        materialsPerEnemy: [2.6263, 0.7003, 0.1751],
      },
    ],
    names: ["幽雾化形", "幽雾片甲", "幽雾兜盔"],
    keys: ["MistshroudManifestation", "MistshroudPlate", "MistshroudHelmet"],
  },
];
