  const ROOT_EJS=`${process.cwd()}/src/ejs`;
  const contentInfo = {
    subTitle: 'COMPANY',
    mainTitle: '会社を知る',
    pos: 'left'
  };

  const serviceInfo = {
    subTitle: 'SERRVICE',
    mainTitle: '事業紹介',
    pos: 'center'
  };

  const missionInfo = {
    subTitle: 'MISSION',
    mainTitle: 'ミッション',
    pos: 'left'
  };

  const visionInfo = {
    subTitle: 'VISION',
    mainTitle: 'ビジョン',
    pos: 'left'
  };

  const credoInfo = {
    subTitle: 'CREDO',
    mainTitle: '行動指針',
    pos: 'center'
  };

  const outlineInfo = {
    subTitle: 'OUTLINE',
    mainTitle: '会社概要',
    pos: 'left'
  };

  const cards = [
    {
      type: "mission",
      titles: ["地域の皆様の明日(ミライ)を", "元気にする"],
      texts: [
        "「地域の皆様の明日(ミライ)を元気にする」を理念とし、様々な分野のサービスを通して生活の充実とその先にある社会貢献を叶えていきます。これまで、飲食事業においては安心・安全で美味しい料理とリロードエッジらしいサービスで地域の皆様に”楽しい”時間を提供してきました。", 
        "また、「医療クリニック事業」では美容と健康の向上を通して”理想の自分に近づく”支援をするサービスを展開してきました。そして今後は、不動産事業やコンサルティング事業など新たな事業もスタート。これからも「地域の皆様の明日(ミライ)を元気にする」というミッションを中心に持ち、新たなチャレンジを続けていきます。\n"
      ],
      pcSrc: "../assets/images/company/company_img_1_pc.jpg",
      spSrc: "../assets/images/company/company_img_1_sp.jpg"
    },
    {
      type: "vision",
      titles: ["時代のニーズに合わせて", "柔軟に変化・成長していける企業へ	"],
      texts: [
        "私たちは、これまでの常識に囚われない。\n私たちは、求められないものは提供しない。\n私たちは、変化を拒むことはしない。私たちは、これまでの常識に囚われない。\n私たちは、求められないものは提供しない。\私たちは、変化を拒むことはしない。\n", 
        "リロードエッジは新たな常識を創り出す先駆者として、\n時代のニーズに合わせて柔軟に変化・成長していける会社を\n目指します。\nその先に、「地域の皆様の明日(ミライ)を元気にする」を実現していきます。"
      ],
      pcSrc: "../assets/images/company/company_img_2_pc.jpg",
      spSrc: "../assets/images/company/company_img_2_sp.jpg"
    }
  ];

  const credo = [
    "お客様 仲間 家族に誠実であろう",
    "プロ意識を持って行動しよう",
    "やらずにできないと言うな、やって学ぼう",
    "明確な目標を持とう",
    "お客様 仲間 家族に感謝を伝える習慣を持とう"
  ];